import { history, useLocation } from "@vitjs/runtime";

export default () => {
  const location = useLocation();

  const setLocation = (newPath: string): void => history.push(newPath);

  return [location, setLocation] as const;
};
