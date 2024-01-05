import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { alerts } from "@/mocks/alerts";

import AlertModal from "./";

vi.mock("@/hooks/useAlerts", () => ({
  default: () => ({
    createAlert: () => {},
    updateAlert: () => {},
    onSendTest: () => {},
    mutations: {
      createMutationData: () => {},
      updateMutationData: () => {},
      sendTestMutationData: () => {},
    },
  }),
}));

describe("AlertModal", () => {
  const mockAlert = alerts?.[0];

  const mockParams: any = {
    screenshotMode: false,
    delivery: "WEBHOOK",
    modalType: "alert",
  };

  const mockOnClose = vi.fn();
  const mockOnChangeStep = vi.fn();
  const mockOnSelectDelivery = vi.fn();

  beforeEach(() => {
    render(
      <AlertModal
        alert={mockAlert}
        isOpen={true}
        onClose={mockOnClose}
        onChangeStep={mockOnChangeStep}
        onSelectDelivery={mockOnSelectDelivery}
        params={mockParams}
      />
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the modal header correctly", () => {
    const titleElement = screen.getByText("alerts:edit_alert");
    const linkElement = screen.getByText("common:words.how_to_create_alerts");

    expect(titleElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  test("renders the AlertForm when alert or delivery is present", () => {
    const alertFormElement = screen.getByTestId("alert-form");

    expect(alertFormElement).toBeInTheDocument();
  });

  test("renders the AlertTypeSelection when alert and delivery are not present", () => {
    render(
      <AlertModal
        isOpen={true}
        onClose={mockOnClose}
        onChangeStep={mockOnChangeStep}
        onSelectDelivery={mockOnSelectDelivery}
        params={{
          ...mockParams,
          delivery: undefined,
        }}
      />
    );

    const alertTypeSelectionElement = screen.getByTestId(
      "alert-type-selection"
    );

    expect(alertTypeSelectionElement).toBeInTheDocument();
  });

  test("calls the onClose function when the modal is closed", () => {
    const closeButton = screen.getByTestId("modal-close-button");

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
