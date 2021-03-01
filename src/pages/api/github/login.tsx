import { NowRequest, NowResponse } from '@vercel/node';

export default async (request: NowRequest, response: NowResponse) => {
  const { username } = request.body;

  const githubLoginUrl =
    `${process.env.GITHUB_LOGIN_URL}?scope=user` +
    `&client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_REDIRECT_URI}` +
    `&login=${username}`;

  return response.status(201).json({ githubLoginUrl });
};
