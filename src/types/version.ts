import type { File } from "./file";
import type { User } from "./user";

export interface Version {
  id: string;
  checksum: string;
  author: User;
  createdAt: string;
  files: File[];
}
