from django.db import models
from django.conf import settings

class Category(models.Model):
    CATEGORY_TYPES = [
        ("income", "Income"),
        ("expense", "Expense"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="categories"
    )

    name = models.CharField(max_length=50)

    category_type = models.CharField(
        max_length=10,
        choices=CATEGORY_TYPES
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "name", "category_type"],
                name="unique_user_category_type"
            )
        ]

    def __str__(self):
        return self.name
    

class Transaction(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    
    TRANSACTION_TYPES = [
    ('income', 'Income'),
    ('expense', 'Expense'),
    ]

    title = models.CharField(max_length=100)

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    transaction_type = models.CharField(
        max_length=10,
        choices=TRANSACTION_TYPES
    )

    category = models.ForeignKey(
    Category,
    on_delete=models.PROTECT,
    related_name="transactions"
    )
    date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)
    
    


class Budget(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="budgets"
    )

    category = models.ForeignKey(
        "Category",
        on_delete=models.PROTECT,
        related_name="budgets"
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    month = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "category", "month"],
                name="unique_monthly_category_budget"
            ),
            models.CheckConstraint(
                condition=models.Q(amount__gt=0),
                name="budget_amount_positive"
            ),
        ]

    def __str__(self):
        return f"{self.category.name} - {self.month}"