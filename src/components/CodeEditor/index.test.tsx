import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { dataschemasMock } from "@/mocks/dataschemas";

import CodeEditor from "./";

describe("CodeEditor", () => {
  test("renders CodeEditor component", () => {
    render(
      <CodeEditor
        data-testid="code-editor"
        schemas={dataschemasMock}
        onTabChange={vi.fn()}
        onClose={vi.fn()}
        onRunSQL={vi.fn()}
        onCodeSave={vi.fn()}
        validationError={""}
        active={"sqlrunner"}
      />
    );
    const codeEditorElement = screen.getByTestId("code-editor");
    expect(codeEditorElement).toBeInTheDocument();
  });

  test("calls onTabChange when a tab is clicked", () => {
    const mockOnTabChange = vi.fn();
    render(
      <CodeEditor
        schemas={dataschemasMock}
        onClose={vi.fn()}
        onRunSQL={vi.fn()}
        onCodeSave={vi.fn()}
        onTabChange={mockOnTabChange}
        validationError={""}
      />
    );
    const tabButton = screen.getByText(dataschemasMock[0].name);
    fireEvent.click(tabButton);
    expect(mockOnTabChange).toHaveBeenCalled();
  });

  test("calls onClose when the close icon is clicked", () => {
    const mockOnClose = vi.fn();
    render(
      <CodeEditor
        schemas={dataschemasMock}
        onTabChange={vi.fn()}
        onRunSQL={vi.fn()}
        onCodeSave={vi.fn()}
        onClose={mockOnClose}
        validationError={""}
      />
    );
    const closeIcon = screen.getAllByTestId("close-icon")[0];
    fireEvent.click(closeIcon);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
