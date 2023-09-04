import type { ChangableRoles } from "@/types/team";

import { capitalize } from "./capitalize";

export const createRoleOptions = (role: typeof ChangableRoles) =>
  Object.keys(role)
    .filter((v: string | number) => isNaN(v as number))
    .map((v) => ({
      value: v,
      label: capitalize(v),
    }));
