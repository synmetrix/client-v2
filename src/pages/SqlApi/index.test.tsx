import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { SqlApi, prepareInitValues } from "./";

describe("SqlApi", () => {
  const mockInitialValue = prepareInitValues(
    "1",
    "Test DataSource",
    "123",
    "john.doe"
  );

  test("renders the component without credentials", () => {
    render(
      <SqlApi
        credentials={[]}
        initialValue={mockInitialValue}
        loading={false}
        onFinish={() => {}}
      />
    );

    expect(screen.getByText("sql_api.not_found.text")).toBeInTheDocument();
  });
});
