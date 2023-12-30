import { describe, test, expect, vi } from "vitest";
import { render } from "@testing-library/react";

import SimpleForm from "./";

describe("SimpleForm", () => {
  const onSubmitMock = vi.fn();

  const config: any = {
    item1: {
      section: "section1",
      label: "Item 1",
      defaultValue: "Initial Value 1",
      type: "text",
      size: "small",
    },
    item2: {
      section: "section2",
      label: "Item 2",
      defaultValue: "",
      type: "text",
      size: "large",
    },
  };

  test("should render the form with correct sections and items", () => {
    const { getByText } = render(
      <SimpleForm config={config} onSubmit={onSubmitMock} />
    );

    expect(getByText("section1")).toBeInTheDocument();

    const item1Input = getByText("Item 1") as HTMLInputElement;

    expect(item1Input).toBeInTheDocument();
  });
});
