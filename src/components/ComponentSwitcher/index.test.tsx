import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";

import ComponentSwitcher from "./";

describe("ComponentSwitcher", () => {
  const items = [
    <div key={1}>Item 1</div>,
    <div key={2}>Item 2</div>,
    <div key={3}>Item 3</div>,
  ];

  test("renders the first item by default", () => {
    const { container } = render(
      <ComponentSwitcher items={items} activeItemIndex={"all"} />
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Item 1
      </div>
    `);
  });

  test("renders the specified item when activeItemIndex is a number", () => {
    const { container } = render(
      <ComponentSwitcher items={items} activeItemIndex={1} />
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Item 2
      </div>
    `);
  });
});
