import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import PlaygroundFilterSelect from "./";

const mockMembers = [
  {
    isVisible: true,
    name: "Orders.status",
    shortTitle: "Status",
    suggestFilterValues: true,
    title: "Orders Status",
    type: "string",
  },
  {
    isVisible: true,
    name: "Orders.createdAt",
    shortTitle: "Created at",
    suggestFilterValues: true,
    title: "Orders Created at",
    type: "time",
  },
];

describe("PlaygroundFilterSelect", () => {
  test("renders without errors", () => {
    render(
      <PlaygroundFilterSelect
        availableMembers={mockMembers}
        onChange={() => {}}
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
