import * as paths from "../src/utils/constants/paths";

export default [
  {
    path: paths.HOME,
    component: "./layouts/RootLayout",
    routes: [
      {
        path: paths.CALLBACK,
        component: "./pages/Callback",
      },
      {
        path: paths.AUTH,
        routes: [
          {
            path: paths.SIGNIN,
            component: "./pages/SignIn",
          },
          {
            path: paths.LOGOUT,
            component: "./pages/Logout",
          },
          {
            redirect: paths.SIGNIN,
          },
        ],
      },
      {
        path: paths.HOME,
        component: "./components/UserDataWrapper",
        routes: [
          {
            path: `${paths.MODELS}/:dataSourceId?/:branch?/:slug?`,
            component: "./pages/Models",
          },
          {
            path: `${paths.EXPORT}/:dataSourceId`,
            component: "./pages/ExportModels",
          },
          {
            path: `${paths.DOCS}/:versionId`,
            component: "./pages/Docs",
          },
          {
            path: paths.SIGNALS,
            component: "./layouts/SettingsLayout",
            routes: [
              {
                path: `${paths.ALERTS}/:alertId?`,
                component: "./pages/Alerts",
              },
              {
                path: `${paths.REPORTS}/:reportId?`,
                component: "./pages/Reports",
              },
            ],
          },
          {
            path: paths.SETTINGS,
            component: "./layouts/SettingsLayout",
            routes: [
              {
                path: paths.HOME,
                component: "./pages/Home",
              },
              {
                path: paths.MODELS,
                component: "./pages/Models",
              },
              {
                path: `${paths.TEAMS}/:editId?`,
                component: "./pages/Teams",
              },
              {
                path: `${paths.SOURCES}/:editId?/:generate?`,
                component: "./pages/DataSources",
              },
              {
                path: `${paths.MEMBERS}/:slug?`,
                component: "./pages/Members",
              },
              {
                path: `${paths.SQL_API}/:editId?`,
                component: "./pages/SqlApi",
              },
              {
                path: `${paths.ROLES}/:editId?`,
                component: "./pages/RolesAndAccess",
              },
              {
                path: paths.INFO,
                component: "./pages/PersonalInfo",
              },
            ],
          },
          {
            path: paths.HOME,
            routes: [
              {
                path: paths.HOME,
                component: "./pages/Home",
              },
              {
                path: `${paths.ONBOARDING}/:step?`,
                component: "./pages/Onboarding",
              },
              {
                path: `${paths.EXPLORE}/:dataSourceId?/:explorationId?/:modalType?/:delivery?`,
                component: "./pages/Explore",
              },
              {
                path: paths.QUERY_LOGS,
                component: "./pages/QueryLogs",
              },
              {
                path: `${paths.QUERY_LOGS}/:id`,
                component: "./pages/QueryDetailed",
              },
              {
                component: "./pages/404",
              },
            ],
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
