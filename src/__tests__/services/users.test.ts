import dotenv from "dotenv";
import { userService } from "services";
dotenv.config();

import { v4 } from "uuid";
import connection from '../utils';

import { SignupInput } from "types";

describe('Testing user service', () => {

  beforeAll(async ()=>{
    await connection.create();
  });
  
  afterAll(async ()=>{
    await connection.close();
  });
  
  beforeEach(async () => {
    await connection.clear();
  });

  describe('Creating users', () => {
    test('Creating a user', async () => {
      const createUserParams: SignupInput = {
        email: `test+${v4()}@gmail.com`,
        password: 'testers',
        firstName: 'test user',
        lastName: 'last name',
        isAdmin: true
      }
  
      try {
        const createdUser = await userService.createUser(createUserParams)
  
        expect(createdUser).toBeTruthy();
      } catch (err) {
        console.log({err})
      }
    });
  
    test('Erroring if password is less than 6 characters', async () => {
      const createUserParams: SignupInput = {
        email: `test+${v4()}@gmail.com`,
        password: 'test',
        firstName: 'test user',
        lastName: 'last name',
        isAdmin: true
      }
  
      return expect(userService.createUser(createUserParams)).rejects.toThrow('Error creating user');
    })
  })
})
