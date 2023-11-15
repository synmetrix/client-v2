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
        path: "/settings",
        component: "./layouts/SettingsLayout",
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
            path: "/explore/:dataSourceId?/:explorationId?/:modalType?/:delivery?",
            component: "./pages/Explore",
          },
          {
            path: "/teams",
            component: "./pages/Teams",
          },
          {
            path: "/alerts/:alertId?",
            component: "./pages/Alerts",
          },
          {
            path: "/reports/:reportId?",
            component: "./pages/Reports",
          },
          {
            path: "/logs/query",
            component: "./pages/QueryLogs",
          },
          {
            path: "/logs/query/:id",
            component: "./pages/QueryDetailed",
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
