from django.urls import path
from .views import add_expenses,get_expenses,update_expenses,delete_expense


urlpatterns = [
    path("expenses/",add_expenses, name="add_expense"),
    path("expenses/all/",get_expenses, name="get_expenses"),
    path("expenses/<int:pk>/", update_expenses, name="update_expense"),
    path("expenses/<int:pk>/delete/", delete_expense, name="delete_expense")
]
