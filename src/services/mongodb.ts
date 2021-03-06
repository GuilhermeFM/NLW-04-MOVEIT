import { MongoClient, Db } from 'mongodb';

interface User {
  id: number;
  username: string;
  avatarUrl: string;
  level?: number;
  currentExperience?: number;
  challengesCompleted?: number;
}

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

export async function create(pUser: User): Promise<User> {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const users = db.collection('users');

  const { id } = pUser;
  const existingUser = await users.findOne({ id });
  if (existingUser) return existingUser;

  const user = { ...pUser, id, RegisterDate: new Date() };
  await users.insertOne(user);
  return user;
}

export async function fetch(id: number): Promise<User> {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const users = db.collection('users');
  const user = await users.findOne({ id });

  return user;
}

export async function update(id: number, pUser: User) {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const users = db.collection('users');

  const { level, currentExperience, challengesCompleted } = pUser;
  await users.updateOne({ id }, { $set: { level, currentExperience, challengesCompleted } });
}
