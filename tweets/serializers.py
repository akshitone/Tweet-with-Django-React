from rest_framework import serializers
from django.conf import settings
from .models import Tweet

TWEET_ACTION_OPTIONS = settings.TWEET_ACTION_OPTIONS


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, attrs):
        attrs = attrs.lower().strip()  # " LiKe  " -> "like"
        if not attrs in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError(
                'This is not a valid action of tweet')
        return attrs


class TweetCreateSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes']

    def get_likes(self, tweet_obj):
        return tweet_obj.likes.count()

    def validate_content(self, attrs):
        if len(attrs) > 240:
            raise serializers.ValidationError('This tweet is too long')
        return attrs


class TweetSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    # content = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    parent_tweet = TweetCreateSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes',
                  'user', 'is_retweet', 'parent_tweet']

    def get_likes(self, tweet_obj):
        return tweet_obj.likes.count()

    # def get_content(self, tweet_obj):
    #     content = tweet_obj.content
    #     if tweet_obj.is_retweet:
    #         content = tweet_obj.parent_tweet.content
    #     return content

    def get_user(self, tweet_obj):
        return tweet_obj.user.username
