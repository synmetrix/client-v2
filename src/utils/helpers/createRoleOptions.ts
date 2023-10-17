import type { ChangeableRoles } from "@/types/team";

import { capitalize } from "./capitalize";

export const createRoleOptions = (role: typeof ChangeableRoles) =>
  Object.keys(role)
    .filter((v: string | number) => isNaN(v as number))
    .map((v) => ({
      value: v,
      label: capitalize(v),
    }));
