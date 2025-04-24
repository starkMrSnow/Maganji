import google.generativeai as genai
import os
import fitz
import re
import tabula
import pandas as pd

def parse_pdf(pdf_file, password):
    # Extract tables (you can also use pages='all' to process multiple pages)
    tables = tabula.read_pdf(
        pdf_file,
        pages="all",
        password=password,
        multiple_tables=True,  # allows extraction of multiple tables
        pandas_options={"header": 0}  # can be adjusted to match your data
    )

    valid_tables = [df for df in tables if df.shape[1] == 8]

    cleaned_tables = []
    for df in valid_tables:
        df.columns = df.columns.str.strip()  # remove extra whitespace
        df = df.dropna(how='all')            # drop rows that are completely empty
        cleaned_tables.append(df)

    # Combine into a single DataFrame (optional)
    combined_df = pd.concat(cleaned_tables, ignore_index=True)

    combined_df = combined_df.fillna("")
    print(combined_df.describe())
    return combined_df, 200




# Utility Functions
def ai_prompt(input):
    # Get your API key
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set.")
    else:
        genai.configure(api_key=api_key)


    model = genai.GenerativeModel("models/gemma-3-27b-it")
    prompt = input  
    try:
        response = model.generate_content(prompt)
        print("\nResponse from the model:")
        print(response.text)
    except Exception as e:
        print(f"An error occurred during content generation: {e}")


def clean_money(value: str) -> float:
    return float(value.replace(",", "")) if value and value.strip() else 0.0

def classify_transaction(details: str) -> str:
    details_lower = details.lower()
    if "funds received from" in details_lower:
        return "Deposit"
    elif "customer transfer to" in details_lower:
        return "Send Money"
    elif "customer payment to small\rbusiness" in details_lower:
        return "Pochi La Biashara"
    elif "merchant payment to" in details_lower:
        return "Till"
    elif "pay bill" in details_lower:
        return "Paybill"
    elif "transfer of funds charge" in details_lower:
        return "Transaction Fee"
    else:
        return "Unknown"

def format_dataframe(df):
    transactions = []
    for i in range(len(df["Receipt No."])):
        transactions.append({
            "receipt": df["Receipt No."][i],
            "timestamp": df["Completion Time"][i],
            "raw_details": df["Details"][i],
            "status": df["Transaction Status"][i],
            "type": classify_transaction(df["Details"][i]),
            "amount_in": df["Paid In"][i],
            "amount_out": df["Withdrawn"][i],
            "balance": df["Balance"][i],
        })
    return transactions, 200
    


def format_number(phoneNo):
    if len(phoneNo) == 10 or phoneNo[0:3] != "254":
        phoneNo = phoneNo.replace(phoneNo[0], "254")
    elif len(phoneNo) != 12:
        return (None, 302)
    return (phoneNo, 200)

    