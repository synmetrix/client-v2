import { render, screen } from "@testing-library/react";
import { expect, vi, test, describe } from "vitest";

import { dbMock } from "@/mocks/db";

import DataSourcesMenu from "./";

describe("DataSourcesMenu Component", () => {
  const selectedId = dbMock[0].id;
  const onChange = vi.fn();

  test("renders the DataSourcesMenu component", () => {
    render(
      <DataSourcesMenu
        entities={dbMock}
        selectedId={selectedId}
        onChange={onChange}
      />
    );
    const valueElement = screen.getByText("Ecom (demo db)");
    expect(valueElement).toBeDefined();
  });

  test("renders the default value when no datasource is selected", () => {
    render(<DataSourcesMenu entities={dbMock} onChange={onChange} />);
    const valueElement = screen.getByText("Select datasource");
    expect(valueElement).toBeDefined();
  });
});
