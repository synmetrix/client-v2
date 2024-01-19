import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import PageHeader from "./";

describe("PageHeader", () => {
  test("renders title correctly", () => {
    const title = "Test Title";
    render(<PageHeader title={title} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });
});
