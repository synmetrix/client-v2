import { render, screen } from "@testing-library/react";
import { beforeEach, afterEach, describe, test, vi, expect } from "vitest";

import DataSchemaForm from "./index";

describe("DataSchemaForm", () => {
  const onSubmitMock = vi.fn();

  beforeEach(() => {
    render(<DataSchemaForm onSubmit={onSubmitMock} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the form correctly", () => {
    expect(screen.getByText("common:words.filename")).toBeInTheDocument();
    expect(screen.getByText("common:words.save")).toBeInTheDocument();
  });
});
