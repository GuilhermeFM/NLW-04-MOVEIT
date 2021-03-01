import { NowRequest, NowResponse } from '@vercel/node';
import axios from 'axios';

export default async (nowRequest: NowRequest, nowResponse: NowResponse) => {
  const { code } = nowRequest.body;

  const response = await axios.post(
    process.env.GITHUB_OAUTH_URL,
    {
      code: code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    },
    { headers: { Accept: 'application/json' } },
  );

  const { access_token, token_type, scope } = response.data;
  return nowResponse.status(200).json({ access_token, token_type, scope });
};
