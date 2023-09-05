import { Roles } from "@/types/team";

export const teams = [
  {
    id: "1",
    name: "Developers",
    role: Roles.owner,
    members: [
      {
        id: "1",
        displayName: "User Name",
        email: "useremail@mail.com",
        role: {
          id: "10",
          name: Roles.owner,
        },
      },
      {
        id: "2",
        displayName: "User Name",
        email: "useremail@mail.com",
        role: {
          id: "10",
          name: Roles.admin,
        },
      },
      {
        id: "3",
        displayName: "User Name",
        email: "useremail@mail.com",
        role: {
          id: "10",
          name: Roles.member,
        },
      },
      {
        id: "4",
        displayName: "User Name",
        email: "useremail@mail.com",
        role: {
          id: "10",
          name: Roles.member,
        },
      },
      {
        id: "5",
        displayName: "User Name",
        email: "useremail@mail.com",
        role: {
          id: "10",
          name: Roles.member,
        },
      },
      {
        id: "6",
        displayName: "User Name",
        email: "useremail@mail.com",
        role: {
          id: "10",
          name: Roles.member,
        },
      },
    ],
    createdAt: "10/10/2023 8:30PM",
    updatedAt: "10/10/2023 8:30PM",
  },
  {
    id: "2",
    name: "AI Science Team",
    role: Roles.owner,
    members: [
      {
        id: "1",
        displayName: "User Name",
        email: "useremail@mail.com",
        role: {
          id: "10",
          name: Roles.owner,
        },
      },
      {
        id: "2",
        displayName: "User Name",
        email: "useremail@mail.com",
        role: {
          id: "11",
          name: Roles.admin,
        },
      },
      {
        id: "3",
        displayName: "User Name",
        email: "useremail@mail.com",
        role: {
          id: "12",
          name: Roles.member,
        },
      },
    ],
    createdAt: "10/10/2023 8:30PM",
    updatedAt: "10/10/2023 8:30PM",
  },
];
