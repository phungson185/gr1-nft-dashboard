import { PaginateParamsType, PaginateType } from './Common';

export type ItemType = {
  _id: string;
  sumAmount: number;
  hash: string;
  createdAt: string;
  updatedAt: string;
};

export type ItemParamsType = PaginateParamsType & {
  orderBy?: string;
};

export type ItemPaginateType = PaginateType & {
  items: ItemType[];
};

export type ItemMintType = {
  tokenIds: string[];
  amount: number;
  itemId: string;
  type: '1155' | '721';
  owner?: string;
};
