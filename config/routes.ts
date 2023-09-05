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
                path: "/teams",
                component: "./pages/Teams",
              },
              {
                path: "/settings",
                routes: [
                  {
                    path: "/settings/sources",
                    component: "./pages/DataSources",
                  },
                  {
                    path: "/settings/members",
                    component: "./pages/Members",
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
    ],
  },
  {
    component: "./pages/404",
  },
];
