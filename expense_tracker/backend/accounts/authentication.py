
from rest_framework_simplejwt.authentication import (
    JWTAuthentication,
)

from rest_framework.exceptions import PermissionDenied

from rest_framework.authentication import CSRFCheck


class CookieJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):

        # Read JWT access token from HttpOnly cookie
        access_token = request.COOKIES.get(
            "access_token"
        )

        if not access_token:
            return None

        # Validate JWT token
        validated_token = self.get_validated_token(
            access_token
        )

        # Get authenticated user
        user = self.get_user(validated_token)

        # Enforce CSRF for cookie-based authentication
        self.enforce_csrf(request)

        return (user, validated_token)

    def enforce_csrf(self, request):

        def dummy_get_response(request):
            return None

        check = CSRFCheck(dummy_get_response)

        # DRF request wraps the original Django request
        django_request = request._request

        check.process_request(django_request)

        reason = check.process_view(
            django_request,
            None,
            (),
            {}
        )

        if reason:
            raise PermissionDenied(
                f"CSRF Failed: {reason}"
            )
