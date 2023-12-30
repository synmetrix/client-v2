import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import CategoryItemFilter from "../ExploreCubesCategoryItemFilter";

describe("CategoryItemFilter", () => {
  const mockFilterUpdate = {
    add: vi.fn(),
    remove: vi.fn(),
  };

  const mockMember: any = {
    dimension: "mock-dimension",
  };

  test("should render correctly when isVisible is false", () => {
    const { container } = render(
      <CategoryItemFilter
        isVisible={false}
        selectedFilterIndex={-1}
        onFilterUpdate={mockFilterUpdate}
        member={mockMember}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  test("should render correctly when isVisible is true and selectedFilterIndex is -1", () => {
    const { getByTestId } = render(
      <CategoryItemFilter
        isVisible={true}
        selectedFilterIndex={-1}
        onFilterUpdate={mockFilterUpdate}
        member={mockMember}
      />
    );

    const removeFilterButton = getByTestId("remove-filter-button");
    fireEvent.click(removeFilterButton);

    expect(mockFilterUpdate.remove).toHaveBeenCalled();
  });

  test("should render correctly when isVisible is true and selectedFilterIndex is greater than -1", () => {
    const { getByText } = render(
      <CategoryItemFilter
        isVisible={true}
        selectedFilterIndex={0}
        onFilterUpdate={mockFilterUpdate}
        member={mockMember}
      />
    );

    const addButton = getByText("+");
    fireEvent.click(addButton);

    expect(mockFilterUpdate.add).toHaveBeenCalled();
  });
});
