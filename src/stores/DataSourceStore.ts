import { create } from "zustand";

import type {
  ApiSetupForm,
  DataSource,
  DataSourceSetupForm,
  DynamicForm,
  Schema,
} from "@/types/dataSource";

export interface FormState {
  step0: DataSource | undefined;
  step1: DataSourceSetupForm | undefined;
  step2: DynamicForm | undefined;
  step3: ApiSetupForm | undefined;
}

export interface DataSourceData {
  step: number;
  isOnboarding: boolean;
  formState: FormState;
  loading: boolean;
  schema: Schema | undefined;
}

export interface DataSourceState extends DataSourceData {
  setStep: (step: number) => void;
  nextStep: () => void;
  setLoading: (status: boolean) => void;
  setSchema: (schema: Schema) => void;
  setEditId: (id: string) => void;
  setFormStateData: (step: number, data: any) => void;
  setIsOnboarding: (value: boolean) => void;
  clean: () => void;
}

export const defaultFormState = {
  step0: undefined,
  step1: undefined,
  step2: undefined,
  step3: undefined,
};

const defaultState = {
  step: 0,
  isOnboarding: false,
  formState: defaultFormState,
  loading: false,
  schema: undefined,
};

const dataSourceStore = create<DataSourceState>((set) => ({
  ...defaultState,
  setLoading: (status: boolean) =>
    set((prev) => ({ ...prev, loading: status })),
  setSchema: (schema: Schema) => set((prev) => ({ ...prev, schema })),
  setEditId: (id: string) => set((prev) => ({ ...prev, id })),
  setFormStateData: (step: number, data: any) =>
    set((prev) => {
      const formStep = `step${step}` as string;

      return {
        ...prev,
        formState: {
          ...prev.formState,
          [formStep]: data,
        },
      } as Partial<DataSourceState>;
    }),
  setStep: (step: number) => set((prev) => ({ ...prev, step })),
  nextStep: () =>
    set((prev) => ({
      ...prev,
      step: (prev?.step || 0) + 1,
    })),
  setIsOnboarding: (value: boolean) =>
    set((prev) => ({
      ...prev,
      isOnboarding: value,
    })),
  clean: () => set({ ...defaultState }),
}));

export default dataSourceStore;
