import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";

import EmptyExploration from "./index";

describe("EmptyExploration component", () => {
  it("renders without crashing", () => {
    render(<EmptyExploration />);
    expect(screen.getByText("no_query.header")).toBeDefined();
  });
});
