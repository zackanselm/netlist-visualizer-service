import { InsertOneResult, ObjectId, UpdateResult } from 'mongodb';
import User from '../../models/user';
import L from '../../common/logger';
import { collections } from '../../store/connection';

export class UsersService {
  async all(): Promise<User[]> {
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
    const result = await collections?.users?.insertOne({
      ...newUser,
      created_at: new Date(),
      updated_at: new Date(),
    });

    L.debug(`create user: ${JSON.stringify(result)}`);

    return result;
  }

  async update(
    id: string,
    updatedUser: Partial<User>
  ): Promise<UpdateResult<User> | undefined> {
    const query = { _id: new ObjectId(id) };
    const result = await collections?.users?.updateOne(query, {
      $set: {
        ...updatedUser,
        updated_at: new Date(),
      },
    });

    L.debug(`update user: ${JSON.stringify(result)}`);

    return result;
  }
}

export default new UsersService();
