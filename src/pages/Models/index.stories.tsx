import { MemoryRouter } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";
import { versions } from "@/mocks/versions";
import { branchesMock } from "@/mocks/branches";
import { dataschemasMock } from "@/mocks/dataschemas";
import { sqlMock } from "@/mocks/sqlResult";
import { dataSourcesMock } from "@/mocks/dataSources";

import { Models } from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Models",
  component: Models,
} as Meta<typeof Models>;

const Template: StoryFn<typeof Models> = (args) => {
  const [sql, setSql] = useState<any[]>([]);
  return (
    <MemoryRouter>
      <RootLayout>
        <Models {...args} onRunSQL={() => setSql(sqlMock)} data={sql} />
      </RootLayout>
    </MemoryRouter>
  );
};

export const Default = Template.bind({});

Default.args = {
  versions,
  branches: branchesMock,
  currentBranch: branchesMock[0],
  currentVersion: versions[0],
  dataSources: dataSourcesMock,
  dataSource: dataSourcesMock[0],
  dataschemas: dataschemasMock,
  fetching: false,
};
