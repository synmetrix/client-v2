import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { alerts } from "@/mocks/alerts";
import { queryStateMock } from "@/mocks/queryState";

import ReportModal from "./";

describe("ReportModal", () => {
  const mockReport = alerts?.[0];

  const mockQuery = queryStateMock;

  const mockParams: any = {
    screenshotMode: false,
    delivery: "WEBHOOK",
    modalType: "report",
  };

  const mockOnClose = vi.fn();
  const mockOnSendTest = vi.fn();
  const mockOnSubmit = vi.fn();
  const mockOnChangeStep = vi.fn();
  const mockOnSelectDelivery = vi.fn();

  beforeEach(() => {
    render(
      <ReportModal
        report={mockReport}
        query={mockQuery}
        isOpen={true}
        onClose={mockOnClose}
        onSendTest={mockOnSendTest}
        onSubmit={mockOnSubmit}
        onChangeStep={mockOnChangeStep}
        onSelectDelivery={mockOnSelectDelivery}
        loading={false}
        params={mockParams}
      />
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the modal header correctly", () => {
    const titleElement = screen.getByText("reports:edit_report");
    expect(titleElement).toBeInTheDocument();

    const infoBlockElement = screen.getByText(
      "common:words.how_to_create_reports"
    );
    expect(infoBlockElement).toBeInTheDocument();
  });

  test("renders the ReportForm when report or delivery is present", () => {
    const reportFormElement = screen.getByTestId("report-form");
    expect(reportFormElement).toBeInTheDocument();
  });

  test("renders the AlertTypeSelection when report and delivery are not present", () => {
    render(
      <ReportModal
        report={undefined}
        query={mockQuery}
        isOpen={true}
        onClose={mockOnClose}
        onSendTest={mockOnSendTest}
        onSubmit={mockOnSubmit}
        onChangeStep={mockOnChangeStep}
        onSelectDelivery={mockOnSelectDelivery}
        loading={false}
        params={mockParams}
      />
    );

    const alertTypeSelectionElement = screen.queryByTestId(
      "alert-type-selection"
    );
    expect(alertTypeSelectionElement).not.toBeInTheDocument();
  });

  test("calls the onClose function when the modal is closed", () => {
    const closeButton = screen.getByTestId("modal-close-button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
