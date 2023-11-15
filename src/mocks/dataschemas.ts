import type { Dataschema } from "@/types/dataschema";

export const dataschemasMock: Dataschema[] = [
  {
    id: "96550649-a66e-4662-97f1-ad8cf4a59b52",
    name: "Suppliers.yml",
    code: "cubes:\n  - name: Suppliers\n    sql: SELECT * FROM public.suppliers\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: address\n        sql: address\n        type: string\n\n      - name: email\n        sql: email\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
    created_at: "2023-11-02T15:57:50.353235+00:00",
    updated_at: "2023-11-02T15:57:50.353235+00:00",
    datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
  },
  {
    id: "4ed38e57-5620-461b-b6cd-96ddbd9ea2f4",
    name: "Users.yml",
    code: "cubes:\n  - name: Users\n    sql: SELECT * FROM public.users\n    joins: [];\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: city\n        sql: city\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: gender\n        sql: gender\n        type: string\n\n      - name: firstName\n        sql: first_name\n        type: string\n\n      - name: lastName\n        sql: last_name\n        type: string\n\n      - name: state\n        sql: state\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
    created_at: "2023-11-02T15:57:50.353235+00:00",
    updated_at: "2023-11-02T15:57:50.353235+00:00",
    datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
  },
  {
    id: "489651d5-d1e3-44d7-afe8-0dfcfb1d40a2",
    name: "test",
    code: "",
    created_at: "2023-11-02T15:57:50.353235+00:00",
    updated_at: "2023-11-02T15:57:50.353235+00:00",
    datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
  },
];
