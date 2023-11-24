import i18n from "i18next.config";

export const user = {
  displayName: "Full Name",
  teams: [
    {
      label: "team1",
      href: "",
    },
  ],
};

export const userMenu = [
  {
    label: i18n.t("common:words.personal_info"),
    href: "/settings/info",
  },
  {
    label: i18n.t("common:words.logout"),
    href: "/auth/logout",
  },
];
