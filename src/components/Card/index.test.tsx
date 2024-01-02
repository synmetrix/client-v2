import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Card from "./";

describe("Card", () => {
  test("renders title correctly", () => {
    const title = "Test Title";
    render(<Card title={title} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders children correctly", () => {
    const children = <div>Test Children</div>;
    render(<Card>{children}</Card>);
    const childrenElement = screen.getByText("Test Children");
    expect(childrenElement).toBeInTheDocument();
  });
});
