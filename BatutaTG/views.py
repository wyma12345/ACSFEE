from random import randint

from django.contrib.auth import login, authenticate
from django.db.models import Q
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import *
from datetime import date
from .dop_func import answer_statistic
from .telegrambot import main, new_feedback_idea, new_feedback_criticism, new_message
from rest_framework.authentication import SessionAuthentication


@api_view()  # Аунтифицирован ли пользователь
@authentication_classes([SessionAuthentication])
def is_authenticat(request: Request):
    if request.user.is_authenticated:
        return Response({'isAuthenticat': 'true'})
    else:
        return Response({'isAuthenticat': 'false'})


@api_view(['POST'])  # аунтификация
def login1(request: Request):
    serializer = LoginRequestSerializer(data=request.data)
    if serializer.is_valid():
        authenticated_user = authenticate(**serializer.validated_data)
        if authenticated_user is not None:
            login(request, authenticated_user)
            return Response({'status': 'Success'})
        else:
            return Response({'error': 'Invalid credentials'}, status=403)
    else:
        return Response(serializer.errors, status=400)


# region Restaurant API
@api_view(['GET'])
def get_restaurant(request: Request, id=-1):
    if id < 1:
        queryset = Restaurant.objects.all()
    else:
        queryset = Restaurant.objects.filter(id=id)
    serializer_for_queryset = RestaurantMySerializer(
        instance=queryset,  # Передаём набор записей
        many=True  # Указываем, что на вход подаётся именно набор записей
    )
    return Response(serializer_for_queryset.data)


@api_view(['POST'])
def post_restaurant(request: Request):
    data = request.data
    change_restaurant = Restaurant(Name=data['Name'])
    change_restaurant.save()
    return Response({'status': 'POST Success'})


@api_view(['PUT'])
def put_restaurant(request: Request):
    data = request.data
    change_restaurant = Restaurant.objects.get(id=data['id'])
    change_restaurant.Name = data['Name']
    change_restaurant.save()
    return Response({'status': 'PUT Success'})


@api_view(['DELETE'])
def delete_restaurant(request: Request):
    data = request.data
    change_restaurant = Restaurant.objects.get(id=data['id'])
    change_restaurant.delete()
    return Response({'status': 'DELETE Success'})


# endregion

# region Roles API
@api_view(['GET'])
def get_roles(request: Request):
    queryset = Roles.objects.all()
    serializer_for_queryset = RolesMySerializer(
        instance=queryset,  # Передаём набор записей
        many=True  # Указываем, что на вход подаётся именно набор записей
    )
    return Response(serializer_for_queryset.data)


@api_view(['POST'])
def post_roles(request: Request):
    data = request.data
    change_restaurant = Roles(Name=data['Name'])
    change_restaurant.save()
    return Response({'status': 'POST Success'})


@api_view(['PUT'])
def put_roles(request: Request):
    data = request.data
    change_restaurant = Roles.objects.get(id=data['id'])
    change_restaurant.Name = data['Name']
    change_restaurant.save()
    return Response({'status': 'PUT Success'})


@api_view(['DELETE'])
def delete_roles(request: Request):
    data = request.data
    change_restaurant = Roles.objects.get(id=data['id'])
    change_restaurant.delete()
    return Response({'status': 'DELETE Success'})


# endregion

# region Users API
@api_view(['GET'])
def get_users(request: Request, id_adm_rest=-1):
    queryset = Users.objects.order_by('Restaurants_id', 'FIO')
    if id_adm_rest > 0:
        queryset = queryset.filter(Restaurants_id=id_adm_rest)
    serializer_for_queryset = UsersSerializer(
        instance=queryset,  # Передаём набор записей
        many=True  # Указываем, что на вход подаётся именно набор записей
    )
    return Response(serializer_for_queryset.data)

@api_view(['GET'])
def get_one_user(request: Request, id_user=-1):
        queryset = Users.objects.get(id=id_user)
        serializer_for_queryset = UsersSerializer(
            instance=queryset,  # Передаём набор записей
        )
        return Response(serializer_for_queryset.data)




@api_view(['POST'])
def post_users(request: Request):
    data = request.data
    change_people = Users(FIO=data['FIO'], Telephone=data['Telephone'], Description="",
                          Authority=data['Authority'],
                          Restaurants_id=Restaurant.objects.get(id=int(data['Restaurants_id'])),
                          Roles_id=Roles.objects.get(id=int(data['Roles_id'])))
    change_people.save()
    return Response({'status': 'POST Success'})


@api_view(['PUT'])
def put_users(request: Request):
    data = request.data
    change_people = Users.objects.get(id=data['id'])
    change_people.fio = data['FIO']
    change_people.Telephone = data['Telephone']
    change_people.Authority = data['Authority']
    change_people.Restaurants_id = Restaurant.objects.get(id=int(data['Restaurants_id']))
    change_people.Roles_id = Roles.objects.get(id=int(data['Roles_id']))
    change_people.save()
    return Response({'status': 'PUT Success'})


@api_view(['DELETE'])
def delete_users(request: Request):
    data = request.data
    change_people = Users.objects.get(id=data['id'])
    change_people.delete()
    return Response({'status': 'DELETE Success'})


# endregion

# region Admins API
@api_view(['GET'])
def get_admins(request: Request, tel_adm=""):
    if tel_adm == "":
        queryset = Admins.objects.all()
    else:
        queryset = Admins.objects.all().filter(Telephone=tel_adm)

    serializer_for_queryset = AdminsMySerializer(
        instance=queryset,  # Передаём набор записей
        many=True  # Указываем, что на вход подаётся именно набор записей
    )
    return Response(serializer_for_queryset.data)


@api_view(['POST'])
def post_admins(request: Request):
    data = request.data
    change_admins = Admins(FIO=data['FIO'], Telephone=data['Telephone'], Description=data['Description'],
                           Authority=data['Authority'],
                           Restaurants_id=Restaurant.objects.get(id=int(data['Restaurants_id'])))
    change_admins.save()
    return Response({'status': 'POST Success'})


@api_view(['POST'])
def admins_register(request: Request):  # аунтификация админа на сайте через бота
    data = request.data
    print(data)
    queryset = list(Admins.objects.filter(Telephone=data['Telephone']))
    if not queryset:  # если пользователя нет в бд, то говорим об этом
        return Response({'register_status': 'bad_res'})
    else:  # если пользователь есть в бд
        kod = randint(10000, 100000)  # генерируем случайный код
        new_message("Выш проверочный код: " + str(kod), queryset[0].Description)  # высылаем этот код в бота
        return Response({'register_status': kod})


@api_view(['PUT'])
def put_admins(request: Request):
    data = request.data
    change_admins = Admins.objects.get(id=data['id'])
    change_admins.fio = data['FIO']
    change_admins.Telephone = data['Telephone']
    change_admins.Description = data['Description']
    change_admins.Authority = data['Authority']
    change_admins.Restaurants_id = Restaurant.objects.get(id=int(data['Restaurants_id']))
    change_admins.save()
    return Response({'status': 'PUT Success'})


@api_view(['DELETE'])
def delete_admins(request: Request):
    data = request.data
    change_admins = Admins.objects.get(id=data['id'])
    change_admins.delete()
    return Response({'status': 'DELETE Success'})


# endregion

# region Ideas API
@api_view(['GET'])
def get_ideas(request: Request, id_adm_rest=-1):
    queryset = Ideas.objects.order_by('Read', 'Color')
    if id_adm_rest > 0:
        set_ind = []
        for i in queryset:
            if i.User_id.Restaurants_id.id == id_adm_rest:
                set_ind.append(i)
    else:
        set_ind = queryset

    serializer_for_queryset = IdeasSerializer(
        instance=set_ind,  # Передаём набор записей
        many=True  # Указываем, что на вход подаётся именно набор записей
    )
    return Response(serializer_for_queryset.data)


@api_view(['POST'])
def post_ideas(request: Request):
    data = request.data
    change_ideas = Ideas(Topic=data['Topic'], Text=data['Text'], Read=data['Read'],
                         Color=data['Color'], FeedBack=data['FeedBack'], Comment=data['Comment'], Data=data['Data'],
                         User_id=Users.objects.get(id=int(data['User_id'])), )
    change_ideas.save()
    return Response({'status': 'POST Success'})


@api_view(['PUT'])
def put_ideas(request: Request):
    data = request.data
    change_ideas = Ideas.objects.get(id=data['id'])
    change_ideas.Read = data['Read']
    change_ideas.Color = data['Color']
    change_ideas.Topic = data['Topic']
    if change_ideas.FeedBack != data['FeedBack']:  # если ответ не изменился, то не отправляем его в ТГ и не сэйвим
        change_ideas.FeedBack = data['FeedBack']
        new_feedback_idea(change_ideas.FeedBack, change_ideas.User_id)
    change_ideas.Comment = data['Comment']
    change_ideas.save()
    return Response({'status': 'PUT Success'})


@api_view(['DELETE'])
def delete_ideas(request: Request):
    data = request.data
    change_ideas = Ideas.objects.get(id=data['id'])
    change_ideas.delete()
    return Response({'status': 'DELETE Success'})


# endregion

# region Criticism API
@api_view(['GET'])
def get_criticism(request: Request, id_adm_rest=-1):
    queryset = Criticism.objects.order_by('Read', 'Color')
    if id_adm_rest > 0:
        set_ind = []
        for i in queryset:
            if i.User_id.Restaurants_id.id == id_adm_rest:
                set_ind.append(i)
    else:
        set_ind = queryset

    serializer_for_queryset = CriticismSerializer(
        instance=set_ind,  # Передаём набор записей
        many=True  # Указываем, что на вход подаётся именно набор записей
    )
    return Response(serializer_for_queryset.data)


@api_view(['POST'])
def post_criticism(request: Request):
    data = request.data
    change_criticism = Criticism(Topic=data['Topic'], Text=data['Text'], Read=data['Read'],
                                 Color=data['Color'], FeedBack=data['FeedBack'], Comment=data['Comment'],
                                 Data=data['Data'])
    change_criticism.save()
    return Response({'status': 'POST Success'})


@api_view(['PUT'])
def put_criticism(request: Request):
    data = request.data
    change_criticism = Criticism.objects.get(id=data['id'])
    change_criticism.Read = data['Read']
    change_criticism.Topic = data['Topic']
    change_criticism.Color = data['Color']
    change_criticism.Comment = data['Comment']
    if change_criticism.FeedBack != data['FeedBack']:  # если ответ не изменился, то не отправляем его в ТГ и не сэйвим
        change_criticism.FeedBack = data['FeedBack']
        new_feedback_criticism(change_criticism.FeedBack, change_criticism.User_id)
    change_criticism.save()
    return Response({'status': 'PUT Success'})


@api_view(['DELETE'])
def delete_criticism(request: Request):
    data = request.data
    change_criticism = Criticism.objects.get(id=data['id'])
    change_criticism.delete()
    return Response({'status': 'DELETE Success'})


# endregion

# region Surveys API
@api_view(['GET'])
def get_surveys(request: Request, id_adm_rest=-1):
    queryset = Surveys.objects.order_by('Data')
    if id_adm_rest > 0:
        queryset = queryset.filter(Q(Restaurants_id=id_adm_rest) | Q(Restaurants_id=None))

    serializer_for_queryset = SurveysSerializer(
        instance=queryset,  # Передаём набор записей
        many=True  # Указываем, что на вход подаётся именно набор записей
    )
    for index, elem in enumerate(list(serializer_for_queryset.data)):
        if elem["Restaurants_id"]:
            elem["Restaurants_id"] = queryset[index].Restaurants_id.Name
        else:
            elem["Restaurants_id"] = 'Для всех'
    return Response(serializer_for_queryset.data)


@api_view(['POST'])
def post_surveys(request: Request):
    data = request.data
    if data['Restaurants_id'] != '':
        change_surveys = Surveys(Topic=data['Topic'], Text=data['Text'], Comment=data['Comment'],
                                 Restaurants_id=Restaurant.objects.get(id=int(data['Restaurants_id'])), Data=date.today())
    else:change_surveys = Surveys(Topic=data['Topic'], Text=data['Text'], Comment=data['Comment'], Data=date.today())
    change_surveys.save()
    try:
        new_message("Пройдите новый опрос: " + data['Topic'], send_restaurants_id=data['Restaurants_id'])
    finally:
        print("Ошибка при отправке сообщения")
    return Response({'status': 'POST Success'})


@api_view(['PUT'])
def put_surveys(request: Request):
    data = request.data
    change_surveys = Surveys.objects.get(id=data['id'])
    change_surveys.Topic = data['Topic']
    change_surveys.Text = data['Text']
    change_surveys.Comment = data['Comment']
    change_surveys.save()
    return Response({'status': 'PUT Success'})


@api_view(['DELETE'])
def delete_surveys(request: Request):
    data = request.data
    change_surveys = Surveys.objects.get(id=data['id'])
    change_surveys.delete()
    return Response({'status': 'DELETE Success'})


# endregion

# region Message API
@api_view(['GET'])
def get_message(request: Request, id_adm_rest=-1):
    queryset = Message.objects.order_by("-Data")
    if id_adm_rest > 0:
        queryset = queryset.filter(Q(Restaurants_id=id_adm_rest) | Q(Restaurants_id=None))

    serializer_for_queryset = MessageSerializer(
        instance=queryset,  # Передаём набор записей
        many=True  # Указываем, что на вход подаётся именно набор записей
    )

    for index, elem in enumerate(list(serializer_for_queryset.data)):
        if elem["Restaurants_id"]:
            elem["Restaurants_id"] = queryset[index].Restaurants_id.Name
        else:
            elem["Restaurants_id"] = 'На всю сеть'
    return Response(serializer_for_queryset.data)


@api_view(['POST'])
def post_message(request: Request):
    data = request.data
    if data['Restaurants_id'] == '':
        change_message = Message(Topic='.', Text=data['Text'], Data=date.today())
    else:
        change_message = Message(Topic='.', Text=data['Text'], Data=date.today(),
                                 Restaurants_id=Restaurant.objects.get(id=int(data['Restaurants_id'])))

    try:
        new_message(data['Text'], send_restaurants_id=data['Restaurants_id'])
    finally:
        print("Ошибка при отправке сообщения")
    change_message.save()
    return Response({'status': 'POST Success'})


@api_view(['PUT'])
def put_message(request: Request):
    data = request.data
    change_message = Message.objects.get(id=data['id'])
    change_message.Topic = data['Topic']
    change_message.Text = data['Text']
    change_message.Data = data['Data']
    change_message.save()
    return Response({'status': 'PUT Success'})


@api_view(['DELETE'])
def delete_message(request: Request):
    data = request.data
    change_message = Message.objects.get(id=data['id'])
    change_message.delete()
    return Response({'status': 'DELETE Success'})


# endregion

# region Answers API
@api_view(['GET'])
def get_answers(request: Request):
    queryset = Answers.objects.all()
    serializer_for_queryset = AnswersSerializer(
        instance=queryset,  # Передаём набор записей
        many=True  # Указываем, что на вход подаётся именно набор записей
    )
    return Response({"data": serializer_for_queryset.data, "static": answer_statistic(serializer_for_queryset.data)})


@api_view(['POST'])
def post_answers(request: Request):
    data = request.data
    change_message = Answers(Text=data['Text'], Data=data['Data'], User_id=Users.objects.get(id=int(data['User_id'])),
                             Surveys_id=Surveys.objects.get(id=int(data['Surveys_id'])))
    change_message.save()
    return Response({'status': 'POST Success'})


@api_view(['PUT'])
def put_answers(request: Request):
    data = request.data
    change_message = Answers.objects.get(id=data['id'])
    change_message.Text = data['Text']
    change_message.Data = data['Data']
    change_message.User_id = Users.objects.get(id=int(data['User_id']))
    change_message.Surveys_id = Surveys.objects.get(id=int(data['Surveys_id']))
    change_message.save()
    return Response({'status': 'PUT Success'})


@api_view(['DELETE'])
def delete_answers(request: Request):
    data = request.data
    change_message = Answers.objects.get(id=data['id'])
    change_message.delete()
    return Response({'status': 'DELETE Success'})


# endregion

# region SurveysUser API
@api_view(['GET'])
def get_surveys_user(request: Request, id_adm=-1):
    queryset = SurveysUser.objects.all()
    if id_adm > 0:
        queryset = queryset.filter(Restaurants_id=id_adm)

    serializer_for_queryset = SurveysUserSerializer(
        instance=queryset,  # Передаём набор записей
        many=True  # Указываем, что на вход подаётся именно набор записей
    )
    return Response(serializer_for_queryset.data)


@api_view(['POST'])
def post_surveys_user(request: Request):
    data = request.data
    change_surveys_user = SurveysUser(User_id=Users.objects.get(id=int(data['User_id'])),
                                      Surveys_id=Surveys.objects.get(id=int(data['Surveys_id'])))
    change_surveys_user.save()
    return Response({'status': 'POST Success'})


@api_view(['PUT'])
def put_surveys_user(request: Request):
    data = request.data
    change_surveys_user = SurveysUser.objects.get(id=data['id'])
    change_surveys_user.User_id = Users.objects.get(id=int(data['User_id']))
    change_surveys_user.Surveys_id = Surveys.objects.get(id=int(data['Surveys_id']))
    change_surveys_user.save()
    return Response({'status': 'PUT Success'})


@api_view(['DELETE'])
def delete_surveys_user(request: Request):
    data = request.data
    change_surveys_user = SurveysUser.objects.get(id=data['id'])
    change_surveys_user.delete()
    return Response({'status': 'DELETE Success'})


# endregion

@api_view(['POST'])
def telegram1_bot(request: Request):
    print(request.data)
    return Response(main(request.data))  # отправляем в обработку полученное сообщение
