from django.contrib import admin

from .models import Tweet, TweetLike


class TweetLikeAdmin(admin.TabularInline):
    model = TweetLike


class TweetContentSearch(admin.ModelAdmin):
    inlines = [TweetLikeAdmin]
    list_display = ['__str__', 'user']
    search_fields = ['content', 'user__username']

    class Meta:
        model = Tweet


admin.site.register(Tweet, TweetContentSearch)
admin.site.register(TweetLike)
