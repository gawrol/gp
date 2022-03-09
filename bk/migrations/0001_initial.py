# Generated by Django 4.0.3 on 2022-03-09 18:55

import bk.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('publisher', models.CharField(blank=True, max_length=100)),
                ('publishedDate', models.DateField(blank=True, null=True)),
                ('description', models.TextField(blank=True)),
                ('pageCount', models.IntegerField(blank=True, null=True)),
                ('averageRating', models.FloatField(blank=True, null=True)),
                ('ratingsCount', models.IntegerField(blank=True, null=True)),
                ('thumbnail', models.ImageField(default='thumbnail.jpg', upload_to='books/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('authors', models.ManyToManyField(default=bk.models.unknown_author, to='bk.author')),
                ('categories', models.ManyToManyField(blank=True, to='bk.category')),
                ('language', models.ForeignKey(default=bk.models.unknown_language, on_delete=django.db.models.deletion.SET_DEFAULT, to='bk.language')),
            ],
        ),
    ]
