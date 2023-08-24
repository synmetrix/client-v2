import RootLayout from "@/layouts/RootLayout";
import { eventsMock } from "@/mocks/events";

import EventsTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Logs/EventsTable",
  component: EventsTable,
} as Meta<typeof EventsTable>;

const Template: StoryFn<typeof EventsTable> = (args) => (
  <RootLayout>
    <EventsTable {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  events: eventsMock,
};
