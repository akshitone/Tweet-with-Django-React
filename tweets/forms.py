from django import forms
from django.forms import fields

from .models import Tweet


class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['content']
