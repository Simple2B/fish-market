from twilio.rest import Client


from app.config import settings
from app.logger import log

ACCOUNT_SID = settings.ACCOUNT_SID_TWILIO
AUTH_TOKEN = settings.AUTH_TOKEN_TWILIO
SERVICE_SID = settings.MESSAGE_SERVICE_SID


def send_sms(confirm_code: str, phone_number: str):
    client_verify = Client(ACCOUNT_SID, AUTH_TOKEN)
    message = client_verify.messages.create(
        messaging_service_sid=SERVICE_SID, body=confirm_code, to=phone_number
    )
    log(log.INFO, "Message to number: [%s] has been sent", message.to)
    return f"Message to number: {message.to} has been sent"
