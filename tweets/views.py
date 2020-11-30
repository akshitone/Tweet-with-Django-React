from random import randint
from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

from .models import Tweet


def home_view(request, *args, **kwargs):
    return render(request, 'pages/index.html', status=200, context={"title_name": "Home Page"})


def tweet_list_view(request, *args, **kwargs):
    tweets = Tweet.objects.all()
    tweets_list = [{"id": tweet.id, "content": tweet.content, "likes": randint(0, 100)}
                   for tweet in tweets]
    data = {
        "isUser": False,
        "response": tweets_list
    }
    return JsonResponse(data)


def tweet_detail_view(request, tweet_id, *args, **kwargs):
    data = {
        "id": tweet_id,
        # "image_path": tweet.image.url
    }
    status = 200
    try:
        tweet = Tweet.objects.get(id=tweet_id)
        data["content"] = tweet.content
    except:
        data["message"] = "Not Found"
        status = 404
    return JsonResponse(data, status=status)
