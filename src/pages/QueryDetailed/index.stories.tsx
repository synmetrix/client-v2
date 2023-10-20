import RootLayout from "@/layouts/RootLayout";
import { request } from "@/mocks/request";
import { queryPreviewMock } from "@/mocks/queryPreview";
import { eventsMock } from "@/mocks/events";

import { QueryDetailed } from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Logs/QueryDetailed",
  component: QueryDetailed,
} as Meta<typeof QueryDetailed>;

const Template: StoryFn<typeof QueryDetailed> = (args) => (
  <RootLayout>
    <QueryDetailed {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  request,
  queryKey: "key",
  query: queryPreviewMock,
  SQLString:
    "SELECT toDateTime(toStartOfMinute(toTimeZone(toDateTime(`github_events`.updated_at), 'UTC'), 'UTC'), 'UTC') `github_events__updated_at_minute`, count(*) `github_events__count` FROM default.github_events AS `github_events` WHERE (`github_events`.updated_at > parseDateTimeBestEffort(?)) GROUP BY `github_events__updated_at_minute` ORDER BY `github_e",
  events: eventsMock,
};
