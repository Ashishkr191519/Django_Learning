from django.db import models
# we are learing models relationship today


class Place(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    
    
    def __str__(self):
        return f"{self.name} the "


class Resturant(models.Model):
    place = models.OneToOneField(Place,on_delete=models.CASCADE,primary_key=True)
    server_hot_dog = models.BooleanField(default=False)
    server_chowmin = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.place.name} the resturant "
    
class waiter(models.Model):
    resturant = models.ForeignKey(Resturant,on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return f"the waiter is {self.name} and working on resturant name : {self.resturant.place.name}"