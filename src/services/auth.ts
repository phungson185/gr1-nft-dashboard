import { GetNonceData, GetNonceType, GetTokenData, GetTokenType } from 'types/Auth';
import { UserType } from 'types/User';
import { client } from './axios';

const getNonce = (params: GetNonceType): Promise<GetNonceData> =>
  client.get(`/api/authentication/nonce`, { params });
const getToken = (body: GetTokenType): Promise<GetTokenData> =>
  client.post(`/api/authentication/token`, body);

const getProfile = ({ address }: { address: string }): Promise<UserType> =>
  client.get(`/api/profile/${address}`);

export default {
  getNonce,
  getToken,
  getProfile,
};
