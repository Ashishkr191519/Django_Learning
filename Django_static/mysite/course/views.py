from django.shortcuts import render

# Create your views here.
def testFunc(request):
    return render(request,'course/courseone.html')