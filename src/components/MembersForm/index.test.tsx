import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { Team_Roles_Enum } from "@/graphql/generated";

import MembersForm from "./";

vi.mock("@/utils/helpers/validations", () => ({
  email: vi.fn(),
}));

describe("MembersForm", () => {
  const handleSubmitMock = vi.fn();
  const inviteRoles = [
    { label: "Member", value: Team_Roles_Enum.Member },
    { label: "Admin", value: Team_Roles_Enum.Admin },
  ];

  beforeEach(() => {
    handleSubmitMock.mockReset();
  });

  test("renders the form elements correctly", () => {
    render(
      <MembersForm onSubmit={handleSubmitMock} inviteRoles={inviteRoles} />
    );
    expect(screen.getByText("members.members.title")).toBeInTheDocument();
    expect(
      screen.getByText("members.members.invite_team_member")
    ).toBeInTheDocument();
    expect(screen.getByText("members.members.select_role")).toBeInTheDocument();
    expect(screen.getByText("members.members.invite")).toBeInTheDocument();
  });
});
