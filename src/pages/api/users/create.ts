import axios from 'axios';
import { NowRequest, NowResponse } from '@vercel/node';
import { create } from '../../../services/mongodb';

export default async (nowRequest: NowRequest, nowResponse: NowResponse) => {
  const { access_token } = nowRequest.body;

  const response = await axios.get(`${process.env.GITHUB_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const { id, login: username, avatar_url: avatarUrl } = response.data;
  const user = await create({ id, username, avatarUrl });
  return nowResponse.status(200).json(user);
};
