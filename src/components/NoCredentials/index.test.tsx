import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import NoCredentials from ".";

describe("NoCredentials", () => {
  test("renders the component correctly", () => {
    render(<NoCredentials onCreate={() => {}} />);
  });

  test("displays the correct title", () => {
    render(<NoCredentials onCreate={() => {}} />);
    const titleElement = screen.getByText("credentials.not_found.title");
    expect(titleElement).toBeInTheDocument();
  });

  test("displays the correct text", () => {
    render(<NoCredentials onCreate={() => {}} />);
    const textElement = screen.getByText("credentials.not_found.text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders the create button", () => {
    render(<NoCredentials onCreate={() => {}} />);
    const createButton = screen.getByText("credentials.not_found.create_btn");
    expect(createButton).toBeInTheDocument();
  });

  test("calls the onCreate function when create button is clicked", () => {
    const mockOnAttach = vi.fn();
    render(<NoCredentials onCreate={mockOnAttach} />);
    const createButton = screen.getByText("credentials.not_found.create_btn");
    createButton.click();
    expect(mockOnAttach).toHaveBeenCalled();
  });
});
