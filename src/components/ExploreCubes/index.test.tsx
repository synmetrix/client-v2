import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { availableQueryMembers, selectedQueryMembers } from "@/mocks/explore";

import ExploreCubes from "./";

describe("ExploreCubes", () => {
  const defaultProps: any = {
    availableQueryMembers,
    selectedQueryMembers,
  };

  test("renders without error", () => {
    render(<ExploreCubes {...defaultProps} />);
    expect(screen.getByTestId("explore-cubes")).toBeInTheDocument();
  });

  test("displays the header when provided", () => {
    const header = <h1 data-testid="explore-cubes-header">Explore Cubes</h1>;
    render(<ExploreCubes header={header} {...defaultProps} />);
    expect(screen.getByTestId("explore-cubes-header")).toBeInTheDocument();
  });

  test("displays the search input", () => {
    render(<ExploreCubes {...defaultProps} />);
    expect(
      screen.getByTestId("explore-cubes-search-input")
    ).toBeInTheDocument();
  });
});
