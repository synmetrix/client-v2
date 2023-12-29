import { describe, test, expect, vi } from "vitest";
import { render } from "@testing-library/react";

import { Explore } from "./";

vi.mock("@vitjs/runtime", () => ({
  __esModule: true,
}));

describe("Explore", () => {
  const defaultProps: any = {
    loading: false,
    meta: [],
    metaError: undefined,
    metaLoading: false,
    dataSource: { id: "1", name: "DataSource1" },
    dataSources: [{ id: "1", name: "DataSource1" }],
    exploration: { id: "1", name: "Exploration1" },
    rawSql: undefined,
    dataSet: undefined,
    params: { screenshotMode: false },
    testLoading: false,
    onChangeStep: vi.fn(),
    onOpenModal: vi.fn(),
    onCloseModal: vi.fn(),
    onSelectDelivery: vi.fn(),
    runQuery: vi.fn(),
    onSelectDataSource: vi.fn(),
    onCreateAlert: vi.fn(),
    onSendTest: vi.fn(),
    onCreateReport: vi.fn(),
  };

  test("renders ExploreWorkspace", () => {
    const { getByText } = render(<Explore {...defaultProps} />);
    expect(getByText("pages:explore")).toBeInTheDocument();
  });

  test('does not render AlertModal when modalType is not "alert"', () => {
    const { queryByTestId } = render(
      <Explore
        {...defaultProps}
        params={{ screenshotMode: false, modalType: undefined }}
      />
    );
    expect(queryByTestId("alert-form")).not.toBeInTheDocument();
  });

  test('does not render ReportModal when modalType is not "report"', () => {
    const { queryByTestId } = render(
      <Explore
        {...defaultProps}
        params={{ screenshotMode: false, modalType: undefined }}
      />
    );
    expect(queryByTestId("report-form")).not.toBeInTheDocument();
  });
});
