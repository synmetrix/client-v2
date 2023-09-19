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
                    path: "/settings/sql-api",
                    component: "./pages/SqlApi",
                  },
                  {
                    path: "/settings/access",
                    component: "./pages/RolesAndAccess",
                  },
                  {
                    path: "/settings/info",
                    component: "./pages/PersonalInfo",
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
