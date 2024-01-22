import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import RestAPI from "./";

import type { Mock } from "vitest";

vi.spyOn(window, "fetch").mockImplementation(
  vi.fn(() => Promise.resolve({ json: () => "error" })) as Mock
);

describe("RestAPI", () => {
  test("renders RestAPI component", () => {
    render(<RestAPI dataSourceId="123" branchId="456" playgroundState={{}} />);
    const restApiElement = screen.getByTestId("rest-api");
    expect(restApiElement).toBeInTheDocument();
  });

  test("submits form and displays response", async () => {
    render(<RestAPI dataSourceId="123" branchId="456" playgroundState={{}} />);
    const submitButton = screen.getByText("common:words.send_request");
    fireEvent.click(submitButton);

    waitFor(() => {
      const responseElement = screen.getByTestId("response");
      expect(responseElement).toBeInTheDocument();
    });
  });
});
