import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Highlight from "./";

describe("Highlight component", () => {
  test("renders correctly", () => {
    const index = 1;
    const text = "Lorem ipsum dolor sit amet";
    const indices = [
      [0, 5],
      [6, 11],
    ];

    const { container } = render(
      <Highlight index={index} text={text} indices={indices} />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText(`line ${index}:`)).toBeInTheDocument();
    expect(screen.getByText(text.split(" ")[0])).toBeInTheDocument();
  });
});
