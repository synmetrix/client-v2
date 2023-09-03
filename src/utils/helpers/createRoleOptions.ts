import type { Team_Roles_Enum } from "@/graphql/generated";

import { capitalize } from "./capitalize";

export const createRoleOptions = (role: typeof Team_Roles_Enum) =>
  Object.keys(role)
    .filter((v: string | number) => isNaN(v as number))
    .map((v) => ({
      value: v,
      label: capitalize(v),
    }));
