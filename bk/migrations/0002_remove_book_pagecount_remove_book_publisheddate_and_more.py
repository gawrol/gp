# Generated by Django 4.0.3 on 2022-03-30 19:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bk', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='pageCount',
        ),
        migrations.RemoveField(
            model_name='book',
            name='publishedDate',
        ),
        migrations.RemoveField(
            model_name='book',
            name='publisher',
        ),
    ]
