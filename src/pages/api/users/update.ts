import { NowRequest, NowResponse } from '@vercel/node';
import { update } from '../../../services/mongodb';

export default async (nowRequest: NowRequest, nowResponse: NowResponse) => {
  const { id, info } = nowRequest.body;
  await update(id, { ...info });
  return nowResponse.status(200).json({});
};
