import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';

let cachedDB: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDB) {
    return cachedDB;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDB = client.db('moveit');

  return cachedDB;
}

export default async (nowRequest: NowRequest, nowResponse: NowResponse) => {
  const { id, info } = nowRequest.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const users = db.collection('users');

  await users.updateOne({ id: Number(id) }, { $set: { ...info } });

  return nowResponse.status(200).json({});
};
