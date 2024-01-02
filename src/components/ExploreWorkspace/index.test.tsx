import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { dataSourcesMock } from "@/mocks/dataSources";

import ExploreWorkspace from "./";

describe("ExploreWorkspace", () => {
  test("renders without error", () => {
    render(
      <ExploreWorkspace
        loading={false}
        meta={{}}
        runQuery={() => {}}
        onOpenModal={() => {}}
        source={dataSourcesMock[0]}
      />
    );
    expect(screen.getByText(dataSourcesMock[0].name)).toBeInTheDocument();
  });
});
