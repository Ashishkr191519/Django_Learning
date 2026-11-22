from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.decorators import authentication_classes
from django.views.decorators.csrf import csrf_protect



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
    httponly=True,
    secure=False,
    samesite="Lax",
    max_age=300
)

    response.set_cookie(
    key="refresh_token",
    value=refresh_token,
    httponly=True,
    secure=False,
    samesite="Lax",
    max_age=604800
)

    return response




@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({
        "csrfToken": get_token(request)
    })
    
    
@csrf_protect
@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def refresh_access_token(request):

    # Browser se refresh token cookie lena
    refresh_token = request.COOKIES.get("refresh_token")

    if not refresh_token:
        return Response(
            {"error": "Refresh token missing"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        # Refresh token verify karna
        refresh = RefreshToken(refresh_token)

        # Naya access token generate karna
        new_access_token = str(refresh.access_token)

        response = Response(
            {"message": "Access token refreshed"},
            status=status.HTTP_200_OK
        )

        # Naya access token cookie mein set karna
        response.set_cookie(
            key="access_token",
            value=new_access_token,
            httponly=True,
            secure=False,  # Local development only
            samesite="Lax",
            max_age=300
        )

        return response

    except TokenError:
        return Response(
            {"error": "Refresh token expired or invalid"},
            status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_current_user(request):

    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
    })
    
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect


@csrf_protect
@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def logout_user(request):

    response = Response({
        "message": "Logout successful"
    })

    response.delete_cookie(
        "access_token",
        path="/",
        samesite="Lax"
    )

    response.delete_cookie(
        "refresh_token",
        path="/",
        samesite="Lax"
    )

    return response