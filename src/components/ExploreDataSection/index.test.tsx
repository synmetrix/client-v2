import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { dataSectionProps } from "@/mocks/explore";

import ExploreDataSection from "./";

describe("ExploreDataSection", () => {
  test("renders without error", () => {
    render(
      <ExploreDataSection
        {...dataSectionProps}
        key={"test"}
        onToggleSection={() => {}}
        onSectionChange={() => {}}
        onOpenModal={() => {}}
        onExec={undefined}
        onQueryChange={() => {}}
        disabled={false}
        isActive={false}
      />
    );
    expect(screen.getByTestId("explore-data-section")).toBeInTheDocument();
  });

  test("displays the correct section header", () => {
    render(
      <ExploreDataSection
        {...dataSectionProps}
        key={"test"}
        onToggleSection={() => {}}
        onSectionChange={() => {}}
        onOpenModal={() => {}}
        onExec={undefined}
        onQueryChange={() => {}}
        disabled={false}
        isActive={false}
      />
    );
    expect(screen.getByText("data_section.results")).toBeInTheDocument();
  });
});
