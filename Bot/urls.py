from django.contrib import admin
from django.urls import path, include
from BatutaTG import views

urlpatterns = [
    path('5649539189:AAGurgopNJYSG2SiD-mKRp4FUuLU-BfzuRE/', views.telegram1_bot, name='telegram_bot'),
    path('api/ach/', views.is_authenticat, name='ach'),  # проверить залогинен ли
    path('api/login/', views.login1, name='login'),  # зарегаться

    # region Restaurant URL
    path('api/get_restaurant/', views.get_restaurant, name='get_restaurant'),  # получить рестораны
    #path('api/get_restaurant/<int:id>/', views.get_restaurant, name='get_restaurant'),  # получить рестораны
    #path('api/post_restaurant/', views.post_restaurant, name='post_restaurant'),  # добавить рестораны
    #path('api/put_restaurant/', views.put_restaurant, name='put_restaurant'),  # изменить рестораны
    #path('api/delete_restaurant/', views.delete_restaurant, name='delete_restaurant'),  # удалить рестораны
    # endregion

    # region Roles URL
    path('api/get_roles/', views.get_roles, name='get_roles'),  # получить роли
    #path('api/post_roles/', views.post_roles, name='post_roles'),  # добавить роли
    #path('api/put_roles/', views.put_roles, name='put_roles'),  # изменить роли
    #path('api/delete_roles/', views.delete_roles, name='delete_roles'),  # удалить роли
    # endregion

    # region Users URL
    path('api/get_users/', views.get_users, name='get_users'),  # получить людей
    path('api/get_users/<int:id_adm_rest>/', views.get_users, name='get_user'),  # получить человека
    path('api/get_one_user/<int:id_user>/', views.get_one_user, name='get_one_user'),  # получить человека
    path('api/post_users/', views.post_users, name='post_users'),  # добавить людей
    path('api/put_users/', views.put_users, name='put_users'),  # изменить людей
    path('api/delete_users/', views.delete_users, name='delete_users'),  # удалить людей
    # endregion

    # region Admins URL
    path('api/get_admins/', views.get_admins, name='get_admins'),  # получить админов
    path('api/get_admins/<str:tel_adm>/', views.get_admins, name='get_admin'),  # получить админа
    path('api/admins_register/', views.admins_register, name='get_admins_reg'),  # получить админов
    path('api/post_admins/', views.post_admins, name='post_admins'),  # добавить админов
    path('api/put_admins/', views.put_admins, name='put_admins'),  # изменить админов
    path('api/delete_admins/', views.delete_admins, name='delete_admins'),  # удалить админов
    # endregion

    # region Ideas URL
    path('api/get_ideas/', views.get_ideas, name='get_ideas'),  # получить идеи
    path('api/get_ideas/<int:id_adm_rest>/', views.get_ideas, name='get_idea'),  # получить админа
    path('api/post_ideas/', views.post_ideas, name='post_ideas'),  # добавить идеи
    path('api/put_ideas/', views.put_ideas, name='put_ideas'),  # изменить идеи
    #path('api/delete_ideas/', views.delete_ideas, name='delete_ideas'),  # удалить идеи
    # endregion

    # region Criticism URL
    path('api/get_criticism/', views.get_criticism, name='get_criticism'),  # получить критику
    path('api/get_criticism/<int:id_adm_rest>/', views.get_criticism, name='get_critic'),  # получить админа
    path('api/post_criticism/', views.post_criticism, name='post_criticism'),  # добавить критику
    path('api/put_criticism/', views.put_criticism, name='put_criticism'),  # изменить критику
    #path('api/delete_criticism/', views.delete_criticism, name='delete_criticism'),  # удалить критику
    # endregion

    # region Surveys URL
    path('api/get_surveys/', views.get_surveys, name='get_surveys'),  # получить опросы
    path('api/get_surveys/<int:id_adm_rest>/', views.get_surveys, name='get_survey'),  # получить админа
    path('api/post_surveys/', views.post_surveys, name='post_surveys'),  # добавить опросы
    #path('api/put_surveys/', views.put_surveys, name='put_surveys'),  # изменить опросы
    path('api/delete_surveys/', views.delete_surveys, name='delete_surveys'),  # удалить опросы
    # endregion

    # region Message URL
    path('api/get_message/', views.get_message, name='get_message'),  # получить сообщение
    path('api/get_message/<int:id_adm_rest>/', views.get_message, name='get_messag'),  # получить админа
    path('api/post_message/', views.post_message, name='post_message'),  # добавить сообщение
    #path('api/put_message/', views.put_message, name='put_message'),  # изменить сообщение
    path('api/delete_message/', views.delete_message, name='delete_message'),  # удалить сообщение
    # endregion

    # region Answers URL
    path('api/get_answers/', views.get_answers, name='get_answers'),  # получить ответы
    path('api/post_answers/', views.post_answers, name='post_answers'),  # добавить ответы
    path('api/put_answers/', views.put_answers, name='put_answers'),  # изменить ответы
    path('api/delete_answers/', views.delete_answers, name='delete_answers'),  # удалить ответы
    # endregion

    # region Users URL
    #path('api/get_surveys_user/', views.get_surveys_user, name='get_surveys_user'),  # получить SurveyUsers
    #path('api/post_surveys_user/', views.post_surveys_user, name='post_surveys_user'),  # добавить SurveyUsers
    #path('api/put_surveys_user/', views.put_surveys_user, name='put_surveys_user'),  # изменить SurveyUsers
    #path('api/delete_surveys_user/', views.delete_surveys_user, name='delete_surveys_user'),  # удалить SurveyUsers
    # endregion

    path('admin', admin.site.urls),

]
