import datetime
import base64
import requests
from requests.auth import HTTPBasicAuth


CONSUMER_KEY = 'VpMmAn17zODaYAcT4y9QF6U8kAHGGh7eBFqRaC8j7eG8epbR'
CONSUMER_SECRET = '748QBAkGNe57WRpl6FyvNu8ZxWnDwKpiDbW4HDIVOaP8BZzjYUAJmii9igcJLPnq'

def get_access_token():
    url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET))
    token = response.json().get("access_token")
    print(response.text)
    return token
    


BUSINESS_SHORTCODE = "6792295"
PASSKEY = "1a92dbfef3c99f0f612fd971855568232c369cf2ae9549e90aef997408d7dfd0"
PHONE_NUMBER = "254711657476"
CALLBACK_URL = "https://maganji.onrender.com/callback"


def stk_push(amount):
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    password = base64.b64encode((BUSINESS_SHORTCODE + PASSKEY + timestamp).encode()).decode()
    headers = {
        "Authorization": f"Bearer {get_access_token()}",
        "Content-Type": "application/json"
        }
    
    payload = {
        "BusinessShortCode": BUSINESS_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": PHONE_NUMBER,
        "PartyB": BUSINESS_SHORTCODE,
        "PhoneNumber": PHONE_NUMBER,
        "CallBackURL": CALLBACK_URL,
        "AccountReference": "account_reference",
        "TransactionDesc": "Payment for order"
    }

    url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    response = requests.post(url, json=payload, headers=headers)
    # print(response.text)
    return response.json()


INITIATOR_NAME = 'testapi'
SECURITY_CREDENTIAL = 'GENERATED_SECURITY_CREDENTIAL'  # from Safaricom portal
SHORTCODE = '600XXX'  # Your B2C shortcode
CALLBACK_URL = 'https://yourdomain.com/b2c_callback'


# === Perform B2C Transaction ===
def b2c_request(phone_number, amount, remarks="Salary Payment"):
    access_token = get_access_token()
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    payload = {
        "InitiatorName": INITIATOR_NAME,
        "SecurityCredential": SECURITY_CREDENTIAL,
        "CommandID": "BusinessPayment",  # other options: SalaryPayment, PromotionPayment
        "Amount": amount,
        "PartyA": SHORTCODE,
        "PartyB": phone_number,
        "Remarks": remarks,
        "QueueTimeOutURL": CALLBACK_URL,
        "ResultURL": CALLBACK_URL,
        "Occasion": "Monthly Payment"
    }

    response = requests.post(
        "https://api.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
        headers=headers,
        json=payload,
        timeout=10
    )

    print("B2C Response:", response.json())
    return response.json()
