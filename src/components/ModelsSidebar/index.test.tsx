import { render, screen } from "@testing-library/react";
import { expect, vi, test, describe } from "vitest";

import { branchesMock } from "@/mocks/branches";
import { dataschemasMock } from "@/mocks/dataschemas";

import ModelsSidebar from "./";

describe("ModelsSidebar Component", () => {
  test("renders the ModelsSidebar component", () => {
    render(
      <ModelsSidebar
        branches={branchesMock}
        files={dataschemasMock}
        onChangeBranch={vi.fn()}
        docs={""}
        onSelectFile={vi.fn()}
        onSetDefault={vi.fn()}
        onCreateBranch={vi.fn()}
        onSchemaDelete={vi.fn()}
        onSchemaUpdate={vi.fn()}
        onCreateFile={vi.fn()}
        dataSources={[]}
        onDataSourceChange={vi.fn()}
        ideMenu={[]}
        onDeleteBranch={vi.fn()}
      />
    );
    const titleElement = screen.getByText(/common:words.select_branch/);
    expect(titleElement).toBeDefined();
  });

  test("renders the Select component for selecting branches", () => {
    render(
      <ModelsSidebar
        branches={branchesMock}
        files={dataschemasMock}
        onChangeBranch={vi.fn()}
        docs={""}
        onSelectFile={vi.fn()}
        onSetDefault={vi.fn()}
        onCreateBranch={vi.fn()}
        onSchemaDelete={vi.fn()}
        onSchemaUpdate={vi.fn()}
        onCreateFile={vi.fn()}
        dataSources={[]}
        onDataSourceChange={vi.fn()}
        onDeleteBranch={vi.fn()}
        ideMenu={[]}
      />
    );
    const selectElement = screen.getByText("common:words.select_branch");
    expect(selectElement).toBeDefined();
  });
});
