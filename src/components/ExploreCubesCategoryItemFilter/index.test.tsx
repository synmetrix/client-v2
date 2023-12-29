import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import CategoryItemFilter from "./";

describe("CategoryItemFilter", () => {
  const mockOnFilterUpdate = {
    add: vi.fn(),
    remove: vi.fn(),
  };

  const mockMember: any = {
    dimension: "mock-dimension",
  };

  const mockSelectedFilterIndex = 0;

  test("renders the component correctly", () => {
    render(
      <CategoryItemFilter
        isVisible={true}
        onFilterUpdate={mockOnFilterUpdate}
        member={mockMember}
        selectedFilterIndex={mockSelectedFilterIndex}
      />
    );

    expect(screen.getByTestId("remove-filter-button")).toBeInTheDocument();
  });

  test("calls onFilterUpdate.add when the add filter button is clicked", () => {
    render(
      <CategoryItemFilter
        isVisible={true}
        onFilterUpdate={mockOnFilterUpdate}
        member={mockMember}
        selectedFilterIndex={1}
      />
    );

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    expect(mockOnFilterUpdate.add).toHaveBeenCalled();
  });

  test("calls onFilterUpdate.add and onFilterUpdate.remove when the toggle filter button is clicked", () => {
    render(
      <CategoryItemFilter
        isVisible={true}
        onFilterUpdate={mockOnFilterUpdate}
        member={mockMember}
        selectedFilterIndex={mockSelectedFilterIndex}
      />
    );

    const toggleButton = screen.getByTestId("remove-filter-button");
    fireEvent.click(toggleButton);

    expect(mockOnFilterUpdate.remove).toHaveBeenCalled();
  });

  test("does not render the component when isVisible is false", () => {
    render(
      <CategoryItemFilter
        isVisible={false}
        onFilterUpdate={mockOnFilterUpdate}
        member={mockMember}
        selectedFilterIndex={mockSelectedFilterIndex}
      />
    );

    expect(
      screen.queryByTestId("remove-filter-button")
    ).not.toBeInTheDocument();
  });
});
