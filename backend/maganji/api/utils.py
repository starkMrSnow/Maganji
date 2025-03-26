import datetime
import base64
import requests
from requests.auth import HTTPBasicAuth


CONSUMER_KEY = "1b9okLrmahMcsmSGNRG8ABl2canWwue7cz3AtEk7AiqYTUiI"
CONSUMER_SECRET = "sNYXBg6o2uG8ZD6CGMYKWkqALJMQYg7SCVqmN1VqtsLGVGDnNE9p5Ps8B3CBaO0z"

def get_access_token():
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET))
    token = response.json().get("access_token")
    return token


BUSINESS_SHORTCODE = "174379"
PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2c2c546c272b8c16e7a3d5b567f10bdb"
PHONE_NUMBER = "254711657476"
AMOUNT = 10
CALLBACK_URL = "http://127.0.0.1:8000/callback"


def stk_push():
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    password = base64.b64encode((BUSINESS_SHORTCODE + PASSKEY + timestamp).encode()).decode()

    headers = {"Authorization": f"Bearer {get_access_token()}"}
    payload = {
        "BusinessShortCode": BUSINESS_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": AMOUNT,
        "PartyA": PHONE_NUMBER,
        "PartyB": BUSINESS_SHORTCODE,
        "PhoneNumber": PHONE_NUMBER,
        "CallBackURL": CALLBACK_URL,
        "AccountReference": "account_reference",
        "TransactionDesc": "Payment for order"
    }

    url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    response = requests.post(url, json=payload, headers=headers)
    return response.json()