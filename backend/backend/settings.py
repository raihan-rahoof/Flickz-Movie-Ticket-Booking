from django.conf import settings
import environ
import os
from pathlib import Path
from datetime import timedelta 



# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    DEBUG = (bool,False)
)

environ.Env.read_env(BASE_DIR/'.env')
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ALLOWED_HOSTS = ['*', 'http://localhost:3000']

AUTH_USER_MODEL='user_auth.User'

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt.token_blacklist',

    'user_auth',
    'social_accounts',
    'adminside',
    'theatre_side',
    'users',

    
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

CORS_ALLOW_ALL_ORIGINS=True
CORS_ALLOW_CREDENTIALS=True
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
]
CORS_ALLOWED_ORIGINS = [
     "http://localhost:3000",
     "http://localhost:8000",
     "http://localhost:5173",

    
]


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'FLICKZ',
        'USER': 'postgres',
        'PASSWORD': '1234',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}




# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'theatre_side.authentication.TheatreJWTAuthentication',
        
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    

    'AUTH_HEADER_TYPES': ('Bearer',),
    
}





# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

EMAIL_HOST = 'sandbox.smtp.mailtrap.io'
EMAIL_HOST_USER = '8b25eae7f4710c'
EMAIL_HOST_PASSWORD = '9df82fb38c9fcc'
EMAIL_PORT = '2525'
EMAIL_USE_TLS=True

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',  
    
)


GOOGLE_CLIENT_ID=env('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET=env('GOOGLE_CLIENT_SECRET')
SOCIAL_PASSWORD =env('SOCIAL_PASSWORD')