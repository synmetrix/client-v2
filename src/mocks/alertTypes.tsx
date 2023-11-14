import type { Tile } from "@/types/formTile";

import WebhookIcon from "@/assets/webhook.svg";
import SlackIcon from "@/assets/slack.svg";
import MailIcon from "@/assets/mail.svg";

export const alertTypes: Tile[] = [
  { name: "Webhook", icon: <WebhookIcon />, value: "WEBHOOK" },
  { name: "Slack", icon: <SlackIcon />, value: "SLACK" },
  { name: "Mail", icon: <MailIcon />, value: "EMAIL" },
];
