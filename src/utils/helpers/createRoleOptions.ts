import lodash from "lodash";

import type { Role } from "@/types/team";

export const createRoleOptions = (role: typeof Role) =>
  Object.keys(role)
    .filter((v: string | number) => isNaN(v as number))
    .map((v) => ({
      value: v,
      label: lodash.capitalize(v),
    }));
