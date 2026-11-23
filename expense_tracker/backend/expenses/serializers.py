from rest_framework import serializers
from .models import Transaction,Category,Budget

class TransactionSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    class Meta:
        model = Transaction

        fields = [
            "id",
            "title",
            "amount",
            "category",
            "category_name",
            "transaction_type",
            "date",
            "created_at"
        ]

        read_only_fields = [
            "id",
            "created_at",
            "category_name"
        ]

    def validate(self, attrs):
        request = self.context.get("request")

        if request is None:
            raise serializers.ValidationError(
                "Request context is required."
            )

        category = attrs.get(
            "category",
            self.instance.category if self.instance else None
        )

        transaction_type = attrs.get(
            "transaction_type",
            self.instance.transaction_type if self.instance else None
        )

        if category is not None:

            if category.user_id != request.user.id:
                raise serializers.ValidationError({
                    "category": "You cannot use another user's category."
                })

            if category.category_type != transaction_type:
                raise serializers.ValidationError({
                    "category": "Category type must match transaction type."
                })

        return attrs
    

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "category_type",
            "created_at"
        ]
        read_only_fields = ["id", "created_at"]

    def validate(self, attrs):
        request = self.context.get("request")

        if request is None:
            raise serializers.ValidationError(
                "Request context is required."
            )

        name = attrs.get(
            "name",
            self.instance.name if self.instance else None
        )

        category_type = attrs.get(
            "category_type",
            self.instance.category_type if self.instance else None
        )

        if name is not None:
            name = name.strip()

        if not name:
            raise serializers.ValidationError({
            "name": "Category name cannot be empty."
        })

        existing = Category.objects.filter(
            user=request.user,
            name=name,
            category_type=category_type
        )

        if self.instance:
            existing = existing.exclude(pk=self.instance.pk)

        if existing.exists():
            raise serializers.ValidationError({
                "name": "This category already exists."
            })

        attrs["name"] = name

        # Linked transactions ke saath category type change nahi karenge
        if self.instance and category_type != self.instance.category_type:
            if self.instance.transactions.exists():
                raise serializers.ValidationError({
                    "category_type": "Cannot change type of a category with transactions."
                })

        return attrs
    
    
class BudgetSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    class Meta:
        model = Budget
        fields = [
            "id",
            "category",
            "category_name",
            "amount",
            "month",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "category_name",
            "created_at",
        ]

    def validate(self, attrs):
        request = self.context.get("request")

        if request is None or not request.user.is_authenticated:
            raise serializers.ValidationError(
                "Authenticated request is required."
            )

        category = attrs.get(
            "category",
            self.instance.category if self.instance else None
        )

        month = attrs.get(
            "month",
            self.instance.month if self.instance else None
        )

        # Category must belong to logged-in user
        if category and category.user_id != request.user.id:
            raise serializers.ValidationError({
                "category": "You cannot use another user's category."
            })

        # Budget only for expense categories
        if category and category.category_type != "expense":
            raise serializers.ValidationError({
                "category": "Budget can only be created for expense categories."
            })

        # Month must be first day of month
        if month and month.day != 1:
            raise serializers.ValidationError({
                "month": "Use the first day of the month, e.g. 2026-11-01."
            })

        # Prevent duplicate monthly budget
        if category and month:
            existing = Budget.objects.filter(
                user=request.user,
                category=category,
                month=month
            )

            if self.instance:
                existing = existing.exclude(pk=self.instance.pk)

            if existing.exists():
                raise serializers.ValidationError({
                    "category": "Budget already exists for this category and month."
                })

        return attrs