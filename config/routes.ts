export default [
  {
    path: "/",
    component: "./layouts/RootLayout",
    routes: [
      {
        path: "/",
        routes: [
          {
            path: "/",
            component: "./layouts/BasicLayout",
            routes: [
              {
                path: "/",
                component: "./pages/Welcome",
              },
              {
                path: "/chats/:id",
                component: "./pages/ChatDialog",
              },
              {
                component: "./pages/404",
              },
            ],
          },
          {
            component: "./pages/404",
          },
        ],
      },
      {
        component: "./pages/404",
      },
    ],
  },
  {
    component: "./pages/404",
  },
];
