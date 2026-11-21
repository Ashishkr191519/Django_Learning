from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({
        "csrfToken": get_token(request)
    })


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )
    



@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):

    # Step 1: Frontend se data lena
    username = request.data.get("username")
    password = request.data.get("password")

    # Step 2: Check required fields
    if not username or not password:
        return Response({
            "error": "Username and password are required"
        }, status=status.HTTP_400_BAD_REQUEST)

    # Step 3: Django se credentials verify karna
    user = authenticate(
        request,
        username=username,
        password=password
    )

    # Step 4: Agar credentials galat hain
    if user is None:
        return Response({
            "error": "Invalid username or password"
        }, status=status.HTTP_401_UNAUTHORIZED)

    # Step 5: JWT tokens generate karna
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    # Step 6: Response create karna
    response = Response({
        "message": "Login successful",
        "username": user.username
    }, status=status.HTTP_200_OK)

    response.set_cookie(
    key="access_token",
    value=access_token,
    max_age=604800  # 7 days
)

    response.set_cookie(
    key="refresh_token",
    value=refresh_token,
    max_age=604800  # 7 days
)

    return response




@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({
        "csrfToken": get_token(request)
    })