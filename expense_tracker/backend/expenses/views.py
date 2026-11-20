from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import TransactionSerializer
from .models import Transaction

@api_view(['POST'])
def add_expenses(request):
    serializer = TransactionSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
def get_expenses(request):
    expenses = Transaction.objects.all()
    serializer = TransactionSerializer(expenses,many=True )
    return Response(serializer.data)

@api_view(['PATCH'])
def update_expenses(request,pk):
    expense = get_object_or_404(Transaction,pk=pk)
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
    
    
@api_view(["DELETE"])
def delete_expense(request, pk):

    expense = get_object_or_404(Transaction, pk=pk)
    expense.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    