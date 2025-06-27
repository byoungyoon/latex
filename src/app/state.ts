import { create } from "zustand/react";

type State = {
  value: string;
  resultValue: string;
};

type Action = {
  setValue: (value: State["value"]) => void;
  setResultValue: (resultValue: State["resultValue"]) => void;
};

export const useStore = create<State & Action>((set) => ({
  value: "",
  resultValue: "",

  setValue: (value) => set(() => ({ value })),
  setResultValue: (resultValue) => set(() => ({ resultValue })),
}));
