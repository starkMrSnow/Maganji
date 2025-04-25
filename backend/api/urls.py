from django.urls import path
from .views import *

urlpatterns = [
    path('home', home_view, name='home'),
    path("signup", signup_view, name="signup"),
    path("login", login_view, name="login"),
    path("callback", callback_view, name="callback"),
    path("deposit", initiate_deposit, name="initiate_payment"),
    path("budget", budget_list , name= "budget"),
    path("budget", budget_list , name= "budget"),
    path("goal", goal_list, name = "goal"),
    path('home/', home_view, name='home'),
    path('home/', deposit_view, name='deposit'),
    path('home/',  wallet_balance_view, name = "wallet_balance_view"),
    path('home/', budget_summary_view, name="budget_summery_view")
]