import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi, test, describe } from "vitest";

import VersionsList from "./";

// Mock data
const mockVersions = [
  {
    id: "1",
    checksum: "checksum1",
    user: { avatarUrl: "url1", display_name: "user1" },
    created_at: "2022-01-01",
    dataschemas: [{ name: "schema1", code: "code1" }],
  },
  {
    id: "2",
    checksum: "checksum2",
    user: { avatarUrl: "url2", display_name: "user2" },
    created_at: "2022-01-02",
    dataschemas: [{ name: "schema2", code: "code2" }],
  },
];

// Mock hooks
vi.mock("@/hooks/useVersions", () => ({
  __esModule: true,
  default: () => ({
    versions: mockVersions,
    totalCount: 2,
    queries: { allData: { fetching: false } },
  }),
}));

vi.mock("@/hooks/useTableState", () => ({
  __esModule: true,
  default: () => ({
    tableState: { paginationVars: {}, pageSize: 5, currentPage: 1 },
    onPageChange: vi.fn(),
  }),
}));

describe("VersionsList Component", () => {
  test("renders the VersionsList component", () => {
    render(<VersionsList onRestore={() => {}} />);
    const titleElement = screen.getByText("versions_list");
    expect(titleElement).toBeDefined();
  });

  test("renders the Button component for each version", () => {
    render(<VersionsList onRestore={() => {}} />);
    const buttonElements = screen.getAllByText("common:words.restore");
    expect(buttonElements.length).toBe(mockVersions.length);
  });

  test("calls onRestore when the restore button is clicked", () => {
    const mockOnRestore = vi.fn();
    render(<VersionsList onRestore={mockOnRestore} />);
    const buttonElement = screen.getAllByText("common:words.restore")[0];
    fireEvent.click(buttonElement);
    expect(mockOnRestore).toHaveBeenCalledWith(
      mockVersions[0].checksum,
      mockVersions[0].dataschemas
    );
  });
});
