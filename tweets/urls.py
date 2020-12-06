from django.urls import path

from .views import (tweet_detail_view, tweet_list_view,
                    tweet_create_view, tweet_delete_view,
                    tweet_action_view)

urlpatterns = [
    path('', tweet_list_view),
    path('<int:tweet_id>/', tweet_detail_view),
    path('create/', tweet_create_view),
    path('action/', tweet_action_view),
    path('delete/<int:tweet_id>/', tweet_delete_view),
]
