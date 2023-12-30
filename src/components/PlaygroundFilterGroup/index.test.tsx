import { describe, beforeEach, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import FilterGroup from "./";

describe("FilterGroup", () => {
  const members: any = [
    {
      index: 1,
      dimension: { title: "Dimension 1" },
      operator: "equal",
      operators: [],
    },
    {
      index: 2,
      dimension: { title: "Dimension 2" },
      operator: "notEqual",
      operators: [],
    },
  ];
  const availableMembers: any = [
    {
      index: 1,
      dimension: { title: "Dimension 1" },
      operator: "equal",
      operators: [],
    },
    {
      index: 2,
      dimension: { title: "Dimension 2" },
      operator: "notEqual",
      operators: [],
    },
  ];
  const addMemberName = "Member 1";
  const updateMethods = {
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(() => {
    render(
      <FilterGroup
        members={members}
        availableMembers={availableMembers}
        addMemberName={addMemberName}
        updateMethods={updateMethods}
      />
    );
  });

  test("renders the filter group correctly", () => {
    expect(screen.getByTestId("filter-group")).toBeInTheDocument();
  });

  test("renders the correct number of filter members", () => {
    const filterMembers = screen.getAllByTestId("filter-remove-button");
    expect(filterMembers.length).toBe(members.length);
  });
});
