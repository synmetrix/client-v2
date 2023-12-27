import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import SearchInput from "./index";

describe("SearchInput Component", () => {
  test("renders the SearchInput component", () => {
    render(
      <SearchInput
        value=""
        onChange={() => {}}
        placeholder="Enter search query"
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter search query");
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onChange when input value changes", () => {
    const mockOnChange = vi.fn();
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder="Enter search query"
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter search query");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(mockOnChange).toHaveBeenCalledWith("test");
  });
});
