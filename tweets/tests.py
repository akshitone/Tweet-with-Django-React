from django.test import TestCase
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient

from .models import Tweet

User = get_user_model()


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='abc', password='somepassword')
        Tweet.objects.create(content='any 1st content', user=self.user)
        self.current_count = Tweet.objects.all().count()

    def test_user_created(self):
        self.assertEqual(self.user.username, 'abc')

    def test_tweet_created(self):
        tweet = Tweet.objects.create(content='any content', user=self.user)
        self.assertEqual(tweet.id, 2)
        self.assertEqual(tweet.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get('/tweets/')
        self.assertEqual(response.status_code, 200)

    def test_tweet_action_like(self):
        client = self.get_client()
        response = client.post('/tweets/action/', {'id': 1, 'action': 'like'})
        print(response.json())
        like_count = response.json().get('likes')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(like_count, 1)

    def test_tweet_create_api_view(self):
        request_data = {'content': 'my content'}
        client = self.get_client()
        response = client.post('/tweets/create/', request_data)
        self.assertEqual(response.status_code, 201)

        response_data = response.json()
        new_tweet_id = response_data.get('id')
        self.assertEqual(self.current_count+1, new_tweet_id)
