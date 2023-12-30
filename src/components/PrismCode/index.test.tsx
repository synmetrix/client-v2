import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import PrismCode from "./";

describe("PrismCode", () => {
  test("renders PrismCode component", () => {
    const code = "SELECT * FROM users;";
    const lang = "sql";
    render(<PrismCode code={code} lang={lang} />);

    const codeElement = screen.getByText(code.split(" ")[0]);
    expect(codeElement).toBeInTheDocument();
  });
});
