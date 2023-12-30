import { render, screen } from "@testing-library/react";
import { expect, vi, test, describe } from "vitest";

import { dataSourcesMock } from "@/mocks/dataSources";

import DataSourcesMenu from "./";

describe("DataSourcesMenu Component", () => {
  const selectedId = dataSourcesMock[0].id;
  const onChange = vi.fn();

  test("renders the DataSourcesMenu component", () => {
    render(
      <DataSourcesMenu
        entities={dataSourcesMock}
        selectedId={selectedId}
        onChange={onChange}
      />
    );
    const valueElement = screen.getByText("Ecom (demo db)");
    expect(valueElement).toBeDefined();
  });

  test("renders the default value when no datasource is selected", () => {
    render(<DataSourcesMenu entities={dataSourcesMock} onChange={onChange} />);
    const valueElement = screen.getByText("Select datasource");
    expect(valueElement).toBeDefined();
  });
});
