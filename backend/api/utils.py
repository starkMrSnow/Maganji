def format_number(phoneNo):
    if len(phoneNo) == 10 or phoneNo[0:3] != "254":
        phoneNo = phoneNo.replace(phoneNo[0], "254")
    elif len(phoneNo) != 12:
        return (None, 302)
    return (phoneNo, 200)

    