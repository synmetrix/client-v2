import { defaultTableCellRenderer } from "react-virtualized";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import VirtualTable, { SortBySet, cellRenderer } from "./";

import type { TableCellProps } from "react-virtualized";

// Mock data for testing
const columns = [
  { Header: "Column 1", accessor: "col1" },
  { Header: "Column 2", accessor: "col2" },
];
const data = [
  { col1: "row 1 col 1", col2: "row 1 col 2" },
  { col1: "row 2 col 1", col2: "row 2 col 2" },
];

describe("SortBySet class", () => {
  test("should be able to add a new key", () => {
    const sortBySet = new SortBySet();
    sortBySet.add({ id: "col1", desc: false });
    expect(sortBySet.size).toBe(1);
  });

  test("should eliminate duplicates when reverseUniq is called", () => {
    const sortBySet = new SortBySet();
    sortBySet.add({ id: "col1", desc: true });
    sortBySet.add({ id: "col1", desc: false });
    sortBySet.reverseUniq("id");
    expect(sortBySet.size).toBe(1);
  });
});

describe("cellRenderer function", () => {
  const defaultArgs = {
    cellData: "test",
    dataKey: "key",
  } as TableCellProps;

  test('renders a link when format is "link"', () => {
    const args = {
      ...defaultArgs,
      membersIndex: { key: { format: "link" } },
    };

    render(cellRenderer(args, args.membersIndex) as any);
    const link = screen.getByText("test");
    expect(link).toHaveAttribute("href", "test");
    expect(link).toHaveTextContent("test");
  });

  test('renders a link with custom label when format is "link" object with label', () => {
    const args = {
      ...defaultArgs,
      membersIndex: {
        key: { format: { type: "link", label: "Custom Label" } },
      },
    };

    render(cellRenderer(args, args.membersIndex) as any);
    const link = screen.getByText("Custom Label");
    expect(link).toHaveAttribute("href", "test");
    expect(link).toHaveTextContent("Custom Label");
  });

  test('renders currency with default symbol when format is "currency"', () => {
    const args = {
      ...defaultArgs,
      membersIndex: { key: { format: "currency" } },
    };

    render(cellRenderer(args, args.membersIndex) as any);
    const symbols = screen.getAllByText("$");
    expect(symbols).toHaveLength(1);
  });

  test('renders currency with custom symbol when format is "currency" and meta is provided', () => {
    const args = {
      ...defaultArgs,
      membersIndex: {
        key: { format: "currency", meta: { currencySymbol: "€" } },
      },
    };

    render(cellRenderer(args, args.membersIndex) as any);
    const symbols = screen.getAllByText("€");
    expect(symbols).toHaveLength(1);
  });
  test('renders percentage when format is "percent"', () => {
    const args = {
      ...defaultArgs,
      membersIndex: { key: { format: "percent" } },
    };

    render(cellRenderer(args, args.membersIndex) as any);
    const percentage = screen.getByText("%");
    expect(percentage).toBeInTheDocument();
  });

  test('renders ID in italics when format is "id"', () => {
    const args = {
      ...defaultArgs,
      membersIndex: { key: { format: "id" } },
    };

    render(cellRenderer(args, args.membersIndex) as any);
    const italic = screen.getByText("test");
    expect(italic).toHaveStyle("font-style: italic");
  });

  test("calls defaultTableCellRenderer when format is undefined", () => {
    const args = { ...defaultArgs, membersIndex: {} };

    vi.mock("react-virtualized", async () => {
      const rv: any = await vi.importActual("react-virtualized");
      return {
        ...rv,
        defaultTableCellRenderer: vi.fn(() => <div>Default Rendered</div>),
      };
    });

    render(cellRenderer(args, args.membersIndex) as any);
    expect(defaultTableCellRenderer).toHaveBeenCalledWith(args);
    const defaultRendered = screen.getByText("Default Rendered");
    expect(defaultRendered).toBeInTheDocument();

    vi.clearAllMocks();
  });
});

describe("<VirtualTable />", () => {
  test("renders without crashing", () => {
    render(<VirtualTable columns={columns} data={data} />);
  });

  test("renders custom cell data using cellRenderer", () => {
    const customCellRenderFunction = vi.fn(cellRenderer);
    render(
      <VirtualTable
        columns={columns}
        data={data}
        cellRenderer={customCellRenderFunction as any}
      />
    );
    expect(customCellRenderFunction).toHaveBeenCalled();
  });

  test("renders the correct number of rows", () => {
    const { getAllByRole } = render(
      <VirtualTable columns={columns} data={data} />
    );
    expect(getAllByRole("rowgroup")).toHaveLength(2); // includes header
  });

  test("sorts data on column header click if sorting is enabled", () => {
    const handleSortUpdate = vi.fn();
    render(
      <VirtualTable
        onSortUpdate={handleSortUpdate}
        columns={columns}
        data={data}
      />
    );
    act(() => {
      fireEvent.click(screen.getByText("Column 1").nextElementSibling!);
    });
    act(() => {
      fireEvent.click(screen.getByText("Sort DESC"));
    });
    expect(handleSortUpdate).toHaveBeenCalled();
  });

  test("does not sort data on column header click if sorting is disabled", () => {
    const handleSortUpdate = vi.fn();
    render(
      <VirtualTable
        onSortUpdate={handleSortUpdate}
        columns={columns}
        data={data}
        sortDisabled={true}
      />
    );
    fireEvent.click(screen.getByText(/Column 1/i));
    expect(handleSortUpdate).not.toHaveBeenCalled();
  });

  test("displays no data message when data is empty", () => {
    const { getByText } = render(<VirtualTable columns={[]} data={[]} />);
    expect(getByText("No Data")).toBeInTheDocument();
  });

  test("displays custom empty data message when provided", () => {
    const customMessage = "Custom No Data Message";
    const { getByText } = render(
      <VirtualTable columns={[]} data={[]} emptyDesc={customMessage} />
    );
    expect(getByText(customMessage)).toBeInTheDocument();
  });

  test("displays loading spinner while data is loading", () => {
    render(
      <VirtualTable columns={columns} loading={true} loadingTip={"Loading"} />
    );
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  test("renders message alerts if provided", () => {
    const messages = [{ type: "error", text: "Error message" }];
    render(
      <VirtualTable messages={messages as any} columns={columns} data={data} />
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  test("renders a footer if provided", () => {
    const footer = vi.fn(() => <div data-testid="footer">Footer content</div>);
    render(<VirtualTable columns={columns} data={data} footer={footer} />);
    expect(screen.getByTestId("footer")).toHaveTextContent("Footer content");
  });
});
