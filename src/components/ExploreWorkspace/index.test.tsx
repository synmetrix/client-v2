import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { dbMock } from "@/mocks/db";

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
        source={dbMock[0]}
      />
    );
    expect(screen.getByText(dbMock[0].name)).toBeInTheDocument();
  });
});
