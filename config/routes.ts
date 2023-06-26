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
                path: "/signup",
                component: "./pages/SignUp",
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
