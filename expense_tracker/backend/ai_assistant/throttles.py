from rest_framework.throttling import UserRateThrottle


class AshitaRateThrottle(UserRateThrottle):
    scope = "ashita"