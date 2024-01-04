import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";

import EmptyExploration from "./index";

describe("EmptyExploration", () => {
  test("renders without error", () => {
    render(<EmptyExploration />);
  });

  const valueElement = screen.getByText("Select Models");
  expect(valueElement).toBeDefined();
});
