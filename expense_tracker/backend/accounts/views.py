
from django.conf import settings
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import (
    ensure_csrf_cookie,
    csrf_protect,
)

from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .serializers import RegisterSerializer


# ==========================================
# COOKIE HELPERS
# ==========================================

def set_auth_cookie(response, key, value, max_age):
    response.set_cookie(
        key=key,
        value=value,
        max_age=max_age,
        httponly=settings.AUTH_COOKIE_HTTPONLY,
        secure=settings.AUTH_COOKIE_SECURE,
        samesite=settings.AUTH_COOKIE_SAMESITE,
        path="/",
    )


def clear_auth_cookies(response):
    response.delete_cookie(
        key="access_token",
        path="/",
        samesite=settings.AUTH_COOKIE_SAMESITE,
    )

    response.delete_cookie(
        key="refresh_token",
        path="/",
        samesite=settings.AUTH_COOKIE_SAMESITE,
    )


# ==========================================
# REGISTER
# ==========================================

@csrf_protect
@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def register_user(request):

    serializer = RegisterSerializer(
        data=request.data
    )

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


# ==========================================
# LOGIN
# ==========================================

@csrf_protect
@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def login_user(request):

    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {
                "error": "Username and password are required"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(
        request,
        username=username,
        password=password
    )

    if user is None or not user.is_active:
        return Response(
            {
                "error": "Invalid username or password"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    refresh = RefreshToken.for_user(user)

    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    response = Response(
        {
            "message": "Login successful",
            "username": user.username,
        },
        status=status.HTTP_200_OK
    )

    set_auth_cookie(
        response,
        "access_token",
        access_token,
        settings.AUTH_COOKIE_ACCESS_MAX_AGE,
    )

    set_auth_cookie(
        response,
        "refresh_token",
        refresh_token,
        settings.AUTH_COOKIE_REFRESH_MAX_AGE,
    )

    return response


# ==========================================
# CSRF TOKEN
# ==========================================

@ensure_csrf_cookie
def get_csrf_token(request):

    return JsonResponse({
        "csrfToken": get_token(request)
    })


# ==========================================
# REFRESH ACCESS TOKEN
# ==========================================

@csrf_protect
@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def refresh_access_token(request):

    refresh_token = request.COOKIES.get(
        "refresh_token"
    )

    if not refresh_token:
        return Response(
            {
                "error": "Refresh token missing"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        refresh = RefreshToken(refresh_token)

        user_id = refresh.get("user_id")

        # Ensure the account still exists and is active
        from django.contrib.auth import get_user_model

        User = get_user_model()

        user = User.objects.filter(
            pk=user_id,
            is_active=True
        ).first()

        if user is None:
            return Response(
                {
                    "error": "User not found or inactive"
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        new_access_token = str(
            refresh.access_token
        )

        response = Response(
            {
                "message": "Access token refreshed"
            },
            status=status.HTTP_200_OK
        )

        set_auth_cookie(
            response,
            "access_token",
            new_access_token,
            settings.AUTH_COOKIE_ACCESS_MAX_AGE,
        )

        return response

    except (TokenError, ValueError, TypeError):
        return Response(
            {
                "error": "Refresh token expired or invalid"
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


# ==========================================
# GET CURRENT USER
# ==========================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_current_user(request):

    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
    })


# ==========================================
# LOGOUT
# ==========================================

@csrf_protect
@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def logout_user(request):

    response = Response(
        {
            "message": "Logout successful"
        },
        status=status.HTTP_200_OK
    )

    clear_auth_cookies(response)

    return response
