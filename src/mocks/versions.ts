import type { Version } from "@/types/version";

export const versions: Version[] = [
  {
    id: "5739eeb2-c758-463c-a2b7-9c3fdb35bf03",
    checksum: "d4fd48cdd8d0beaccb34b2eba1f65bc9",
    created_at: "2023-11-02T15:57:50.353235+00:00",
    updated_at: "2023-11-02T15:57:50.353235+00:00",
    user: { display_name: "demo@mlcraft.io" },
    dataschemas: [
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
    ],
  },
  {
    id: "56e6b318-e3b8-486a-9fac-4d0235d1ae5e",
    checksum: "43bdc2b298161d2280baa63280792d31",
    created_at: "2023-11-02T15:56:34.157735+00:00",
    updated_at: "2023-11-02T15:56:34.157735+00:00",
    user: { display_name: "demo@mlcraft.io" },
    dataschemas: [
      {
        id: "cd987b1f-29b6-4038-aa64-c487bdb23b59",
        name: "LineItems.yml",
        code: 'cubes:\n  - name: LineItems\n    sql: SELECT * FROM public.line_items\n    joins:\n      - name: Products\n        sql: "{CUBE}.product_id = {Products}.id"\n        relationship: belongsTo\n\n      - name: Orders\n        sql: "{CUBE}.order_id = {Orders}.id"\n        relationship: belongsTo\n\n    measures:\n      - name: count\n        type: count\n\n      - name: quantity\n        sql: quantity\n        type: sum\n\n      - name: price\n        sql: price\n        type: sum\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n',
        created_at: "2023-11-02T15:56:34.157735+00:00",
        updated_at: "2023-11-02T15:56:34.157735+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "40cce0da-08d8-48c6-9e1d-b5f52d1aaf16",
        name: "Orders.yml",
        code: 'cubes:\n  - name: Orders\n    sql: SELECT * FROM public.orders\n    joins:\n    \n      - name: Users\n        sql: "{CUBE}.user_id = {Users}.id"\n        relationship: belongsTo\n\n      - name: Products\n        sql: "{CUBE}.product_id = {Products}.id"\n        relationship: belongsTo\n\n    measures:\n      - name: count\n        type: count\n\n      - name: number\n        sql: number\n        type: sum\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: status\n        sql: status\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n      - name: completedAt\n        sql: completed_at\n        type: time\n\n',
        created_at: "2023-11-02T15:56:34.157735+00:00",
        updated_at: "2023-11-02T15:56:34.157735+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "01f5f8cb-1ef1-4982-bec0-61b800a75040",
        name: "Products.yml",
        code: 'cubes:\n  - name: Products\n    sql: SELECT * FROM public.products\n    joins:\n      - name: Suppliers\n        sql: "{CUBE}.supplier_id = {Suppliers}.id"\n        relationship: belongsTo\n\n      - name: ProductCategories\n        sql: "{CUBE}.product_category_id = {ProductCategories}.id"\n        relationship: belongsTo\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: name\n        sql: name\n        type: string\n\n      - name: description\n        sql: description\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n',
        created_at: "2023-11-02T15:56:34.157735+00:00",
        updated_at: "2023-11-02T15:56:34.157735+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "1d9319c1-e74a-4ff8-9ac5-f67052dbab5f",
        name: "Suppliers.yml",
        code: "cubes:\n  - name: Suppliers\n    sql: SELECT * FROM public.suppliers\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: address\n        sql: address\n        type: string\n\n      - name: email\n        sql: email\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-11-02T15:56:34.157735+00:00",
        updated_at: "2023-11-02T15:56:34.157735+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "a41f5e1c-7aa6-431f-b860-2e424661d26a",
        name: "Users.yml",
        code: "cubes:\n  - name: Users\n    sql: SELECT * FROM public.users\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: city\n        sql: city\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: gender\n        sql: gender\n        type: string\n\n      - name: firstName\n        sql: first_name\n        type: string\n\n      - name: lastName\n        sql: last_name\n        type: string\n\n      - name: state\n        sql: state\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-11-02T15:56:34.157735+00:00",
        updated_at: "2023-11-02T15:56:34.157735+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "d7249762-91eb-4ce7-a2bb-6f557003a390",
        name: "orders1.yml",
        code: "",
        created_at: "2023-11-02T15:56:34.157735+00:00",
        updated_at: "2023-11-02T15:56:34.157735+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
    ],
  },
  {
    id: "3dc87bd8-6dc1-47bf-8e70-a55b7bb9b087",
    checksum: "d4fd48cdd8d0beaccb34b2eba1f65bc9",
    created_at: "2023-11-02T13:38:39.493387+00:00",
    updated_at: "2023-11-02T13:38:39.493387+00:00",
    user: { display_name: "demo@mlcraft.io" },
    dataschemas: [
      {
        id: "d9985595-eb04-4f59-8fbb-e37c45e657b0",
        name: "Suppliers.yml",
        code: "cubes:\n  - name: Suppliers\n    sql: SELECT * FROM public.suppliers\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: address\n        sql: address\n        type: string\n\n      - name: email\n        sql: email\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-11-02T13:38:39.493387+00:00",
        updated_at: "2023-11-02T13:38:39.493387+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "55a711ae-58f5-4a32-81a9-b2619097f0f9",
        name: "Users.yml",
        code: "cubes:\n  - name: Users\n    sql: SELECT * FROM public.users\n    joins: [];\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: city\n        sql: city\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: gender\n        sql: gender\n        type: string\n\n      - name: firstName\n        sql: first_name\n        type: string\n\n      - name: lastName\n        sql: last_name\n        type: string\n\n      - name: state\n        sql: state\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-11-02T13:38:39.493387+00:00",
        updated_at: "2023-11-02T13:38:39.493387+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "bddd66c4-9716-49f8-b795-9bbadf21e8ca",
        name: "test",
        code: "",
        created_at: "2023-11-02T13:38:39.493387+00:00",
        updated_at: "2023-11-02T13:38:39.493387+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
    ],
  },
  {
    id: "ff0ba482-ab25-467a-9c4a-48ec21aab333",
    checksum: "2a91c742c28e2b1211bba09452c43264",
    created_at: "2023-11-01T17:09:00.324993+00:00",
    updated_at: "2023-11-01T17:09:00.324993+00:00",
    user: { display_name: "demo@mlcraft.io" },
    dataschemas: [
      {
        id: "be2050e8-f7f4-41a9-8a4c-5313ccaae4b8",
        name: "Suppliers.yml",
        code: "cubes:\n  - name: Suppliers\n    sql: SELECT * FROM public.suppliers\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: address\n        sql: address\n        type: string\n\n      - name: email\n        sql: email\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-11-01T17:09:00.324993+00:00",
        updated_at: "2023-11-01T17:09:00.324993+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "f15562d8-7a47-4a56-b201-62ea4c04b180",
        name: "Users.yml",
        code: "cubes:\n  - name: Users\n    sql: SELECT * FROM public.users\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: city\n        sql: city\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: gender\n        sql: gender\n        type: string\n\n      - name: firstName\n        sql: first_name\n        type: string\n\n      - name: lastName\n        sql: last_name\n        type: string\n\n      - name: state\n        sql: state\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-11-01T17:09:00.324993+00:00",
        updated_at: "2023-11-01T17:09:00.324993+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "ecec2b5e-1532-4f0b-85ab-aefa2cd4c976",
        name: "test",
        code: "",
        created_at: "2023-11-01T17:09:00.324993+00:00",
        updated_at: "2023-11-01T17:09:00.324993+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
    ],
  },
  {
    id: "8048e0c2-83eb-460f-bd57-505f2fcee08a",
    checksum: "6f630942fb15e4d7255addbc4e8e8a2f",
    created_at: "2023-11-01T17:08:54.142229+00:00",
    updated_at: "2023-11-01T17:08:54.142229+00:00",
    user: { display_name: "demo@mlcraft.io" },
    dataschemas: [
      {
        id: "f3b40deb-cc28-431e-84ae-1eedd2934113",
        name: "Suppliers.yml",
        code: "cubes:\n  - name: Supplierss\n    sql: SELECT * FROM public.suppliers\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: address\n        sql: address\n        type: string\n\n      - name: email\n        sql: email\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-11-01T17:08:54.142229+00:00",
        updated_at: "2023-11-01T17:08:54.142229+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "6acece0e-5fad-4a02-8703-7e3dc04d9d99",
        name: "Users.yml",
        code: "cubes:\n  - name: Users\n    sql: SELECT * FROM public.users\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: city\n        sql: city\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: gender\n        sql: gender\n        type: string\n\n      - name: firstName\n        sql: first_name\n        type: string\n\n      - name: lastName\n        sql: last_name\n        type: string\n\n      - name: state\n        sql: state\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-11-01T17:08:54.142229+00:00",
        updated_at: "2023-11-01T17:08:54.142229+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "080fc2b1-714c-4609-96e8-0440c9be7232",
        name: "test",
        code: "",
        created_at: "2023-11-01T17:08:54.142229+00:00",
        updated_at: "2023-11-01T17:08:54.142229+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
    ],
  },
  {
    id: "1ac52039-bdbf-4e1f-8e6c-7f74acd31621",
    checksum: "2a91c742c28e2b1211bba09452c43264",
    created_at: "2023-11-01T12:54:17.363581+00:00",
    updated_at: "2023-11-01T12:54:17.363581+00:00",
    user: { display_name: "demo@mlcraft.io" },
    dataschemas: [
      {
        id: "ac9ff107-e413-4288-9ee0-bc67c0b7b814",
        name: "Suppliers.yml",
        code: "cubes:\n  - name: Suppliers\n    sql: SELECT * FROM public.suppliers\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: address\n        sql: address\n        type: string\n\n      - name: email\n        sql: email\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-11-01T12:54:17.363581+00:00",
        updated_at: "2023-11-01T12:54:17.363581+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "9ac22d37-1bc7-45b4-8981-15940238692e",
        name: "Users.yml",
        code: "cubes:\n  - name: Users\n    sql: SELECT * FROM public.users\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: city\n        sql: city\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: gender\n        sql: gender\n        type: string\n\n      - name: firstName\n        sql: first_name\n        type: string\n\n      - name: lastName\n        sql: last_name\n        type: string\n\n      - name: state\n        sql: state\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-11-01T12:54:17.363581+00:00",
        updated_at: "2023-11-01T12:54:17.363581+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "6e17f39f-26c8-4f8a-9c81-f72e39626e45",
        name: "test",
        code: "",
        created_at: "2023-11-01T12:54:17.363581+00:00",
        updated_at: "2023-11-01T12:54:17.363581+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
    ],
  },
  {
    id: "bc5c172a-ac29-41ac-9072-7523d2b3135d",
    checksum: "2a91c742c28e2b1211bba09452c43264",
    created_at: "2023-10-31T18:22:17.721948+00:00",
    updated_at: "2023-10-31T18:22:17.721948+00:00",
    user: { display_name: "demo@mlcraft.io" },
    dataschemas: [
      {
        id: "f0e5e710-46ea-4c17-97f7-9773e30b98bc",
        name: "Suppliers.yml",
        code: "cubes:\n  - name: Suppliers\n    sql: SELECT * FROM public.suppliers\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: address\n        sql: address\n        type: string\n\n      - name: email\n        sql: email\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-10-31T18:22:17.721948+00:00",
        updated_at: "2023-10-31T18:22:17.721948+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "bccd3925-2077-46a6-97ed-f1e5462d235c",
        name: "Users.yml",
        code: "cubes:\n  - name: Users\n    sql: SELECT * FROM public.users\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: city\n        sql: city\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: gender\n        sql: gender\n        type: string\n\n      - name: firstName\n        sql: first_name\n        type: string\n\n      - name: lastName\n        sql: last_name\n        type: string\n\n      - name: state\n        sql: state\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-10-31T18:22:17.721948+00:00",
        updated_at: "2023-10-31T18:22:17.721948+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
    ],
  },
  {
    id: "c47b1380-8b1c-4b83-a8be-182c9dde9711",
    checksum: "2a91c742c28e2b1211bba09452c43264",
    created_at: "2023-10-31T17:43:34.37271+00:00",
    updated_at: "2023-10-31T17:43:34.37271+00:00",
    user: { display_name: "demo@mlcraft.io" },
    dataschemas: [
      {
        id: "ee24a348-2d41-485f-9a83-333723aa3e93",
        name: "Suppliers.yml",
        code: "cubes:\n  - name: Suppliers\n    sql: SELECT * FROM public.suppliers\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: address\n        sql: address\n        type: string\n\n      - name: email\n        sql: email\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-10-31T17:43:34.37271+00:00",
        updated_at: "2023-10-31T17:43:34.37271+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "361d4069-cbbf-4e84-a5f2-23fedd844765",
        name: "Users.yml",
        code: "cubes:\n  - name: Users\n    sql: SELECT * FROM public.users\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: city\n        sql: city\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: gender\n        sql: gender\n        type: string\n\n      - name: firstName\n        sql: first_name\n        type: string\n\n      - name: lastName\n        sql: last_name\n        type: string\n\n      - name: state\n        sql: state\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-10-31T17:43:34.37271+00:00",
        updated_at: "2023-10-31T17:43:34.37271+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "7d4d53e1-767a-4cb5-a68f-ebdb3e4d22e8",
        name: "orders1.yml",
        code: "",
        created_at: "2023-10-31T17:43:34.37271+00:00",
        updated_at: "2023-10-31T17:43:34.37271+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
    ],
  },
  {
    id: "da2b51b8-7810-4600-9386-b0ee100a8c9c",
    checksum: "e70fb808de5ee5bdb56d5216b084c282",
    created_at: "2023-10-31T17:40:18.035735+00:00",
    updated_at: "2023-10-31T17:40:18.035735+00:00",
    user: { display_name: "demo@mlcraft.io" },
    dataschemas: [
      {
        id: "157e05b4-7849-430d-a9ad-55b7e14b127e",
        name: "Products.yml",
        code: 'cubes:\n  - name: Products\n    sql: SELECT * FROM public.products\n    joins:\n      - name: Suppliers\n        sql: "{CUBE}.supplier_id = {Suppliers}.id"\n        relationship: belongsTo\n\n      - name: ProductCategories\n        sql: "{CUBE}.product_category_id = {ProductCategories}.id"\n        relationship: belongsTo\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: name\n        sql: name\n        type: string\n\n      - name: description\n        sql: description\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n',
        created_at: "2023-10-31T17:40:18.035735+00:00",
        updated_at: "2023-10-31T17:40:18.035735+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "c2d8ce84-27b9-47eb-b756-a36d65d83a67",
        name: "Suppliers.yml",
        code: "cubes:\n  - name: Suppliers\n    sql: SELECT * FROM public.suppliers\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: address\n        sql: address\n        type: string\n\n      - name: email\n        sql: email\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-10-31T17:40:18.035735+00:00",
        updated_at: "2023-10-31T17:40:18.035735+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "2c6212d6-9048-4e18-abb0-56b5b2341aff",
        name: "Users.yml",
        code: "cubes:\n  - name: Users\n    sql: SELECT * FROM public.users\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: city\n        sql: city\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: gender\n        sql: gender\n        type: string\n\n      - name: firstName\n        sql: first_name\n        type: string\n\n      - name: lastName\n        sql: last_name\n        type: string\n\n      - name: state\n        sql: state\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-10-31T17:40:18.035735+00:00",
        updated_at: "2023-10-31T17:40:18.035735+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "b075c4eb-1782-4a47-9033-973ba4ec3f84",
        name: "orders1.yml",
        code: "",
        created_at: "2023-10-31T17:40:18.035735+00:00",
        updated_at: "2023-10-31T17:40:18.035735+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
    ],
  },
  {
    id: "f5e51c3e-fde5-4a53-99fe-84cb92cfd1b1",
    checksum: "108182d329b78877bdba514b2413df3b",
    created_at: "2023-10-31T17:39:08.748609+00:00",
    updated_at: "2023-10-31T17:39:08.748609+00:00",
    user: { display_name: "demo@mlcraft.io" },
    dataschemas: [
      {
        id: "62a97709-3d09-4885-a4dd-cdbd2a71f2fd",
        name: "Orders.yml",
        code: 'cubes:\n  - name: Orders\n    sql: SELECT * FROM public.orders\n    joins:\n    \n      - name: Users\n        sql: "{CUBE}.user_id = {Users}.id"\n        relationship: belongsTo\n\n      - name: Products\n        sql: "{CUBE}.product_id = {Products}.id"\n        relationship: belongsTo\n\n    measures:\n      - name: count\n        type: count\n\n      - name: number\n        sql: number\n        type: sum\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: status\n        sql: status\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n      - name: completedAt\n        sql: completed_at\n        type: time\n\n',
        created_at: "2023-10-31T17:39:08.748609+00:00",
        updated_at: "2023-10-31T17:39:08.748609+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "3a79d270-33e8-4484-b5e9-1eea89f1f44c",
        name: "Products.yml",
        code: 'cubes:\n  - name: Products\n    sql: SELECT * FROM public.products\n    joins:\n      - name: Suppliers\n        sql: "{CUBE}.supplier_id = {Suppliers}.id"\n        relationship: belongsTo\n\n      - name: ProductCategories\n        sql: "{CUBE}.product_category_id = {ProductCategories}.id"\n        relationship: belongsTo\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: name\n        sql: name\n        type: string\n\n      - name: description\n        sql: description\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n',
        created_at: "2023-10-31T17:39:08.748609+00:00",
        updated_at: "2023-10-31T17:39:08.748609+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "f5288bd1-c2fb-4be1-9a3c-4b13e88a5c02",
        name: "Suppliers.yml",
        code: "cubes:\n  - name: Suppliers\n    sql: SELECT * FROM public.suppliers\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: address\n        sql: address\n        type: string\n\n      - name: email\n        sql: email\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-10-31T17:39:08.748609+00:00",
        updated_at: "2023-10-31T17:39:08.748609+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "e2ea2623-8c14-47ba-9ad6-107d9936c80e",
        name: "Users.yml",
        code: "cubes:\n  - name: Users\n    sql: SELECT * FROM public.users\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: city\n        sql: city\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: gender\n        sql: gender\n        type: string\n\n      - name: firstName\n        sql: first_name\n        type: string\n\n      - name: lastName\n        sql: last_name\n        type: string\n\n      - name: state\n        sql: state\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-10-31T17:39:08.748609+00:00",
        updated_at: "2023-10-31T17:39:08.748609+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "c127692b-0575-4382-91f6-4496fe014a01",
        name: "orders1.yml",
        code: "",
        created_at: "2023-10-31T17:39:08.748609+00:00",
        updated_at: "2023-10-31T17:39:08.748609+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
    ],
  },
  {
    id: "f82365eb-7448-4862-b189-69355cdb1893",
    checksum: "43bdc2b298161d2280baa63280792d31",
    created_at: "2023-10-25T12:12:19.532102+00:00",
    updated_at: "2023-10-25T12:12:19.532102+00:00",
    user: { display_name: "demo@mlcraft.io" },
    dataschemas: [
      {
        id: "3ea8181e-9b08-4c34-8db0-e7df3fcecfd1",
        name: "LineItems.yml",
        code: 'cubes:\n  - name: LineItems\n    sql: SELECT * FROM public.line_items\n    joins:\n      - name: Products\n        sql: "{CUBE}.product_id = {Products}.id"\n        relationship: belongsTo\n\n      - name: Orders\n        sql: "{CUBE}.order_id = {Orders}.id"\n        relationship: belongsTo\n\n    measures:\n      - name: count\n        type: count\n\n      - name: quantity\n        sql: quantity\n        type: sum\n\n      - name: price\n        sql: price\n        type: sum\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n',
        created_at: "2023-10-25T12:12:19.532102+00:00",
        updated_at: "2023-10-25T12:12:19.532102+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "9f209ba4-668f-4895-b083-38ba33c05139",
        name: "Orders.yml",
        code: 'cubes:\n  - name: Orders\n    sql: SELECT * FROM public.orders\n    joins:\n    \n      - name: Users\n        sql: "{CUBE}.user_id = {Users}.id"\n        relationship: belongsTo\n\n      - name: Products\n        sql: "{CUBE}.product_id = {Products}.id"\n        relationship: belongsTo\n\n    measures:\n      - name: count\n        type: count\n\n      - name: number\n        sql: number\n        type: sum\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: status\n        sql: status\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n      - name: completedAt\n        sql: completed_at\n        type: time\n\n',
        created_at: "2023-10-25T12:12:19.532102+00:00",
        updated_at: "2023-10-25T12:12:19.532102+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "9b793a7a-b876-4c17-94ac-f00b198e2a24",
        name: "Products.yml",
        code: 'cubes:\n  - name: Products\n    sql: SELECT * FROM public.products\n    joins:\n      - name: Suppliers\n        sql: "{CUBE}.supplier_id = {Suppliers}.id"\n        relationship: belongsTo\n\n      - name: ProductCategories\n        sql: "{CUBE}.product_category_id = {ProductCategories}.id"\n        relationship: belongsTo\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: name\n        sql: name\n        type: string\n\n      - name: description\n        sql: description\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n',
        created_at: "2023-10-25T12:12:19.532102+00:00",
        updated_at: "2023-10-25T12:12:19.532102+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "c6976a83-8172-4d0a-8ac1-c31d22c17c5c",
        name: "Suppliers.yml",
        code: "cubes:\n  - name: Suppliers\n    sql: SELECT * FROM public.suppliers\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: address\n        sql: address\n        type: string\n\n      - name: email\n        sql: email\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-10-25T12:12:19.532102+00:00",
        updated_at: "2023-10-25T12:12:19.532102+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "b430390b-3bd9-4c0b-a6c5-8108342a6fa4",
        name: "Users.yml",
        code: "cubes:\n  - name: Users\n    sql: SELECT * FROM public.users\n    joins: []\n\n    measures:\n      - name: count\n        type: count\n\n    dimensions:\n      - name: id\n        sql: id\n        type: number\n        primaryKey: true\n\n      - name: city\n        sql: city\n        type: string\n\n      - name: company\n        sql: company\n        type: string\n\n      - name: gender\n        sql: gender\n        type: string\n\n      - name: firstName\n        sql: first_name\n        type: string\n\n      - name: lastName\n        sql: last_name\n        type: string\n\n      - name: state\n        sql: state\n        type: string\n\n      - name: createdAt\n        sql: created_at\n        type: time\n\n",
        created_at: "2023-10-25T12:12:19.532102+00:00",
        updated_at: "2023-10-25T12:12:19.532102+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
      {
        id: "b0d89ba2-d8c9-45ce-930f-22f44e1a1abd",
        name: "orders1.yml",
        code: "",
        created_at: "2023-10-25T12:12:19.532102+00:00",
        updated_at: "2023-10-25T12:12:19.532102+00:00",
        datasource_id: "7d7eea55-ad47-4456-8a1b-badef7cf7270",
      },
    ],
  },
];
