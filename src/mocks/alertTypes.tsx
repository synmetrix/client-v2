import type { Tile } from "@/types/formTile";

import WebhookIcon from "@/assets/webhook.svg";
import SlackIcon from "@/assets/slack.svg";
import MailIcon from "@/assets/mail.svg";

export const alertTypes: Tile[] = [
  { name: "Webhook", icon: <WebhookIcon />, value: "webhook" },
  { name: "Slack", icon: <SlackIcon />, value: "slack" },
  { name: "Mail", icon: <MailIcon />, value: "email" },
];
