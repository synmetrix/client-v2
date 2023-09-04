import type { Version } from "@/types/version";

export const versions: Version[] = [
  {
    id: "1",
    checksum: "52ac189fe94359d5aeded24a255fe5ae",
    author: {
      id: "1",
      displayName: "user name",
      email: "user@mail.com",
    },
    createdAt: "10 days ago",
    files: [
      {
        name: "Companies.yml",
        value: `Synmetrixs:
        - name: Companies
          sql: SELECT * FROM public.companies
          joins: []
      
          measures:
            - name: count
              type: count`,
        language: "yaml",
      },
      {
        name: "Companies2.yml",
        value: `Synmetrixs:
        - name: Companies
          sql: SELECT * FROM public.companies
          joins: []
      
          measures:
            - name: count
              type: count`,
        language: "yaml",
      },
    ],
  },
  {
    id: "2",
    checksum: "52ac189fe94359d5aeded24a255fe5ae",
    author: {
      id: "1",
      displayName: "user name",
      email: "user@mail.com",
    },
    createdAt: "10 days ago",
    files: [
      {
        name: "Companies.yml",
        value: `Synmetrixs:
        - name: Companies
          sql: SELECT * FROM public.companies
          joins: []
      
          measures:
            - name: count
              type: count`,
        language: "yaml",
      },
    ],
  },
];
