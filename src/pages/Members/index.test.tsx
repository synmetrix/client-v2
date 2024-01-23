import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";

import { Members } from ".";

describe("Members component", () => {
  test("renders without crashing", () => {
    const { getByText } = render(
      <Members members={[]} userId={""} accessLists={[]} />
    );
    expect(getByText("settings:members.title")).toBeInTheDocument();
  });

  test("renders members", () => {
    const members: any = [
      { id: "1", displayName: "John Doe", role: { name: "admin" } },
      { id: "2", displayName: "Jane Doe", role: { name: "member" } },
    ];
    const { getByText } = render(
      <Members userId={""} members={members} accessLists={[]} />
    );
    members.forEach((member: any) => {
      expect(getByText(member.displayName)).toBeInTheDocument();
    });
  });
});
