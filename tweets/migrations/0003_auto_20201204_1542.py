# Generated by Django 3.1.3 on 2020-12-04 10:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0002_tweet_re_tweet'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tweet',
            old_name='re_tweet',
            new_name='parent_tweet',
        ),
    ]
