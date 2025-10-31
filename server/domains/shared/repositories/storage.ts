import { User, IUser } from "../../../../shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<IUser | null>;
  getUserByUsername(username: string): Promise<IUser | null>;
  createUser(user: Partial<IUser>): Promise<IUser>;
}

export class MemStorage implements IStorage {
  private users: Map<string, IUser>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: string): Promise<IUser | null> {
    return this.users.get(id) || null;
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    const user = Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
    return user || null;
  }

  async createUser(insertUser: Partial<IUser>): Promise<IUser> {
    const id = (this.currentId++).toString();
    const user = { 
      ...insertUser, 
      _id: id,
      username: insertUser.username || '',
      password: insertUser.password || ''
    };
    this.users.set(id, user as IUser);
    return user as IUser;
  }
}

export const storage = new MemStorage();
