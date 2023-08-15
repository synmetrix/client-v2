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
                path: "/signin",
                component: "./pages/SignIn",
              },
              {
                path: "/datasources",
                component: "./pages/DataSources",
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
