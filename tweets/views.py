from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from .models import Tweet
from .serializers import TweetSerializer, TweetActionSerializer, TweetCreateSerializer
# from django.http import HttpResponse, Http404, JsonResponse
# from random import randint
# from django import forms
# from django.conf import settings
# from django.utils.http import is_safe_url
# from django.conf import settings
# from .forms import TweetForm

# ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def home_view(request, *args, **kwargs):
    return render(request, 'pages/index.html', status=200, context={"title_name": "Home Page"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
# @authentication_classes([SessionAuthentication]) you can also auth by custom auth using ([SessionAuthentication, myAuth])
def tweet_create_view(request, *args, **kwargs):
    data = request.POST
    tweet_serializer = TweetCreateSerializer(data=data)
    if tweet_serializer.is_valid(raise_exception=True):
        tweet_serializer.save(user=request.user)
        return Response(tweet_serializer.data, status=201)
    return Response({}, status=400)


@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    tweets = Tweet.objects.all()
    tweet_serializer = TweetSerializer(tweets, many=True)
    return Response(tweet_serializer.data, status=200)


@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    tweet = Tweet.objects.filter(id=tweet_id)
    if not tweet.exists():
        return Response({}, status=404)
    first_tweet = tweet.first()
    tweet_serializer = TweetSerializer(first_tweet)
    return Response(tweet_serializer.data, status=200)


@api_view(['DELETE', 'GET', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    tweet = Tweet.objects.filter(id=tweet_id)
    if not tweet.exists():
        return Response({"message": "Not found"}, status=404)
    tweet = tweet.filter(user=request.user)
    if not tweet.exists():
        return Response({"message": "You can not delete this tweet"}, status=401)
    first_tweet = tweet.first()
    first_tweet.delete()
    return Response({"message": "Tweet removed"}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    action_serializer = TweetActionSerializer(data=request.data)
    if action_serializer.is_valid(raise_exception=True):
        data = action_serializer.validated_data
        tweet_id = data.get('id')
        tweet_action = data.get('action')
        content = data.get('content')
        tweet = Tweet.objects.filter(id=tweet_id)
        if not tweet.exists():
            return Response({"message": "Not found"}, status=404)
        first_tweet = tweet.first()
        if tweet_action == 'like':
            first_tweet.likes.add(request.user)
            tweet_serializer = TweetSerializer(first_tweet)
            return Response(tweet_serializer.data, status=200)
        elif tweet_action == 'unlike':
            first_tweet.likes.remove(request.user)
            tweet_serializer = TweetSerializer(first_tweet)
            return Response(tweet_serializer.data, status=200)
        elif tweet_action == 'retweet':
            new_tweet = Tweet.objects.create(
                user=request.user,
                parent_tweet=first_tweet,
                content=content
            )
            tweet_serializer = TweetSerializer(new_tweet)
            return Response(tweet_serializer.data, status=201)
        return Response({}, status=200)


'''
def tweet_create_view_pure_django(request, *args, **kwargs):
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    tweet_form = TweetForm(request.POST or None)
    next_url = request.POST.get("next") or None
    if tweet_form.is_valid():
        tweet = tweet_form.save(commit=False)
        # do other form related logic
        tweet.user = user
        tweet.save()
        if request.is_ajax():
            # 201 = created items
            return JsonResponse(tweet.serialize(), status=201)
        # if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
        if next_url != None:
            return redirect(next_url)
        tweet_form = TweetForm()
    if tweet_form.errors:
        if request.is_ajax():
            return JsonResponse(tweet_form.errors, status=400)
    return render(request, 'components/form.html', context={"form": tweet_form})


def tweet_list_view_pure_django(request, *args, **kwargs):
    # tweet = Tweet.objects.filter(user__username = 'tweet_admin')
    # tweet = Tweet.objects.filter(user__username_iexact = 'tweet_admin')
    tweets = Tweet.objects.all()
    # tweets_list = [{"id": tweet.id, "content": tweet.content, "likes": randint(0, 100)}
    #                for tweet in tweets]
    tweets_list = [tweet.serialize() for tweet in tweets]
    data = {
        "isUser": False,
        "response": tweets_list
    }
    return JsonResponse(data)


def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):
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
'''
