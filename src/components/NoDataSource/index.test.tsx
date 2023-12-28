import { render, screen, fireEvent } from "@testing-library/react";
import { vi, expect, describe, it } from "vitest";

import NoDataSource from ".";

describe("NoDataSource Component", () => {
  it("renders without crashing", () => {
    render(<NoDataSource />);
    expect(screen.getByRole("img")).toBeDefined();
    expect(screen.getByText("data_sources.not_found.title")).toBeDefined();
  });

  it("displays the connect button and text when onConnect is provided", () => {
    const onConnect = vi.fn();
    render(<NoDataSource onConnect={onConnect} />);
    expect(screen.getByText("data_sources.not_found.text")).toBeDefined();
    expect(
      screen.getByText("data_sources.not_found.connect_btn")
    ).toBeDefined();
  });

  it("does not display the connect button and text when onConnect is not provided", () => {
    render(<NoDataSource />);
    expect(screen.queryByText("data_sources.not_found.text")).toBeNull();
    expect(screen.queryByText("data_sources.not_found.connect_btn")).toBeNull();
  });

  it("calls onConnect prop when connect button is clicked", () => {
    const onConnect = vi.fn();
    render(<NoDataSource onConnect={onConnect} />);
    fireEvent.click(screen.getByText("data_sources.not_found.connect_btn"));
    expect(onConnect).toHaveBeenCalledTimes(1);
  });
});
