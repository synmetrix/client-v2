import type { Role } from "@/types/team";

import { capitalize } from "./capitalize";

export const createRoleOptions = (role: typeof Role) =>
  Object.keys(role)
    .filter((v: string | number) => isNaN(v as number))
    .map((v) => ({
      value: v,
      label: capitalize(v),
    }));