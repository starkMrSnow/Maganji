from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    national_id = models.IntegerField(unique=True)
    balance = models.FloatField(default=0.0)



class Budget(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    amount = models.FloatField()
    due_date = models.DateTimeField(auto_now=True)
    budget = models.CharField(max_length=20)

# class Transaction(models.Model):
#     transaction_id = models.CharField()
#     budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
#     user_id = models.ForeignKey(User, on_delete=models.CASCADE, relation_name="person")
#     amount = models.FloatField()
#     date = models.DateTimeField()
#     type = models.enums()

class Goal(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="person")
    amount = models.FloatField()
    maturity_date = models.DateTimeField()
    status = models.BooleanField(default=False)
    goal = models.CharField(max_length=50)