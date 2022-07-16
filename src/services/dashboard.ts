import { SystemType, SystemUpdateType } from 'types/System';
import { UpdateUserParams, UserPaginateParams, UserPaginateType } from 'types/User';
import { client } from './axios';

const fetchSystem = (): Promise<SystemType> => client.get(`/api/system`);
const updateSystem = ({ id, nftContractAddress }: SystemUpdateType) =>
  client.put(`/api/system/${id}?nftContractAddress=${nftContractAddress}`);
const fetchUsers = (params?: UserPaginateParams): Promise<UserPaginateType> => client.get(`/api/users`, { params });
const updateUser = ({ id, ...params }: UpdateUserParams) => client.put(`/api/users/${id}`, { params });

export default {
  fetchSystem,
  updateSystem,
  fetchUsers,
  updateUser,
};
