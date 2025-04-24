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
from .utils import *
from datetime import datetime
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
    if request.method == "POST": # Log the non-file fields (e.g., password)

        pdf_file = request.FILES.get("mpesaFile")
        password = request.POST.get("password", "").strip()

        if pdf_file is None:
            return Response({"status": "error", "message": "No file uploaded"}, status=400)
        return Response({"message": "File uploaded successfully"}, status=200)

    return Response({"message": "Invalid request method"}, status=400)
    #         print(request.data)
    #         # try:
    #         user = User.objects.create(
    #             username = request.data.get("phoneNo"),
    #             first_name=request.data.get("firstName").strip(),
    #             last_name=request.data.get("lastName").strip(),
    #             national_id=request.data.get("nationalID"),
    #             email = request.data.get("email")
    #         )
    #         user.set_password(f'{request.data.get("password")}')
    #         user.save()
    #         token, created = Token.objects.get_or_create(user=user)
    #         login(request, user)
    #         return Response({
    #              "message":"Registration successful",
    #              "token": token.key
    #              }, status=200)
    #         except IntegrityError:
    #             return Response({"message":"User already exists"}, status=401)
    # return Response({"message":"signup"}, status=200)


@api_view(['GET','POST'])
@permission_classes([permissions.IsAuthenticated])
def initiate_deposit(request):
    if request.method == "POST":
        pdf_file = request.FILES["mpesaFile"]
        password = request.data.get("password").strip()
        
        transactions, status = parse_pdf(pdf_file, password)
        formatted, status = format_dataframe(transactions)
        # print(len(transactions["Receipt No."]))
        # ai_prompt(request.data.get("phoneNo"))
        # stk_push(request.data.get("amount"), request.data.get("phoneNo"))
        return Response(formatted, status=status)
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
                "due_date": b.due_date.strftime("%Y-%m-%d %H:%M:%S"),
                "days remaining": datetime.now()
            } for b in budgets]
            return Response(budget_data, status=200)

    elif request.method == 'POST':
            data = request.data
            budget = Budget.objects.create(
                user_id=user,
                budget=data.get("budgetName"),
                amount=float(data.get("amount")),
                due_date=data.get("dueDate")  # Make sure format is right
            )
            return Response({"message": "Budget created successfully"}, status=201)
   
