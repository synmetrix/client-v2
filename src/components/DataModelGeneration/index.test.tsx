import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import DataModelGeneration from "./";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
}));

describe("DataModelGeneration", () => {
  const dataSource = {
    name: "Test Data Source",
    icon: <div>Icon</div>,
  };

  const schema = {
    Table1: {
      Column1: {},
      Column2: {},
    },
    Table2: {
      Column1: {},
      Column2: {},
    },
  };

  const onSubmit = vi.fn();
  const onGoBack = vi.fn();
  const onSkip = vi.fn();

  beforeEach(() => {
    render(
      <DataModelGeneration
        dataSource={dataSource}
        schema={schema as any}
        onSubmit={onSubmit}
        onGoBack={onGoBack}
        onSkip={onSkip}
        isOnboarding={false}
        isGenerate={false}
      />
    );
  });

  test("renders data source name", () => {
    const dataSourceName = screen.getByText("Test Data Source");
    expect(dataSourceName).toBeInTheDocument();
  });

  test("renders search input", () => {
    const searchInput = screen.getByPlaceholderText("common:words.find");
    expect(searchInput).toBeInTheDocument();
  });

  test("calls onGoBack when back button is clicked", () => {
    const backButton = screen.getByText("common:words.back");
    fireEvent.click(backButton);
    expect(onGoBack).toHaveBeenCalled();
  });
});
