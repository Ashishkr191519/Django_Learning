from django.urls import path
from .views import (
    add_expenses,
    get_expenses,
    update_expenses,
    delete_expense,
    categories,
    category_detail,
    budget_detail,
    budgets
)

urlpatterns = [
    path("add/", add_expenses, name="add_expense"),
    path("all/", get_expenses, name="get_expenses"),
    path("update/<int:pk>/", update_expenses, name="update_expense"),
    path("delete/<int:pk>/", delete_expense, name="delete_expense"),
    path("categories/", categories, name="categories"),
     path("categories/<int:pk>/",category_detail,name="category-detail"),
     path("budgets/", budgets, name="budgets"),
    path("budgets/<int:pk>/", budget_detail, name="budget-detail"),
]
