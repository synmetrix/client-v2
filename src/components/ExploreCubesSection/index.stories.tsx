import RootLayout from "@/layouts/RootLayout";

import ExploreCubesSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreCubesSection",
  component: ExploreCubesSection,
} as Meta<typeof ExploreCubesSection>;

const Template: StoryFn<typeof ExploreCubesSection> = (args) => (
  <RootLayout>
    <ExploreCubesSection {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  selectedMembers: {
    measures: [],
    dimensions: [
      {
        index: 0,
        isVisible: true,
        name: "Airports.airportid",
        shortTitle: "Airportid",
        suggestFilterValues: true,
        title: "Airports Airportid",
        type: "string",
      },
      {
        index: 1,
        isVisible: true,
        name: "Airports.name",
        shortTitle: "Name",
        suggestFilterValues: true,
        title: "Airports Name",
        type: "string",
      },
      {
        index: 2,
        isVisible: true,
        name: "Airports.city",
        shortTitle: "City",
        suggestFilterValues: true,
        title: "Airports City",
        type: "string",
      },
    ],
    segments: [],
    timeDimensions: [],
    filters: [],
  },
  members: {
    dimensions: {
      "Airports.airportid": {
        isVisible: true,
        name: "Airports.airportid",
        shortTitle: "Airportid",
        suggestFilterValues: true,
        title: "Airports Airportid",
        type: "string",
      },
      "Airports.name": {
        isVisible: true,
        name: "Airports.name",
        shortTitle: "Name",
        suggestFilterValues: true,
        title: "Airports Name",
        type: "string",
      },
      "Airports.city": {
        isVisible: true,
        name: "Airports.city",
        shortTitle: "City",
        suggestFilterValues: true,
        title: "Airports City",
        type: "string",
      },
      "Airports.country": {
        isVisible: true,
        name: "Airports.country",
        shortTitle: "Country",
        suggestFilterValues: true,
        title: "Airports Country",
        type: "string",
      },
      "Airports.iata": {
        isVisible: true,
        name: "Airports.iata",
        shortTitle: "Iata",
        suggestFilterValues: true,
        title: "Airports Iata",
        type: "string",
      },
      "Airports.icao": {
        isVisible: true,
        name: "Airports.icao",
        shortTitle: "Icao",
        suggestFilterValues: true,
        title: "Airports Icao",
        type: "string",
      },
      "Airports.latitude": {
        isVisible: true,
        name: "Airports.latitude",
        shortTitle: "Latitude",
        suggestFilterValues: true,
        title: "Airports Latitude",
        type: "string",
      },
      "Airports.longitude": {
        isVisible: true,
        name: "Airports.longitude",
        shortTitle: "Longitude",
        suggestFilterValues: true,
        title: "Airports Longitude",
        type: "string",
      },
      "Airports.timezone": {
        isVisible: true,
        name: "Airports.timezone",
        shortTitle: "Timezone",
        suggestFilterValues: true,
        title: "Airports Timezone",
        type: "string",
      },
      "Airports.dst": {
        isVisible: true,
        name: "Airports.dst",
        shortTitle: "Dst",
        suggestFilterValues: true,
        title: "Airports Dst",
        type: "string",
      },
      "Airports.tz": {
        isVisible: true,
        name: "Airports.tz",
        shortTitle: "Tz",
        suggestFilterValues: true,
        title: "Airports Tz",
        type: "string",
      },
      "Airports.type": {
        isVisible: true,
        name: "Airports.type",
        shortTitle: "Type",
        suggestFilterValues: true,
        title: "Airports Type",
        type: "string",
      },
      "Airports.source": {
        isVisible: true,
        name: "Airports.source",
        shortTitle: "Source",
        suggestFilterValues: true,
        title: "Airports Source",
        type: "string",
      },
    },
    measures: {
      "Airports.count": {
        aggType: "count",
        cumulative: false,
        cumulativeTotal: false,
        drillMembers: [],
        drillMembersGrouped: { dimensions: [], measures: [] },
        isVisible: true,
        name: "Airports.count",
        shortTitle: "Count",
        title: "Airports Count",
        type: "number",
      },
    },
    segments: {},
  },
};
