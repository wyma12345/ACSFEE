from django.contrib import admin
from .models import Restaurant, Roles, Admins, Users, Ideas, Criticism, Surveys, Message, Answers, SurveysUser


admin.site.register(Restaurant)
admin.site.register(Roles)
admin.site.register(Admins)
admin.site.register(Users)
admin.site.register(Ideas)
admin.site.register(Criticism)
admin.site.register(Surveys)
admin.site.register(Message)
admin.site.register(Answers)
admin.site.register(SurveysUser)
