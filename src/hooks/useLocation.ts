import { history, useLocation } from "@vitjs/runtime";

import type { Params } from "react-router-dom";

type Location = {
  id?: string;
  pathname: string;
  params?: Params<string>;
  data?: unknown;
  handle?: unknown;
  query: Record<string, string>;
};

export default () => {
  const location = useLocation() as unknown as Location;

  const setLocation = (newPath: string): void => history.push(newPath);

  return [location, setLocation] as const;
};
