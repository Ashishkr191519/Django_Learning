from django.urls import path
from .views import register_user,login_user,get_csrf_token

urlpatterns=[
    path("register/",register_user,name="register"),
    path("login/", login_user, name="login"),
    path("csrf/",get_csrf_token,name="csrf")
]