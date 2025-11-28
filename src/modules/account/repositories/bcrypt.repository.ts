import { Injectable } from '@nestjs/common';
import { IBcryptRepository } from '../interfaces/bcrypt-respository.inteface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptRepository implements IBcryptRepository {
  async hash(password: string): Promise<string> {
    try {
      const salt: string = await bcrypt.genSalt(10);
      const hashedPassword: string = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error: unknown) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      throw new Error(`Hashing failed: ${errorMessage}`);
    }
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error: unknown) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      throw new Error(`Comparison failed: ${errorMessage}`);
    }
  }
}
