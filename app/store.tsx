import { create } from "zustand";

// Define the types for the store
type InputStore = {
  mobileConsult: boolean;
  apiRunning: boolean;
  genre: string | null;
  weight: number | null;
  height: number | null;
  age: number | null;
  objective: string;
  activity: string;
  body: string;
  diet: string;
  allergies: string[];
  intolerance: string[];
  condition: string[];
  budget: number;
  setInput: (key: string, value: any) => void;
  delInput: (key: string, value: any) => void; // Add delInput for removing values from arrays
  setapiRunning: (value: boolean) => void; // Function to manually set apiRunning
  [key: string]: any; // Index signature for dynamic keys
};

// Create the Zustand store
const useStore = create<InputStore>((set) => ({
  apiRunning: false,
  genre: null,
  weight: null,
  height: null,
  age: null,
  objective: "",
  activity: "",
  body: "",
  diet: "",
  allergies: [],
  intolerance: [],
  condition: [],
  budget: 25000,
  mobileConsult: true,
  setInput: (key, value) => set((state) => ({ ...state, [key]: value })),
  delInput: (key, value) =>
    set((state) => {
      if (Array.isArray(state[key])) {
        return {
          ...state,
          [key]: (state[key] as string[]).filter((item) => item !== value),
        };
      }
      return state;
    }),
  setapiRunning: (value) => set(() => ({ apiRunning: value })), // Manually set apiRunning
  setMobileConsult: (value: Boolean) => set(() => ({ mobileConsult: value })), // Manually set apiRunning
}));

export default useStore;
