from django.db import models
from django.conf import settings


    

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

    category = models.CharField(max_length=50)

    date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)