import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Avatar from "./";

describe("Avatar Component", () => {
  test("renders without crashing", () => {
    render(<Avatar />);
    const avatarElement = screen.getByRole("img");
    expect(avatarElement).toBeInTheDocument();
  });

  test("displays initials when username is provided", () => {
    render(<Avatar username="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  test("displays icon when no username or img is provided", () => {
    render(<Avatar />);
    const icon = screen.getByTestId("user-outlined-icon");
    expect(icon).toBeInTheDocument();
  });

  test("displays image when img prop is provided", () => {
    render(<Avatar img="https://example.com/avatar.png" />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://example.com/avatar.png");
  });
});
