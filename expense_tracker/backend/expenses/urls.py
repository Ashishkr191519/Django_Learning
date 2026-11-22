from django.urls import path
from .views import (
    add_expenses,
    get_expenses,
    update_expenses,
    delete_expense
)

urlpatterns = [
    path("add/", add_expenses, name="add_expense"),
    path("all/", get_expenses, name="get_expenses"),
    path("update/<int:pk>/", update_expenses, name="update_expense"),
    path("delete/<int:pk>/", delete_expense, name="delete_expense"),
]