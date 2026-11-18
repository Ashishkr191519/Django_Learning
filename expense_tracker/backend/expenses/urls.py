from django.urls import path
from .views import add_expenses


urlpatterns = [
    path("expenses/",add_expenses, name="add_expense"),
]
