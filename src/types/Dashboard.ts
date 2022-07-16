import { PaginateParamsType } from 'types/Common';

export type DashboardType = {
  totalVolume: number;
  numberOfTrace: number;
  avgPrice: number;
  ceilingPrice: number;
  floorPrice: number;
};

export type DashboardParamsType = PaginateParamsType & {
  fromDate?: number;
  toDate?: number;
};

export type ServerType = {
  id: string;
  address: string;
  connections: number;
};

export type DashboardServerType = {
  servers: ServerType[];
  count: number;
};
