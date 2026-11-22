from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializers import TransactionSerializer
from .models import Transaction


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_expenses(request):

    serializer = TransactionSerializer(data=request.data)

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_expenses(request):

    expenses = Transaction.objects.filter(
        user=request.user
    ).order_by('-date')

    serializer = TransactionSerializer(
        expenses,
        many=True
    )

    return Response(serializer.data)


@api_view(['PATCH'])
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
        partial=True
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['DELETE'])
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