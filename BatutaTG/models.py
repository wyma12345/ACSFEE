from django.db import models


# region RestaurantModel
class Restaurant(models.Model):
    # id_Restaurant = models.BigAutoField(null=False, primary_key=True, auto_created=True)
    Name = models.CharField(max_length=45)

    def __str__(self):
        return self.Name


# endregion

# region RolesModel
class Roles(models.Model):
    # id_Roles = models.BigAutoField(null=False, primary_key=True, auto_created=True)
    Name = models.CharField(max_length=45)

    def __str__(self):
        return self.Name


# endregion

# region UsersModel
class Users(models.Model):
    # id_Users = models.BigAutoField(null=False, primary_key=True, auto_created=True)
    FIO = models.CharField(max_length=45)
    Telephone = models.CharField(max_length=12)
    Description = models.CharField(max_length=60, null=True, blank=True)
    Authority = models.CharField(max_length=4, null=True, blank=True)
    Restaurants_id = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)
    Roles_id = models.ForeignKey(Roles, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.FIO


# endregion

# region AdminsModel
class Admins(models.Model):
    # id_Admins = models.BigAutoField(null=False, primary_key=True, auto_created=True)
    FIO = models.CharField(max_length=45)
    Telephone = models.CharField(max_length=12)
    Description = models.CharField(max_length=60, null=True, blank=True)
    Authority = models.CharField(max_length=5, null=True, blank=True)
    Restaurants_id = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.FIO


# endregion

# region IdeasModel
class Ideas(models.Model):
    # id_Ideas = models.BigAutoField(null=False, primary_key=True, auto_created=True)
    Topic = models.CharField(max_length=100)
    Text = models.CharField(max_length=2000)
    Read = models.BooleanField()
    Color = models.SmallIntegerField()
    FeedBack = models.CharField(max_length=2000, null=True, blank=True)
    Comment = models.CharField(max_length=100, null=True, blank=True)
    Data = models.DateField()
    User_id = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.Topic


# endregion

# region CriticismModel
class Criticism(models.Model):
    Topic = models.CharField(max_length=100)
    Text = models.CharField(max_length=2000)
    Read = models.BooleanField(editable=False, default=False)
    Color = models.SmallIntegerField(default=0, editable=False)
    FeedBack = models.CharField(max_length=2000, null=True, blank=True)
    Comment = models.CharField(max_length=100, null=True, blank=True)
    Data = models.DateField()
    User_id = models.ForeignKey(Users, on_delete=models.CASCADE, null=True, editable=False)

    def __str__(self):
        return self.Topic


# endregion

# region SurveysModel
class Surveys(models.Model):
    Topic = models.CharField(max_length=100)
    Text = models.CharField(max_length=2000)
    Comment = models.CharField(max_length=100, null=True, blank=True)
    Data = models.DateField()
    DopInfo = models.CharField(max_length=100, null=True, blank=True)
    Restaurants_id = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.Topic


# endregion

# region MessageModel
class Message(models.Model):
    Topic = models.CharField(max_length=100)
    Text = models.CharField(max_length=2000)
    Data = models.DateField()
    Restaurants_id = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.Data


# endregion

# region AnswersModel
class Answers(models.Model):
    Text = models.CharField(max_length=2000)
    Data = models.DateField()
    User_id = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)
    Surveys_id = models.ForeignKey(Surveys, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.Data) + " User: " + str(self.User_id) + " Surv: " + str(self.Surveys_id)


# endregion

# region SurveysUserModel
class SurveysUser(models.Model):
    User_id = models.ForeignKey(Users, on_delete=models.CASCADE, null=True)
    Surveys_id = models.ForeignKey(Surveys, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.User_id) + str(self.Surveys_id)
# endregion
