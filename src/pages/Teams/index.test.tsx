import { describe, test, expect, vi } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { Teams } from "./";

const mockTeamsProps: any = {
  userId: "1",
  teams: [
    {
      id: "team1",
      name: "Team One",
      members: [
        {
          id: "member1",
          user_id: "1",
          role: { name: "owner" },
          avatarUrl: "",
          displayName: "Member One",
        },
      ],
      creatorEmail: "creator@example.com",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
  ],
  currentTeam: null,
  onCreateOrEditTeam: vi.fn(),
  onRemoveTeam: vi.fn(),
  onSelect: vi.fn(),
  onOpen: vi.fn(),
  loading: false,
};

describe("Teams Component", () => {
  test("renders without crashing", () => {
    const { getByText } = render(<Teams {...mockTeamsProps} />);

    expect(getByText("Team One")).toBeInTheDocument();
  });

  test("calls onSelect when a team is selected", async () => {
    const { getByText } = render(<Teams {...mockTeamsProps} />);

    fireEvent.click(getByText("Team One"));
    await waitFor(() => expect(mockTeamsProps.onOpen).toHaveBeenCalled());
  });

  test("displays empty screen if no teams", () => {
    const { getByTestId } = render(
      <Teams {...{ ...mockTeamsProps, teams: [] }} />
    );

    expect(getByTestId("no-teams")).toBeInTheDocument();
  });
});
