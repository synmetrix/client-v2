import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { availableQueryMembers, selectedQueryMembers } from "@/mocks/explore";

import ExploreDataFilters from "./";

describe("ExploreDataFilters", () => {
  const onMemberChange = {
    update: vi.fn(),
    remove: vi.fn(),
  };

  test("renders empty state when filters are empty", () => {
    render(
      <ExploreDataFilters
        availableQueryMembers={availableQueryMembers}
        selectedQueryMembers={{ filters: [] }}
        onMemberChange={onMemberChange}
      />
    );

    expect(screen.getByTestId("empty")).toBeInTheDocument();
  });

  test("renders FilterGroup when filters are not empty", () => {
    render(
      <ExploreDataFilters
        availableQueryMembers={availableQueryMembers}
        selectedQueryMembers={selectedQueryMembers}
        onMemberChange={onMemberChange}
      />
    );

    expect(screen.getByTestId("filter-group")).toBeInTheDocument();
  });
});
