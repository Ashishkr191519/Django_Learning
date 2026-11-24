from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import logging

from groq import (
    APITimeoutError,
    RateLimitError,
    APIConnectionError
)

logger = logging.getLogger(__name__)
from .serializers import ChatRequestSerializer
from .services.expense_service import get_expenses_summary
from .services.llm_service import generate_ai_response
from rest_framework.decorators import throttle_classes
from .throttles import AshitaRateThrottle

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@throttle_classes([AshitaRateThrottle])
def chat_with_ashita(request):

    serializer = ChatRequestSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    query = serializer.validated_data["query"]

    try:
        expense_data = get_expenses_summary(request.user)

        ai_response = generate_ai_response(
            expense_data,
            query
        )

        return Response(
            ai_response,
            status=status.HTTP_200_OK
        )

    except APITimeoutError:
        return Response(
            {"error": "Chungi is taking too long to respond."},
            status=status.HTTP_504_GATEWAY_TIMEOUT
        )

    except RateLimitError:
        return Response(
            {"error": "Chungi service is temporarily busy. Try again later."},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )

    except APIConnectionError:
        return Response(
            {"error": "Unable to connect to Ashita."},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )

    except Exception as e:
        logger.error(
            "Chungi request failed: %s",
            type(e).__name__
        )

        return Response(
            {"error": "Something went wrong. Please try again."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )