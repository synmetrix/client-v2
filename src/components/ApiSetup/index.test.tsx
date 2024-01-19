import { describe, vi, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import ApiSetup from "./";

describe("ApiSetup", () => {
  const onSubmit = vi.fn();
  const onGoBack = vi.fn();

  test("renders the title and text", () => {
    render(
      <ApiSetup
        onSubmit={onSubmit}
        onGoBack={onGoBack}
        initialValue={undefined}
      />
    );
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("text")).toBeInTheDocument();
  });

  test("calls onGoBack when the back button is clicked", () => {
    render(
      <ApiSetup
        onSubmit={onSubmit}
        onGoBack={onGoBack}
        initialValue={undefined}
      />
    );
    fireEvent.click(screen.getByText("common:words.back"));
    expect(onGoBack).toHaveBeenCalled();
  });
});
