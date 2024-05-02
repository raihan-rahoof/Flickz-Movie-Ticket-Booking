import random
from django.conf import settings
from django.core.mail import EmailMessage
from .models import User,OneTimePassword


def send_generated_otp_to_email(email): 
    subject = "One time passcode for Email verification"
    otp=random.randint(1000, 9999)
    print(otp) 
    current_site="flickz.com"
    user = User.objects.get(email=email)
    email_body=f"Hi {user.first_name} thanks for signing up on {current_site} please verify your email with the \n one time passcode {otp}"
    from_email=settings.EMAIL_HOST
    OneTimePassword.objects.create(user=user, code=otp)
    #send the email 
    d_email=EmailMessage(subject=subject, body=email_body, from_email=from_email, to=[user.email])
    d_email.send()

def send_normal_email(data):
    email=EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,
        to=[data['to_email']]
    )
    email.send()