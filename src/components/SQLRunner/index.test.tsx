import React from "react";
import { ResizableBox } from "react-resizable";
import { render, fireEvent, screen } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";

import SQLRunner from "./";

vi.mock("react-resizable", () => ({
  ResizableBox: vi.fn(({ children }) => <div>{children}</div>),
}));

vi.mock("@monaco-editor/react", () => ({
  Editor: vi.fn(({ onChange }) => (
    <textarea
      data-testid="monaco-editor"
      onChange={(e) => onChange(e.target.value)}
    />
  )),
}));

describe("SQLRunner", () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    sqlError: {},
    value: "SELECT * FROM table;",
    onChange: mockOnChange,
    showData: false,
    data: [],
  };

  test("renders without crashing", () => {
    render(<SQLRunner {...defaultProps} />);
    expect(screen.getByTestId("monaco-editor")).toBeInTheDocument();
  });

  test("calls onChange when editor content changes", () => {
    const { getByTestId } = render(<SQLRunner {...defaultProps} />);
    fireEvent.change(getByTestId("monaco-editor"), {
      target: { value: "SELECT id FROM table;" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("SELECT id FROM table;");
  });

  test("renders an error alert if sqlError has keys", () => {
    const errorProps = {
      ...defaultProps,
      sqlError: { toString: () => "Syntax error", message: "Syntax error" },
    };
    render(<SQLRunner {...errorProps} />);
    expect(screen.getByRole("error")).toHaveTextContent("Syntax error");
  });

  test("doesn't render an error alert if sqlError is empty", () => {
    render(<SQLRunner {...defaultProps} />);
    expect(screen.queryByRole("error")).toBeNull();
  });

  test("renders a resizable box", () => {
    render(<SQLRunner {...defaultProps} />);
    expect(ResizableBox).toHaveBeenCalled();
  });

  test("renders VirtualTable when showData is true", () => {
    const props = {
      ...defaultProps,
      showData: true,
      data: [{ id: 1, name: "john" }],
    };
    render(<SQLRunner {...props} />);
    expect(screen.getByText("john")).toBeInTheDocument();
  });

  test("does not render VirtualTable when showData is false", () => {
    render(<SQLRunner {...defaultProps} />);
    expect(screen.queryByText("VirtualTable")).toBeNull();
  });
});
