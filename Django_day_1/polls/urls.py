
from django.urls import path
from . import views

# this is routing in Python path(phele url name daalo, phir controller file index eek controller hai , iska name rakhna chahiye eek)

urlpatterns = [
    path("index", views.index, name="index"),
    path("hello",views.hello,name="hello")

]



