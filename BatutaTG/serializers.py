# from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
from rest_framework.serializers import Serializer, ModelSerializer, CharField


# region RestaurantMySerializer
class RestaurantMySerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Restaurant
        # Поля, которые мы сериализуем
        fields = ["id", "Name"]


# endregion

# region RestaurantMySerializer
class RolesMySerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Roles
        # Поля, которые мы сериализуем
        fields = ["id", "Name"]


# endregion

# region AdminsMySerializer
class AdminsMySerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Admins
        # Поля, которые мы сериализуем
        fields = ["FIO", "Telephone", "Description", "Authority", "Restaurants_id"]


# endregion

# region UsersSerializer
class UsersSerializer(ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Users
        # Поля, которые мы сериализуем
        fields = ["id", "FIO", "Telephone", "Description", "Restaurants_id", "Roles_id"]


# endregion

# region IdeasSerializer
class IdeasSerializer(ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Ideas
        fields = ["id", 'Topic', 'Text', 'Read', 'Color', 'FeedBack', "Comment", "Data", "User_id"]


# endregion

# region CriticismSerializer
class CriticismSerializer(ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Criticism
        fields = ["id", 'Topic', 'Text', 'Read', 'Color', 'FeedBack', "Comment", "Data"]


# endregion

# region SurveysSerializer
class SurveysSerializer(ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Surveys
        fields = ["id", 'Topic', 'Text', 'Comment', 'Data', 'Restaurants_id']


# endregion

# region MessageSerializer
class MessageSerializer(ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Message
        fields = ["id", 'Topic', 'Text', 'Data', 'Restaurants_id']


# endregion

# region AnswersSerializer
class AnswersSerializer(ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Answers
        fields = ["id", 'Text', 'Data', 'User_id', 'Surveys_id']


# endregion

# region SurveysUserSerializer
class SurveysUserSerializer(ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = SurveysUser
        fields = ['User_id', 'Surveys_id']


# endregion

class LoginRequestSerializer(Serializer):
    model = Users
    Telephone = CharField(required=True)
