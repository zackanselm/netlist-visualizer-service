import { InsertOneResult, ObjectId, UpdateResult } from 'mongodb';
import User from '../../models/user';
import L from '../../common/logger';
import { collections } from '../../store/connection';

export class UsersService {
  async all(): Promise<User[]> {
    // Call find with an empty filter object, meaning it returns all documents in the collection. Saves as Game array to take advantage of types
    const users = (await collections?.users?.find({}).toArray()) || [];

    L.debug(users, 'fetch all users');

    return users;
  }

  async byEmail(email: string): Promise<User | null> {
    L.debug(`fetch user with email ${email}`);

    const query = { email };
    const user = (await collections?.users?.findOne(query)) || null;

    return user;
  }

  async byId(id: string): Promise<User | null> {
    L.debug(`fetch user with id ${id}`);

    const query = { _id: new ObjectId(id) };
    const user = (await collections?.users?.findOne(query)) || null;

    return user;
  }

  async create(newUser: User): Promise<InsertOneResult<User> | undefined> {
    const result = await collections?.users?.insertOne(newUser);

    L.debug(`create user: ${result}`);

    return result;
  }

  async update(
    id: string,
    updatedUser: Partial<User>
  ): Promise<UpdateResult<User> | undefined> {
    const query = { _id: new ObjectId(id) };
    const result = await collections?.users?.updateOne(query, {
      $set: updatedUser,
    });

    L.debug(`update user: ${result}`);

    return result;
  }
}

export default new UsersService();
