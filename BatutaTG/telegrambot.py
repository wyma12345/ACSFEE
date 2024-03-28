import logging
from time import sleep
from datetime import date

import telebot
from telebot import types

from .models import Users, Ideas, Criticism, Surveys, Answers, Admins

WEBHOOK = '5649539189:AAGurgopNJYSG2SiD-mKRp4FUuLU-BfzuRE'

bot = telebot.TeleBot(WEBHOOK)
logger = logging.getLogger(__name__)

register_user_chat_id = []
send_ideas_user_chat_id = []
send_criticism_user_chat_id = []

send_surveys_user_chat_id = {}
send_answer_user_chat_id = {}
send_surveys_name = {}


# region menu functions

def __show_menu(message):
    """
    Выводит меню
    :param message:
    :return:
    """
    keyboard = types.InlineKeyboardMarkup()
    keyboard.add(types.InlineKeyboardButton(text="Подать идею", callback_data="ideas"))
    keyboard.add(types.InlineKeyboardButton(text="Пожаловаться", callback_data="criticism"))
    keyboard.add(types.InlineKeyboardButton(text="Пройти опрос", callback_data="surveys"))
    bot.send_message(message.chat.id, "Выберите дальнейшее действие", reply_markup=keyboard)


# region call ideas and criticism
@bot.callback_query_handler(func=lambda call: call.data == 'ideas')  # переход к идеям
def call_ideas(call: types.CallbackQuery):
    """
    Нажата кнопки идея
    :param call:
    :return:
    """
    bot.send_message(call.message.chat.id, "Напишите идею")
    send_ideas_user_chat_id.append(call.message.chat.id)
    bot.answer_callback_query(callback_query_id=call.id)
    bot.delete_message(call.message.chat.id, call.message.message_id)


@bot.callback_query_handler(func=lambda call: call.data == 'criticism')  # переход к критике
def call_criticism(call: types.CallbackQuery):
    """
    Нажата кнопка критика
    :param call:
    :return:
    """
    bot.send_message(call.message.chat.id, "Напишите свою жалобу")
    send_criticism_user_chat_id.append(call.message.chat.id)
    bot.answer_callback_query(callback_query_id=call.id)
    bot.delete_message(call.message.chat.id, call.message.message_id)


# endregion

@bot.callback_query_handler(func=lambda call: call.data == 'surveys')  # переход к выбору опроса
def call_surveys(call: types.CallbackQuery):
    """
    Если нажата кнопка опроса
    :param call:
    :return:
    """
    bot.answer_callback_query(callback_query_id=call.id)  # отвечаем что получили нажатие кнопки
    bot.delete_message(call.message.chat.id, call.message.message_id)  # удаляем сообщение с кнопками

    user = Users.objects.filter(Description=call.message.chat.id)[0]  # берем юзера, который написал
    queryset_answers = [i.Surveys_id.Topic for i in
                        Answers.objects.filter(User_id=user.id)]  # берем название всех опросов, на которые ответил юзер
    queryset_surveys = [i.Topic for i in Surveys.objects.all()]  # берем все названия опросов
    clean_surveys = [i for i in queryset_surveys if
                     i not in queryset_answers]  # находим опросы, на которые юзер еще не ответил

    if clean_surveys:  # если есть не пройденные опросы
        keyboard = types.InlineKeyboardMarkup()  # создаем клавиатуру
        for i in clean_surveys:  # выводим кнопками все опросы на которых нет ответа
            keyboard.add(
                types.InlineKeyboardButton(text=i, callback_data='sur~' + i))  # и разделяем команду от названия ~
        bot.send_message(call.message.chat.id, "Выберите доступный опрос", reply_markup=keyboard)  # выводим кнопки
    else:
        bot.send_message(call.message.chat.id, "Не пройденных опросов нет")  # говорим, что опросов нет
        __show_menu(call.message)


@bot.callback_query_handler(func=lambda call: call.data.split('~')[0] == 'sur')  # переход к опросу
def call_answer(call: types.CallbackQuery):  # если нажали на опрос
    """
    Выбран опрос и можно задавать вопросы
    :param call:
    :return:
    """
    survey_list = Surveys.objects.get(Topic=call.data.split('~')[1]).Text.split('~')  # вопросы-ответы от других

    send_surveys_user_chat_id[call.message.chat.id] = survey_list  # добавляем в словарь вопросы-ответы
    send_answer_user_chat_id[call.message.chat.id] = ""  # создаем пустой словарь для ответов пользователя
    send_surveys_name[call.message.chat.id] = call.data.split('~')[1]  # запоминаем имя опроса

    bot.send_message(call.message.chat.id, "Ответьте на опрос: " + call.data.split('~')[1])
    send_next_surv(call.message)  # выдаем первый вопрос

    bot.answer_callback_query(callback_query_id=call.id)
    bot.delete_message(call.message.chat.id, call.message.message_id)


# endregion

def send_next_surv(message):  # выдает следующий вопрос
    """
    Выдает след вопрос
    :param message:
    :return:
    """
    otvets = send_surveys_user_chat_id[message.chat.id][0].split('|')[1:]  # сами ответы без вопроса
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)  # создаем клавиатуру
    for i in otvets:  # добавляем кнопки с возможными ответами
        markup.add(types.KeyboardButton(i))
    if otvets[0] == "":
        bot.send_message(message.chat.id, send_surveys_user_chat_id[message.chat.id][0].split('|')[0],
                         reply_markup=types.ReplyKeyboardRemove())
    else:
        bot.send_message(message.chat.id, send_surveys_user_chat_id[message.chat.id][0].split('|')[0],
                         reply_markup=markup)
    send_answer_user_chat_id[message.chat.id] += send_surveys_user_chat_id[message.chat.id][0].split('|')[
        0]  # вводим в список ответов первый вопрос


def new_feedback_idea(feedback, user):
    """
    Ответ на идею
    :param feedback:
    :param user:
    :return:
    """
    chat_id = Users.objects.get(id=user.id).Description
    bot.send_message(chat_id, "Ответ на ваше предложение:\n" + feedback)


def new_message_notify_admins():
    pass


def new_feedback_criticism(feedback, user):
    """
        Ответ на критику
    :param feedback:
    :param user:
    :return:
    """
    chat_id = Users.objects.get(id=user.id).Description
    bot.send_message(chat_id, "Ответ на вашу жалобу:\n" + feedback)


def new_message(text, send_chat_id="all", send_restaurants_id='all'):
    """
    Рассылка сообщений
    :param send_restaurants_id:
    :param send_chat_id:
    :param text:
    :return:
    """
    if send_chat_id == "all":
        if send_restaurants_id=='':
            send_restaurants_id = 'all'

        if send_restaurants_id == 'all':
            chat_ids = Users.objects.values_list('Description', flat=True)
        else:
            chat_ids = Users.objects.filter(Restaurants_id=send_restaurants_id).values_list('Description', flat=True)
        for count, i in enumerate(chat_ids):
            if count % 29 == 0:
                sleep(1)
            if i:
                try:
                    bot.send_message(i, text)
                finally:
                    print("Пользователь {} заблокировал бота".format(i))
    else:
        try:
            bot.send_message(send_chat_id, text)
        finally:
            print("Пользователь {} заблокировал бота".format(send_chat_id))


# region /Start
@bot.message_handler(commands=['start'])
def __send_welcome(message):
    """
    Начало работы и проверка на индетнификацию
    :param message:
    :return:
    """
    queryset = Users.objects.filter(Description=message.chat.id)  # зареган ли пользователь (по сохраненному chat.id)
    if not queryset:  # если нет, то отправляем на аунтификацию
        # markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
        # btn1 = types.KeyboardButton("Да")
        # btn2 = types.KeyboardButton("Нет")
        # markup.add(btn1, btn2)
        markup_request = types.ReplyKeyboardMarkup(resize_keyboard=True).add(
            types.KeyboardButton('Отправить свой контакт ☎️', request_contact=True)
        )
        bot.send_message(message.chat.id, 'Пожалуйста, нажмите на кнопку, что бы мы могли проверить ваш номер',
                         reply_markup=markup_request)
        register_user_chat_id.append(message.chat.id)
    else:
        a = telebot.types.ReplyKeyboardRemove()
        bot.send_message(message.chat.id, 'Идентификация пройдена', reply_markup=a)
        __show_menu(message)


# endregion

# region Проверка регистрации
@bot.message_handler(func=lambda message: True, content_types=['contact'])
def register_new_user(message):
    # region check register
    # ввели телефон и проверяем есть ли он в базе
    if message.chat.id in register_user_chat_id:
        tel = message.contact.phone_number

        if tel[0] == '8' or tel[0] == '7':
            tel = tel[1:]
        elif tel[0:2] == '+7':
            tel = tel[2:]

        queryset = list(Users.objects.filter(Telephone=tel))  # берем сет по юзерам
        if not queryset:  # если в юзерах нет
            queryset = list(Admins.objects.filter(Telephone=tel))  # берем по админам
        if not queryset:  # если пользователя нет в бд, то говорим об этом
            bot.send_message(message.chat.id, 'Вас нет в бд')
            register_user_chat_id.remove(message.chat.id)
            __send_welcome(message)
        else:  # если пользователь есть в бд
            queryset[0].Description = message.chat.id  # сохраняем chat.id
            queryset[0].save()
            bot.send_message(message.chat.id, 'Идентификация пройдена',
                             reply_markup=types.ReplyKeyboardRemove())  # говорим, что пользователь уже зареган
            register_user_chat_id.remove(message.chat.id)
            __show_menu(message)
    # endregion


# endregion

@bot.message_handler(func=lambda message: True, content_types=['text'])
def echo_message(message):
    """
    Работа с сообщениями
    :param message:
    :return:
    """
    # region check ideas
    # ввели идею, заносим ее в бд
    if message.chat.id in send_ideas_user_chat_id:
        print('22')
        User = Users.objects.get(Description=message.chat.id)
        change_ideas = Ideas(Topic='Новое', Text=message.text, Read=False,  # добавляем новую идею
                             Color=0, FeedBack='', Comment='', Data=date.today(),
                             User_id=User)
        change_ideas.save()
        print('11111')
        # admin_chat_list = Admins.objects.filter(Restaurants_id=User.Restaurants_id).values_list('Description', flat=True)
        # for i in admin_chat_list:
        #     bot.send_message(i, 'Получена новая идея от {}:\n{}'.format(User.FIO, message.Text))  # говорим, что идея пренита

        bot.send_message(message.chat.id, 'Идея отправлена')  # говорим, что идея пренита
        send_ideas_user_chat_id.remove(message.chat.id)

        __show_menu(message)
    # endregion

    # region check criticism
    # ввели жалобу, заносим ее в бд
    elif message.chat.id in send_criticism_user_chat_id:
        User = Users.objects.get(Description=message.chat.id)
        change_criticism = Criticism(Topic='Новое', Text=message.text, Read=False,
                                     Color=0, FeedBack='', Comment='',
                                     Data=date.today(), User_id=User)
        change_criticism.save()
        # try:
        #     admin_chat_list = Admins.objects.filter(Restaurants_id=User.Restaurants_id).values_list('Description', flat=True)
        #     print(admin_chat_list)
        #     for i in admin_chat_list:
        #         bot.send_message(i, 'Получена новая жалоба: \n{}'.format(message.text))  # говорим, что получен новая жалоба
        # finally:
        #     print('пользователя нет')
        bot.send_message(message.chat.id, 'Жалоба отправлена')  # говорим, что жалоба прента
        send_criticism_user_chat_id.remove(message.chat.id)
        __show_menu(message)
    # endregion

    # region check surveys
    # ответим на опрос, заносим ее в бд
    elif message.chat.id in send_surveys_user_chat_id:
        otvets = send_surveys_user_chat_id[message.chat.id][0].split('|')[1:]  # сами ответы без вопроса
        if message.text in otvets or otvets[0] == "":  # если введенный текст есть в предложенных ответах
            send_surveys_user_chat_id[message.chat.id].pop(0)  # удаляем из списква вопросов использованный вопрос-ответ
            send_answer_user_chat_id[message.chat.id] += '|' + message.text + '~'

            if send_surveys_user_chat_id[message.chat.id]:  # если вопросы еще есть
                # send_surveys_user_chat_id[message.chat.id].pop(0)  # удаляем из списква вопросов вопрос-ответ
                send_next_surv(message)  # выводим следующий вопрос
            else:  # если нет
                # send_surveys_user_chat_id[message.chat.id].pop(0)  # удаляем из списква вопросов вопрос-ответ
                send_answer_user_chat_id[message.chat.id] = send_answer_user_chat_id[message.chat.id][
                                                            :-1]  # удаляем последний символ ~
                bot.send_message(message.chat.id, "Спасибо, ответ сохранен",
                                 reply_markup=types.ReplyKeyboardRemove())  # говорим, чсто ответ сохранен и удаляем клаву
                __show_menu(message)  # выводим меню
                change_message = Answers(Text=send_answer_user_chat_id[message.chat.id], Data=date.today(),
                                         # сохраняем ответ в бд
                                         User_id=Users.objects.get(Description=message.chat.id),
                                         Surveys_id=Surveys.objects.get(Topic=send_surveys_name[message.chat.id]))
                change_message.save()
        else:
            bot.send_message(message.chat.id,
                             "Это не предложенный ответ, используйте предложенные кнопки", )  # говорим, что этот ответ не был предложен

    # endregion

    else:  # если нет команды, то говорим об ошибке
        bot.reply_to(message, "Нераспознанная команда")


def main(data):  # при получении вебхука, говорим боту, что получили новое сообщение
    update = telebot.types.Update.de_json(data)
    bot.process_new_updates([update])
    return {"Status": "200"}  # и возвращаем ответ телеграму, что все ок


# Remove webhook, it fails sometimes the set if there is a previous webhook
bot.remove_webhook()

# Set webhook
bot.set_webhook(url='https://3c9a-109-252-171-208.ngrok-free.app/' + WEBHOOK + '/')
