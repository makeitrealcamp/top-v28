import request from 'supertest';

import { app } from '../app/index.js';
import { getUser } from './fixtures/user.fixture.js';
import { getTweet } from './fixtures/tweet.fixture.js';
import { resetDb } from './helpers/reset-db.js';

describe('Users Sign Up', () => {
  beforeEach(async () => {
    await resetDb();
  });

  test('signed successfully', async () => {
    const agent = request(app);

    const { name, username, email } = getUser();
    const password = '12345678';
    const { content } = getTweet();

    const user = await agent.post('/api/users/signup').send({
      name,
      username,
      email,
      password,
    });

    expect(user.status).toBe(201);

    const login = await agent.post('/api/users/signin').send({
      email,
      password,
    });

    expect(login.status).toBe(200);

    const token = login.body.meta.token;

    const tweet = await agent
      .post('/api/tweets')
      .send({
        content,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(tweet.status).toBe(201);

    const { id: tweetId } = tweet.body.data;

    const singleTweet = await agent.get(`/api/tweets/${tweetId}`);

    expect(singleTweet.status).toBe(200);

    const tweets = await agent.get('/api/tweets/');
    expect(tweets.status).toBe(200);
  });
});
