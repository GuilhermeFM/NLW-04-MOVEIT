import { NowRequest, NowResponse } from '@vercel/node';
import { fetch } from '../../../services/mongodb';

export default async (nowRequest: NowRequest, nowResponse: NowResponse) => {
  const { id } = nowRequest.query;
  const user = await fetch(Number(id));
  return nowResponse.status(200).json(user);
};
