import RootLayout from "@/layouts/RootLayout";

import WebhookIcon from "@/assets/webhook.svg";
import SlackIcon from "@/assets/slack.svg";
import MailIcon from "@/assets/mail.svg";

import AlertTypeSelection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Alert/AlertTypeSelection",
  component: AlertTypeSelection,
} as Meta<typeof AlertTypeSelection>;

const Template: StoryFn<typeof AlertTypeSelection> = (args) => (
  <RootLayout>
    <AlertTypeSelection {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  options: [
    { name: "Webhook", icon: <WebhookIcon />, value: "webhook" },
    { name: "Slack", icon: <SlackIcon />, value: "slack" },
    { name: "Mail", icon: <MailIcon />, value: "mail" },
  ],
  onSubmit: console.log,
};
