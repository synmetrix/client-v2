import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import CategoryItem from "./index";

describe("CategoryItem", () => {
  const mockMember = {
    name: "Test Member",
    shortTitle: "Test",
    type: "test",
  };

  const mockProps: any = {
    member: mockMember,
    category: "Test Category",
    selectedIndex: -1,
    selectedFilterIndex: -1,
    onFilterUpdate: {
      add: vi.fn(),
      remove: vi.fn(),
    },
    onAction: vi.fn(),
    hoverState: false,
  };

  test("renders the member name", () => {
    render(<CategoryItem {...mockProps} />);
    const memberName = screen.getByText(mockMember.shortTitle);
    expect(memberName).toBeInTheDocument();
  });

  test("calls onAction with 'click' when clicked", () => {
    render(<CategoryItem {...mockProps} />);
    const categoryItem = screen.getByText(mockMember.shortTitle);
    fireEvent.click(categoryItem);
    expect(mockProps.onAction).toHaveBeenCalledWith("click", mockMember);
  });
});
