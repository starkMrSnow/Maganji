from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import permissions
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.db.utils import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import TokenAuthentication
from .mpesa import *
from .models import *
from django.utils import timezone
from datetime import datetime
# Create your views here.

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth import authenticate, login, logout


@api_view(['GET', 'POST'])
@permission_classes([permissions.AllowAny])
def home_view(request):
    print(request.user.first_name)
    return Response({"balance":""}, status=200)


@api_view(['GET', 'POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    if request.method == "POST":
        user = authenticate(
            request,
            username=request.data.get("phoneNo"),
            password=request.data.get("password")
        )
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            print("data: ", token.key)
            return Response({
                "message": "Login successful",
                "token": token.key
            }, status=200)
            
        else:
            return Response({"message": "Invalid password/username"}, status=401)

    logout(request)
    return Response({"message": "login"}, status=200)



@api_view(['GET','POST'])
@permission_classes([permissions.AllowAny])
def signup_view(request):
    if request.method == "POST":  
            print(request.data)
            # try:
            user = User.objects.create(
                username = request.data.get("phoneNo"),
                first_name=request.data.get("firstName").strip(),
                last_name=request.data.get("lastName").strip(),
                national_id=request.data.get("nationalID"),
                email = request.data.get("email")
            )
            user.set_password(f'{request.data.get("password")}')
            user.save()
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({
                 "message":"Registration successful",
                 "token": token.key
                 }, status=200)
            # except IntegrityError:
            #     return Response({"message":"User already exists"}, status=401)
    return Response({"message":"signup"}, status=200)


@api_view(['GET','POST'])
@permission_classes([permissions.AllowAny])
def initiate_deposit(request):
    if request.method == "POST":
        print(request.data)
        # try_stk()
        stk_push(request.data.get("amount"), request.data.get("phoneNo"))
        return Response(status=200)
    return Response(status=200)


@api_view(['GET','POST'])
@permission_classes([permissions.AllowAny])
def initiate_withdraw(request):
    if request.method == "POST":
        print(request.data)
        # # try_stk()
        # stk_push(request.data.get("amount"))
        return Response(status=200)
    return Response(status=200)


@api_view(['GET','POST'])
@permission_classes([permissions.AllowAny])
def callback_view(request):
    if request.method == "POST":
        print(request.data)
        return Response(status=200)
    return Response(status=201)
     

@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def budget_list(request):
    user = request.user
    print(request.headers)

    if request.method == 'GET':
            budgets = Budget.objects.filter(user_id=user)
            budget_data = [{
                "budget": b.budget,
                "amount": b.amount,
                "due_date": b.due_date.strftime("%Y-%m-%d %H:%M:%S")
            } for b in budgets]
            return Response(budget_data, status=200)

    elif request.method == 'POST':
            data = request.data
            budget = Budget.objects.create(
                user_id=user,
                budget=data.get("budgetName"),
                amount=float(data.get("amount")),
                due_date=data.get("dueDate") 
            )
            return Response({"message": "Budget created successfully"}, status=201)
   
@api_view(['GET', 'POST'])
@permission_classes([permissions.AllowAny])
def goal_list(request):
    # Hardcoded user for testing (replace with actual auth logic in production)
    user = User.objects.get(id=1)

    if request.method == 'GET':
        goals = Goal.objects.filter(user_id=user)
        goal_data = [
            {
                'goal': goal.goal,
                'amount': goal.amount,
                'maturity_date': goal.maturity_date.strftime("%Y-%m-%d"),
                'status': goal.status
            }
            for goal in goals
        ]
        return Response(goal_data, status=200)

    elif request.method == 'POST':
        data = request.data
        print("Received data:", data)
        print("User:", user)

        try:
            # Convert status to boolean
            raw_status = data.get("status", "false")
            if isinstance(raw_status, str):
                status = raw_status.lower() in ["true", "active", "1"]
            else:
                status = bool(raw_status)

            # Convert maturity_date to timezone-aware datetime
            maturity_date_str = data.get("maturity_date")
            maturity_date = datetime.strptime(maturity_date_str, "%Y-%m-%d")
            maturity_date = timezone.make_aware(maturity_date)

            # Create the Goal
            Goal.objects.create(
                user_id=user,
                goal=data.get("goal"),
                amount=float(data.get("amount")),
                maturity_date=maturity_date,
                status=status
            )
            return Response({"message": "Goal created successfully."}, status=201)

        except Exception as e:
            print("Error creating goal:", str(e))  # Log the error in terminal
            return Response({"error": str(e)}, status=400)
        
@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def transaction_list(request):
    user = request.user
    print("Authenticated user:", user)
    print("Is authenticated:", user.is_authenticated)
    if request.method == "GET":
         transactions = Transaction.objects.filter(user_id=user).order_by("-date")
         transaction_data = [
              {
                   "type": t.type,
                   "amount": t.amount,
                   "description": t.budget.name if t.budget else "No budget",
                   "date": t.date.strftime("%Y-%m-%d %H:%M:%S")
              }
              for t in transactions
         ]
         return Response(transaction_data, status=200)
    elif request.method == "POST":
         data = request.data
         try:
            Transaction.objects.create(
                user_id=user,
                amount=float(data.get("amount")),
                type=data.get("type"),
                budget_id=data.get("budget"),  # assuming budget is passed as ID
                date=timezone.now()
              )
            return Response({"message": "Transaction recorded successfully"}, status=201)
         except Exception as e:
              return Response({"error": str(e)}, status=400)
