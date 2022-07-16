import { Dashboard } from "views/Dashboard";

type RouteType = {
  path: string;
  url?: (query: any) => string;
  name?: string;
  element: JSX.Element;
};

type PrivateRouteType = {
  [key: string]: RouteType;
};

const privateRoute: PrivateRouteType = {
  serverStatistics: {
    path: '',
    name: 'Dashboard',
    element: <Dashboard />,
  },
};

export default privateRoute;
