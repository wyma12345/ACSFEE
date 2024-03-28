# Generated by Django 4.0.2 on 2022-09-11 00:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Criticism',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Topic', models.CharField(max_length=100)),
                ('Text', models.CharField(max_length=2000)),
                ('Read', models.BooleanField()),
                ('Color', models.SmallIntegerField()),
                ('FeedBack', models.CharField(max_length=2000, null=True, blank=True)),
                ('Comment', models.CharField(max_length=100, null=True, blank=True)),
                ('Data', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Topic', models.CharField(max_length=100)),
                ('Text', models.CharField(max_length=2000)),
                ('Data', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=45)),
            ],
        ),
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=45)),
            ],
        ),
        migrations.CreateModel(
            name='Surveys',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Topic', models.CharField(max_length=100)),
                ('Text', models.CharField(max_length=2000)),
                ('Comment', models.CharField(max_length=100, null=True, blank=True)),
                ('Data', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FIO', models.CharField(max_length=45)),
                ('Telephone', models.CharField(max_length=12)),
                ('Description', models.CharField(max_length=60, null=True, blank=True)),
                ('Authority', models.CharField(max_length=4, null=True, blank=True)),
                ('Restaurants_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='BatutaTG.restaurant')),
                ('Roles_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='BatutaTG.roles')),
            ],
        ),
        migrations.CreateModel(
            name='SurveysUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Surveys_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='BatutaTG.surveys')),
                ('User_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='BatutaTG.users')),
            ],
        ),
        migrations.CreateModel(
            name='Ideas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Topic', models.CharField(max_length=100)),
                ('Text', models.CharField(max_length=2000)),
                ('Read', models.BooleanField()),
                ('Color', models.SmallIntegerField()),
                ('FeedBack', models.CharField(max_length=2000, null=True, blank=True)),
                ('Comment', models.CharField(max_length=100, null=True, blank=True)),
                ('Data', models.DateField()),
                ('User_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='BatutaTG.users')),
            ],
        ),
        migrations.CreateModel(
            name='Answers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Text', models.CharField(max_length=2000)),
                ('Data', models.DateField()),
                ('Surveys_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='BatutaTG.surveys')),
                ('User_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='BatutaTG.users')),
            ],
        ),
        migrations.CreateModel(
            name='Admins',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FIO', models.CharField(max_length=45)),
                ('Telephone', models.CharField(max_length=12)),
                ('Description', models.CharField(max_length=60, null=True, blank=True)),
                ('Authority', models.CharField(max_length=5)),
                ('Restaurants_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='BatutaTG.restaurant')),
            ],
        ),
    ]
