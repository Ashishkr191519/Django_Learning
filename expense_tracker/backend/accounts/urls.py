from django.urls import path
from .views import register_user,login_user,get_csrf_token,refresh_access_token,get_current_user,logout_user

urlpatterns=[
    path("register/",register_user,name="register"),
    path("login/", login_user, name="login"),
    path("csrf/",get_csrf_token,name="csrf"),
    path("refresh/", refresh_access_token, name="refresh"),
    path("me/", get_current_user, name="current_user"),
     path("logout/", logout_user, name="logout"),
]