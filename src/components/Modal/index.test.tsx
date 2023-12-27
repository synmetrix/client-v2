import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Modal from "./";

describe("Modal", () => {
  test("renders children correctly", () => {
    render(
      <Modal onClose={vi.fn()} open>
        <div>Modal Content</div>
      </Modal>
    );

    const modelContent = screen.getByText("Modal Content");

    expect(modelContent).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<Modal onClose={onClose} closable open />);

    const closeButton = screen.getByTestId("modal-close-button");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
