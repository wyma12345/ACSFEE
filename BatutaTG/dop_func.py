from collections import Counter
from itertools import repeat, chain


def answer_statistic(queryset):
    #print(queryset)
    p = list(set([i["Surveys_id"] for i in queryset]))  # узнаем на какие опросы есть ответы ()список имеющихся опросов
    response = []
    #print('p', p)
    for index, elem in enumerate(p):  # рассматриваем ответы только на конкретный опрос
        x = [j["Text"].split('~') for j in queryset if
             j["Surveys_id"] == elem]  # делаем список ответов [[su|ot11, su2|ot12],[su|ot21, su2|ot22]]
        #print('x', x)
        #print("max", max(x, key=len))
        sur = {j.split('|')[0]: [] for j in
               max(x, key=len)}  # создаем словарь в котором ключи это вопросы, а значения-список ответов

        #print('sur', sur)
        for j in x:  # перебираем все ответы и заносим их в словарь по ключу
            for k in j:
                t = k.split('|')
                #print('t', t)
                sur[t[0]].append(t[1])

        for key in sur:  # ищем самые частые ответы
            # sur[key] = max(sur[key], key=sur[key].count)
            #sur[key] = list(chain.from_iterable(repeat(elem, c) for elem, c in Counter(sur[key]).most_common()))
            result = []# сортируем по частоте встречи в массиве
            for x in [x for i, x in enumerate(sur[key]) if i == sur[key].index(x)]:
                result.extend([x] * sur[key].count(x))
            sur[key] = result

            sur[key] = list(set(sur[key]))
        response.append({'Surveys_id': elem, 'Text': sur})
    return response
