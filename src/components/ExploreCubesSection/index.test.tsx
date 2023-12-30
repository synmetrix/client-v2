import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { availableQueryMembers, selectedQueryMembers } from "@/mocks/explore";

import Cube from "./";

describe("Cube", () => {
  const onMemberSelect = vi.fn();

  test("renders without error", () => {
    render(
      <Cube
        members={availableQueryMembers}
        selectedMembers={selectedQueryMembers}
        onMemberSelect={onMemberSelect}
      />
    );

    expect(screen.getByTestId("cube")).toBeInTheDocument();
  });
});
