import requests
import json
import base64

from app.config import settings
from app.logger import log

API_TOKEN = settings.API_TOKEN_UP_SENDER
USERNAME = settings.USERNAME_UP_SENDER
url = "https://capi.upsend.co.il/api/v2/SMS/SendSms"

encoded = base64.b64encode(f"{USERNAME}:{API_TOKEN}".encode()).decode()
headers = {
    "Content-Type": "application/json",
    "Authorization": "Basic {}".format(encoded),
}


def send_sms(text_sms: str, phone_number: str) -> bool:
    data = {
        "Data": {
            "Message": f"{text_sms}",
            "Recipients": [{"Phone": f"{phone_number}"}],
            "Settings": {"Sender": "Info"},
        }
    }

    res = requests.post(url, headers=headers, data=json.dumps(data))
    status_code = res.status_code
    get_data = res.json().get("Data")
    if get_data is None:
        log(
            log.ERROR,
            "Message to number: [%s] has been sent unsuccessfully. Status code [%d]",
            phone_number,
            status_code,
        )
        return False

    get_errors = get_data.get("Errors")
    if status_code == 200 and get_errors is None:
        log(
            log.INFO, "Message to number: [%s] has been sent successfully", phone_number
        )
        return True
    log(
        log.ERROR,
        "Message to number: [%s] has been sent unsuccessfully. Status code [%d]. Errors:[%s]",
        phone_number,
        status_code,
        get_errors,
    )
    return False
