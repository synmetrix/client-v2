import md5 from "md5";

export default function dataschemasChecksum(dataschemas: any[]) {
  let checksum = dataschemas.reduce((acc, cur) => acc + cur.code, "");
  checksum = md5(checksum);

  return checksum;
}
