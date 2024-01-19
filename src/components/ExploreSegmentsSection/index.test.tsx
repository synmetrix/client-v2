import { describe, beforeEach, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import ExploreSegmentsSection from "./";

describe("ExploreSegmentsSection", () => {
  const segments = [
    { name: "Segment 1", shortTitle: "Segment 1" },
    { name: "Segment 2", shortTitle: "Segment 2" },
    { name: "Segment 3", shortTitle: "Segment 3" },
  ];

  const onRemoveMock = vi.fn();
  const onToggleSectionMock = vi.fn();

  beforeEach(() => {
    render(
      <ExploreSegmentsSection
        segments={segments as any}
        onRemove={onRemoveMock}
        onToggleSection={onToggleSectionMock}
        isActive={true}
        key={"segmentsSec"}
      />
    );
  });

  test("renders ExploreSegmentsSection correctly", () => {
    const tag = screen.getByText(segments[0].shortTitle);

    expect(tag).toBeInTheDocument();
  });

  test("calls onToggleSection when the button is clicked", () => {
    const button = screen.getByText("Segments");

    fireEvent.click(button);
    expect(onToggleSectionMock).toHaveBeenCalledWith("segmentsSec");
  });
});
