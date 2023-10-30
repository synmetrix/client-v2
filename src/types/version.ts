import type { File } from "./file";
import type { User } from "./user";

export interface Version {
  id: string;
  checksum: string;
  author: User;
  createdAt: string;
  files: File[];
  dataschemas: {
    __typename?: "dataschemas";
    id: string;
    name: string;
    code: string;
    created_at: any;
    updated_at: any;
    datasource_id: any;
  }[];
}
