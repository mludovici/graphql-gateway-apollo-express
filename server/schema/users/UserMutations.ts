
import {
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { isEmail } from 'validator';
import { createUser, createUsers } from '../../operations/users-operations';
import CreateUserInput from './CreateUserInputType';
import CreateUserPayload from './CreateUserPayload';
import CreateUsersPayload from './CreateUsersPayload';

const UserMutations = {
  createUser: {
    type: CreateUserPayload,
    args: {
      input: {
        type: new GraphQLNonNull(CreateUserInput),
      },
    },
    resolve: (_source, args) => {
      const { input } = args;

      if (input.email && !isEmail(input.email)) {
        throw new Error('Email is not in valid format');
      }
      return {
        user: createUser(input),
      };
    },
  },
  createUsers: {
    type: CreateUsersPayload,
    args: {
      input: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(CreateUserInput))),
      },
    },
    resolve: (_source, { input }) => {
      const createdUsers = createUsers(input);
      return {
        users: createdUsers,
      };
    },
  },
};

export default UserMutations;
