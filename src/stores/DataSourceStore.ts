import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Datasources } from "@/graphql/generated";
import type {
  ApiSetupForm,
  DataSource,
  DataSourceForm,
  DataSourceSetupForm,
  DynamicForm,
} from "@/types/dataSource";

import type { ApolloError } from "@apollo/client";

export interface DataSourceData {
  id: string | null;
  step: number;
  apiSetup: ApiSetupForm | null;
  dataModel: DynamicForm | null;
  dataSource: DataSource | undefined;
  dataSourceSetup: DataSourceSetupForm | undefined;
  object: Datasources | null;
  formState: DataSourceForm | null;
  loading: boolean;
  error: ApolloError | null;
  schema: any;
}

interface DataSourceState extends DataSourceData {
  setApiSetup: (apiSetup: ApiSetupForm) => void;
  setStep: (step: number) => void;
  setDataSource: (dataSource: DataSource) => void;
  setObject: (object: Datasources) => void;
  setError: (error: ApolloError) => void;
  setLoading: (status: boolean) => void;
  setFormState: (formState: DataSourceForm) => void;
  setDataSourceSetup: (dataSourceSetup: DataSourceSetupForm) => void;
  setData: (data: DataSourceData) => void;
  setSchema: (schema: any) => void;
  clean: () => void;
}

const defaultState = {
  id: null,
  step: 0,
  dataSourceSetup: undefined,
  dataModel: null,
  apiSetup: null,
  dataSource: undefined,
  object: null,
  formState: null,
  loading: false,
  error: null,
  schema: null,
};

const dataSourceStore = create<DataSourceState>()(
  persist(
    immer((set, _get) => ({
      ...defaultState,
      setDataSourceSetup: (dataSourceSetup: DataSourceSetupForm) =>
        set((prev) => ({ ...prev, dataSourceSetup })),
      setDataModel: (dataModel: DynamicForm) =>
        set((prev) => ({ ...prev, dataModel })),
      setApiSetup: (apiSetup: ApiSetupForm) =>
        set((prev) => ({ ...prev, apiSetup })),
      setStep: (step: number) => set((prev) => ({ ...prev, step })),
      setDataSource: (dataSource: DataSource) =>
        set((prev) => ({ ...prev, dataSource })),
      setObject: (object: Datasources) => set((prev) => ({ ...prev, object })),
      setError: (error: ApolloError) => set((prev) => ({ ...prev, error })),
      setLoading: (status: boolean) =>
        set((prev) => ({ ...prev, loading: status })),
      setFormState: (formState: DataSourceForm) =>
        set((prev) => ({ ...prev, formState })),
      setSchema: (schema: any) => set((prev) => ({ ...prev, schema })),
      setData: (data: DataSourceData) => set(data),
      clean: () => set({ ...defaultState }),
    })),
    {
      name: "dataSource",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default dataSourceStore;
