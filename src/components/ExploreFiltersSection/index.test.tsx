import { describe, beforeEach, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { availableQueryMembers, dataSectionProps } from "@/mocks/explore";

import ExploreFiltersSection from "./";

describe("ExploreFiltersSection", () => {
  const mockToggleSection = vi.fn();
  const mockMemberChange = vi.fn();
  const mockSelectedQueryMembers = {};
  const mockState = dataSectionProps.state;
  const mockIsActive = true;

  beforeEach(() => {
    render(
      <ExploreFiltersSection
        onToggleSection={mockToggleSection}
        onMemberChange={mockMemberChange}
        availableQueryMembers={availableQueryMembers}
        selectedQueryMembers={mockSelectedQueryMembers}
        state={mockState}
        isActive={mockIsActive}
        key={"test"}
      />
    );
  });

  test("should render the collapse panel with the correct header", () => {
    const headerText = screen.getByText("Filters");
    expect(headerText).toBeInTheDocument();
  });

  test("should call onToggleSection when the filters button is clicked", () => {
    const filtersButton = screen.getByText("Filters");
    fireEvent.click(filtersButton);
    expect(mockToggleSection).toHaveBeenCalledWith("filtersSec");
  });
});
