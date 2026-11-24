from expenses.models import Transaction
from django.db.models import Sum
from django.utils import timezone
from decimal import Decimal


def get_expenses_summary(user):

    today = timezone.localdate()

    transactions = Transaction.objects.filter(
        user=user,
        date__year=today.year,
        date__month=today.month
    )

    total_income = transactions.filter(
        transaction_type="income"
    ).aggregate(
        total=Sum("amount")
    )["total"] or Decimal("0.00")

    total_expenses = transactions.filter(
        transaction_type="expense"
    ).aggregate(
        total=Sum("amount")
    )["total"] or Decimal("0.00")

    balance = total_income - total_expenses

    category_expenses = transactions.filter(
        transaction_type="expense"
    ).values(
        "category__name"
    ).annotate(
        total=Sum("amount")
    ).order_by("-total")
    
    return {
    "month": today.strftime("%B %Y"),
    "total_income": str(total_income),
    "total_expense": str(total_expenses),
    "balance": str(balance),
    "category_expenses": [
        {
            "category": item["category__name"],
            "amount": str(item["total"])
        }
        for item in category_expenses
    ]
}