from django.urls import path
from .views import *

urlpatterns = [
    path("signup", signup_view, name="signup"),
    path("login", login_view, name="login"),
    path("callback", callback_view, name="callback"),
    path("initiate_payment", initiate_payment, name="initiate_payment"),
    path("budget", budget_list , name= "budget")
]