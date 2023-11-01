import { history, useLocation } from "@vitjs/runtime";

import type { Params } from "react-router-dom";

export type Location = {
  id?: string;
  pathname: string;
  params?: Params<string>;
  data?: unknown;
  handle?: unknown;
  query: Record<string, string>;
};

export default () => {
  try {
    const location = useLocation() as any as Location;

    const setLocation = (newPath: string): void => history.push(newPath);

    return [location, setLocation] as const;
  } catch (e) {
    // Storybook without routing context gets error
    const setLocation = (newPath: string): void => console.log(newPath);
    return [{} as Location, setLocation] as const;
  }
};
