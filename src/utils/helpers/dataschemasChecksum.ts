import md5 from "md5";

import type { Dataschema } from "@/types/dataschema";

export default function dataschemasChecksum(dataschemas: Dataschema[]) {
  let checksum = dataschemas.reduce((acc, cur) => acc + cur.code, "");
  checksum = md5(checksum);

  return checksum;
}
