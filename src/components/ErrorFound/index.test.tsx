import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";

import ErrorFound from "./";

describe("ErrorFound component", () => {
  test("renders 500 error message correctly", () => {
    const { getByText } = render(<ErrorFound status={500} />);
    expect(getByText("500")).toBeInTheDocument();
    expect(getByText("Sorry, something went wrong")).toBeInTheDocument();
  });

  test("renders 403 error message correctly", () => {
    const { getByText } = render(<ErrorFound status={403} />);
    expect(getByText("403")).toBeInTheDocument();
    expect(getByText("You have no access")).toBeInTheDocument();
  });

  test("renders 404 error message correctly", () => {
    const { getByText } = render(<ErrorFound status={404} />);
    expect(getByText("404")).toBeInTheDocument();
    expect(
      getByText("Sorry, the page you visited does not exist.")
    ).toBeInTheDocument();
  });
});
