from django.urls import path
from .views import *

urlpatterns = [
    path('home', home_view, name='home'),
    path("signup", signup_view, name="signup"),
    path("login", login_view, name="login"),
    path("callback", callback_view, name="callback"),
    path("deposit", initiate_deposit, name="initiate_payment"),
    path("budget", budget_list , name= "budget")
]