# Generated by Django 4.0.3 on 2022-03-31 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bk', '0005_alter_book_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='thumbnail',
            field=models.ImageField(default='bk/thumbnail', upload_to='bk/'),
        ),
    ]