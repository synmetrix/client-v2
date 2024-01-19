import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";

import DataSourceTag from "./index";

describe("DataSourceTag", () => {
  const dataSource = {
    icon: "icon",
    name: "Test DataSource",
  };

  test("renders the DataSourceTag component", () => {
    const { getByText } = render(<DataSourceTag dataSource={dataSource} />);
    expect(getByText(dataSource.name)).toBeInTheDocument();
  });

  test("renders the icon", () => {
    const { getByText } = render(<DataSourceTag dataSource={dataSource} />);
    expect(getByText(dataSource.icon)).toBeInTheDocument();
  });
});
