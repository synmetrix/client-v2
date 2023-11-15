import RootLayout from "@/layouts/RootLayout";
import { queryStateMock } from "@/mocks/queryState";
import { eventsMock } from "@/mocks/events";

import QueryDetails from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Logs/QueryDetails",
  component: QueryDetails,
} as Meta<typeof QueryDetails>;

const Template: StoryFn<typeof QueryDetails> = (args) => (
  <RootLayout>
    <QueryDetails {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  query: queryStateMock,
  SQLString:
    "SELECT toDateTime(toStartOfMinute(toTimeZone(toDateTime(`github_events`.updated_at), 'UTC'), 'UTC'), 'UTC') `github_events__updated_at_minute`, count(*) `github_events__count` FROM default.github_events AS `github_events` WHERE (`github_events`.updated_at > parseDateTimeBestEffort(?)) GROUP BY `github_events__updated_at_minute` ORDER BY `github_e",
  events: eventsMock,
};
