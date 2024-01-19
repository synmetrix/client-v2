import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import NoCredentials from "./";

describe("NoCredentials", () => {
  test("renders the component correctly", () => {
    render(<NoCredentials onAttach={() => {}} />);
  });

  test("displays the correct title", () => {
    render(<NoCredentials onAttach={() => {}} />);
    const titleElement = screen.getByText("sql_api.not_found.title");
    expect(titleElement).toBeInTheDocument();
  });

  test("displays the correct text", () => {
    render(<NoCredentials onAttach={() => {}} />);
    const textElement = screen.getByText("sql_api.not_found.text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders the attach button when edit permission is true", () => {
    render(<NoCredentials onAttach={() => {}} editPermission />);
    const attachButton = screen.getByText("sql_api.not_found.attach_btn");
    expect(attachButton).toBeInTheDocument();
  });

  test("calls the onAttach function when attach button is clicked", () => {
    const mockOnAttach = vi.fn();
    render(<NoCredentials editPermission={true} onAttach={mockOnAttach} />);
    const attachButton = screen.getByText("sql_api.not_found.attach_btn");
    attachButton.click();
    expect(mockOnAttach).toHaveBeenCalled();
  });
});
