import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import axios from 'axios';

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
  const { access_token } = nowRequest.body;

  const response = await axios.get(`${process.env.GITHUB_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const { id, login: username, avatar_url: avatarUrl } = response.data;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const users = db.collection('users');

  let user = await users.findOne({ id: Number(id) });

  if (!user) {
    user = {
      id,
      username,
      avatarUrl,
      level: 0,
      currentExperience: 0,
      challengesCompleted: 0,
      RegisterDate: new Date(),
    };

    await users.insertOne(user);
  }

  return nowResponse.status(200).json(user);
};
