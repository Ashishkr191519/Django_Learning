from datetime import date, timedelta
from django.shortcuts import get_object_or_404
from django.db.models import ProtectedError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from decimal import Decimal
from django.db.models import Sum
from .serializers import TransactionSerializer, CategorySerializer,BudgetSerializer
from .models import Transaction, Category,Budget


# ==========================
# TRANSACTION CRUD
# ==========================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_expenses(request):

    serializer = TransactionSerializer(
        data=request.data,
        context={"request": request}
    )

    if serializer.is_valid():
        serializer.save(user=request.user)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_expenses(request):

    expenses = Transaction.objects.filter(
        user=request.user
    ).select_related("category").order_by("-date")

    serializer = TransactionSerializer(
        expenses,
        many=True
    )

    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_expenses(request, pk):

    expense = get_object_or_404(
        Transaction,
        pk=pk,
        user=request.user
    )

    serializer = TransactionSerializer(
        expense,
        data=request.data,
        partial=True,
        context={"request": request}
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_expense(request, pk):

    expense = get_object_or_404(
        Transaction,
        pk=pk,
        user=request.user
    )

    expense.delete()

    return Response(
        status=status.HTTP_204_NO_CONTENT
    )


# ==========================
# CATEGORY CRUD
# ==========================

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def categories(request):

    if request.method == "GET":

        user_categories = Category.objects.filter(
            user=request.user
        ).order_by("name")

        serializer = CategorySerializer(
            user_categories,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    elif request.method == "POST":

        serializer = CategorySerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def category_detail(request, pk):

    category = get_object_or_404(
        Category,
        pk=pk,
        user=request.user
    )

    if request.method == "PATCH":

        serializer = CategorySerializer(
            category,
            data=request.data,
            partial=True,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    elif request.method == "DELETE":

        try:
            category.delete()

            return Response(
                status=status.HTTP_204_NO_CONTENT
            )

        except ProtectedError:
            return Response(
                {
                    "error": "This category has transactions and cannot be deleted."
                },
                status=status.HTTP_400_BAD_REQUEST
            )



def budget_response(budget):
    """
    Return budget details with calculated spending.
    """
    month_start = budget.month

    if month_start.month == 12:
        next_month = date(month_start.year + 1, 1, 1)
    else:
        next_month = date(
            month_start.year,
            month_start.month + 1,
            1
        )

    spent = Transaction.objects.filter(
        user=budget.user,
        category=budget.category,
        transaction_type="expense",
        date__gte=month_start,
        date__lt=next_month
    ).aggregate(total=Sum("amount"))["total"] or Decimal("0.00")

    data = BudgetSerializer(budget).data

    data["spent_amount"] = str(spent)
    data["remaining_amount"] = str(budget.amount - spent)
    data["percentage_used"] = round(
        (spent / budget.amount) * 100, 2
    )

    return data


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def budgets(request):

    if request.method == "GET":
        queryset = Budget.objects.filter(
            user=request.user
        ).select_related("category").order_by("-month", "category__name")

        month = request.query_params.get("month")

        if month:
            try:
                selected_month = date.fromisoformat(month)

                if selected_month.day != 1:
                    raise ValueError()

            except ValueError:
                return Response(
                    {"month": "Use YYYY-MM-01 format."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            queryset = queryset.filter(month=selected_month)

        return Response([
            budget_response(budget)
            for budget in queryset
        ])

    serializer = BudgetSerializer(
        data=request.data,
        context={"request": request}
    )

    if serializer.is_valid():
        budget = serializer.save(user=request.user)

        return Response(
            budget_response(budget),
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def budget_detail(request, pk):

    try:
        budget = Budget.objects.select_related(
            "category"
        ).get(
            pk=pk,
            user=request.user
        )
    except Budget.DoesNotExist:
        return Response(
            {"detail": "Budget not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "PATCH":
        serializer = BudgetSerializer(
            budget,
            data=request.data,
            partial=True,
            context={"request": request}
        )

        if serializer.is_valid():
            updated_budget = serializer.save()

            return Response(
                budget_response(updated_budget)
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    budget.delete()

    return Response(
        status=status.HTTP_204_NO_CONTENT
    )
