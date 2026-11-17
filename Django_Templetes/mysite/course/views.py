from django.shortcuts import render

# Create your views here.
def testFun(request):
    name = 'Ashish'
    age=23
    
    return render(request,'courseone.html',{'name':name,'age':age})
