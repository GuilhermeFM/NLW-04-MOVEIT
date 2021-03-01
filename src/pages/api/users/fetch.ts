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
  const { id } = nowRequest.query;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const users = db.collection('users');

  const user = await users.findOne({ id: Number(id) });

  return nowResponse.status(200).json(user);
};
