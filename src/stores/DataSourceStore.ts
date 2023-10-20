import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

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
  editId: string | null;
  step: number;
  isOnboarding: boolean;
  formState: FormState;
  activeBranchId: string | undefined;
  loading: boolean;
  error: string | null | undefined;
  message: string | null | undefined;
  schema: Schema | undefined;
}

interface DataSourceState extends DataSourceData {
  setStep: (step: number) => void;
  nextStep: () => void;
  setError: (error: string) => void;
  setMessage: (message: string) => void;
  setLoading: (status: boolean) => void;
  setSchema: (schema: object) => void;
  setEditId: (id: string) => void;
  setFormStateData: (step: number, data: any) => void;
  setIsOnboarding: (value: boolean) => void;
  setActiveBranchId: (id: string) => void;
  clean: () => void;
}

export const defaultFormState = {
  step0: undefined,
  step1: undefined,
  step2: undefined,
  step3: undefined,
};

const defaultState = {
  editId: null,
  step: 0,
  isOnboarding: false,
  formState: defaultFormState,
  activeBranchId: undefined,
  loading: false,
  error: null,
  message: null,
  schema: undefined,
};

const dataSourceStore = create<DataSourceState>()(
  persist(
    immer((set, _get) => ({
      ...defaultState,
      setError: (error: string) =>
        set((prev) => ({ ...prev, error, message: null })),
      setMessage: (message: string) =>
        set((prev) => ({ ...prev, message, error: null })),
      setLoading: (status: boolean) =>
        set((prev) => ({ ...prev, loading: status })),
      setSchema: (schema: object) => set((prev) => ({ ...prev, schema })),
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
          };
        }),
      setStep: (step: number) =>
        set((prev) => ({ ...prev, step, error: null, message: null })),
      nextStep: () =>
        set((prev) => ({
          ...prev,
          step: prev.step + 1,
          error: null,
          message: null,
        })),
      setIsOnboarding: (value: boolean) =>
        set((prev) => ({
          ...prev,
          isOnboarding: value,
        })),
      setActiveBranchId: (id: string) =>
        set((prev) => ({ ...prev, activeBranchId: id })),
      clean: () => set({ ...defaultState }),
    })),
    {
      name: "dataSource",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default dataSourceStore;
