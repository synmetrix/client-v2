export default [
  {
    path: "/",
    component: "./layouts/RootLayout",
    routes: [
      {
        path: "/auth",
        routes: [
          {
            path: "/auth/signup",
            component: "./pages/SignUp",
          },
          {
            path: "/auth/signin",
            component: "./pages/SignIn",
          },
        ],
      },
      {
        path: "/",
        routes: [
          {
            path: "/",
            component: "./pages/Home",
          },
          {
            path: "/models",
            component: "./pages/Models",
          },
          {
            path: "/teams",
            component: "./pages/Teams",
          },
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
];
