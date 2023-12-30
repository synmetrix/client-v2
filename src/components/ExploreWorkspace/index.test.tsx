import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { dataSourcesMock } from "@/mocks/dataSources";

import ExploreWorkspace from "./";

vi.mock("@vitjs/runtime", () => ({
  __esModule: true,
}));

describe("ExploreWorkspace", () => {
  test("renders without error", () => {
    render(
      <ExploreWorkspace
        loading={false}
        meta={[]}
        dataSet={[]}
        params={{
          screenshotMode: false,
        }}
        runQuery={() => {}}
        onOpenModal={() => {}}
        source={dataSourcesMock[0]}
      />
    );
    expect(screen.getByText(dataSourcesMock[0].name)).toBeInTheDocument();
  });
});
