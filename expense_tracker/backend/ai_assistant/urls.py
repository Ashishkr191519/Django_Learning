from django.urls import path
from .views import chat_with_ashita

urlpatterns = [
    path("chat/", chat_with_ashita, name="chat_with_ashita"),
]
