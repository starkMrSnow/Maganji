from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    phone_no = models.CharField(max_length=15)
    national_id = models.IntegerField(unique=True)
    balance = models.FloatField(default=0.0)

    # def generate_unique_username(self):
    #     base_username = slugify(f"{self.first_name}{self.last_name}")
    #     username = base_username
    #     counter = 1

    #     while User.objects.filter(username=username).exists():
    #         username = f"{base_username}{counter}"
    #         counter += 1
        
    #     return username

    # def save(self, *args, **kwargs):
    #     if not self.username:  # Only generate if username is not provided
    #         self.username = self.generate_unique_username()
    #     super().save(*args, **kwargs)


# class Budget(models.Model):
#     user_id = models.ForeignKey(User, on_delete=models.CASCADE, relation_name="person")
#     amount = models.FloatField()
#     due_date = models.DateTimeField(auto_now=True)
#     budget = models.CharField(max_length=20)

# class Transaction(models.Model):
#     transaction_id = models.CharField()
#     budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
#     user_id = models.ForeignKey(User, on_delete=models.CASCADE, relation_name="person")
#     amount = models.FloatField()
#     date = models.DateTimeField()
#     type = models.enums()

# class Goal(models.Model):
#     user_id = models.ForeignKey(User, on_delete=models.CASCADE, relation_name="person")
#     amount = models.FloatField()
#     duration = models.DateTimeField()
#     status = models.BooleanField(default=False)
#     goal = models.CharField(max_length=50)