import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi, test, describe } from "vitest";

import PopoverButton from "./";

describe("PopoverButton Component", () => {
  test("renders the PopoverButton component", () => {
    render(<PopoverButton actionText={"action"} />);
    const popoverButtonElement = screen.getByText("action");
    expect(popoverButtonElement).toBeDefined();
  });

  test("calls onClick when the button is clicked", () => {
    const mockOnClick = vi.fn();
    render(<PopoverButton actionText={"action"} onClick={mockOnClick} />);
    const buttonElement = screen.getByText("action");
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("calls onVisibleChange when the popover is opened or closed", () => {
    const mockOnVisibleChange = vi.fn();
    render(
      <PopoverButton
        actionText={"action"}
        trigger={"click"}
        popoverType="popconfirm"
        onVisibleChange={mockOnVisibleChange}
      />
    );
    const buttonElement = screen.getByText("action");
    fireEvent.click(buttonElement);
    expect(mockOnVisibleChange).toHaveBeenCalledWith(true);
    fireEvent.click(buttonElement);
    expect(mockOnVisibleChange).toHaveBeenCalledWith(false);
  });

  test("renders the icon inside the button", () => {
    const icon = <span data-testid="popover-icon" className="icon" />;
    render(<PopoverButton icon={icon} />);
    const iconElement = screen.getByTestId("popover-icon");
    expect(iconElement).toBeInTheDocument();
  });
});
