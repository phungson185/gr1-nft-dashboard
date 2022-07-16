import { PaginateParamsType, PaginateType } from './Common';

export type UserType = {
  id: string;
  nonce: number;
  username: string;
  address: string;
  isAdmin: boolean;
  deactivated: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserParams = {
  id: string;
  isAdmin?: boolean;
  deactivated?: boolean;
}

export type UserPaginateParams = PaginateParamsType & {
  address?: string;
};

export type UserPaginateType = PaginateType & {
  items: UserType[];
};