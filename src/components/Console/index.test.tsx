import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Console from "./";

describe("Console component", () => {
  test("renders errors correctly", () => {
    const errors = "Some error message";
    render(<Console errors={errors} onClose={() => {}} />);
    const errorText = screen.getByText(errors);
    expect(errorText).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<Console errors="" onClose={onClose} />);
    const closeButton = screen.getByTestId("close-console");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
