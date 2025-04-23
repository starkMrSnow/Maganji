# from django.contrib.auth.backends import ModelBackend
# from .models import *

# class PhoneBackend(ModelBackend):
#     def authenticate(self, request, phone_number=None, password=None, **kwargs):
#         try:
#             user = User.objects.get(phone_no=phone_number)
#             if user.check_password(password):
#                 return user
#         except User.DoesNotExist:
#             return None
