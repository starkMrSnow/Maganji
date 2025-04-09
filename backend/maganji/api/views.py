from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.db.utils import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from .utils import *
from .models import *
# Create your views here.

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def login_view(request):
    if request.method == "POST":
        user = authenticate(
            request,
            username=request.data.get("phoneNo"),
            password=request.data.get("password")
        )
        if user is not None:
            login(request, user)
            stk_push()
            return Response({"message":"Login successful"}, status=200)
        elif user is None:
            return Response({"message":"Invalid password/username"}, status=401)
    logout(request)
    return Response({"message":"login"}, status=200)


@api_view(['GET','POST'])
@permission_classes([AllowAny])
def signup_view(request):
    if request.method == "POST":  
            print(request.data)
            try:
                user = User.objects.create(
                    first_name=request.data.get("firstName").strip(),
                    last_name=request.data.get("lastName").strip(),
                    phone_no=request.data.get("phoneNo"),
                    national_id=request.data.get("nationalID"),
                    email = request.data.get("email")
                )
                user.set_password(f'{request.data.get("password")}')
                user.save()
                login(request, user)
                return Response({"message":"Registration successful"}, status=200)
            except IntegrityError:
                return Response({"message":"User already exists"}, status=401)
    return Response({"message":"signup"}, status=200)


@api_view(['GET','POST'])
@permission_classes([AllowAny])
def initiate_payment(request):
    print(request.data)
    # stk_push()
    return Response(status=200)


@api_view(['GET','POST'])
@permission_classes([AllowAny])
def callback_view(request):
    if request.method == "POST":
        print(request.data)
        return Response(status=200)
    return Response(status=201)
     

@api_view(['GET'])
@permission_classes([AllowAny])
def budget_list(request):
    user = request.user
    if user.is_authenticated:
        budgets = Budget.objects.filter(user_id=user)

        budget_data = []
        for budget in budgets:           
            budget_data.append({
                "budget": budget.budget,
                "amount": budget.amount,
                "due_date": budget.due_date.strftime("%Y-%m-%d %H:%M:%S")
            })
        return Response(budget_data, status=200)
    else:
        return Response({"message": "Unauthorized"}, status = 401)