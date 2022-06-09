import create from "zustand";
import {
  DuckProspectType,
  DuckType,
  fireDuck,
  getDucks,
  hireDuck
} from "./duck";

import { produce } from "immer";

interface AppState {
  ducks: Record<string, DuckType>;
  duckBeingHired: boolean;
  fireDuck: (id: string) => void;
  getDucks: () => void;
  hireDuck: (prospect: DuckProspectType) => void;
  isInitialized: boolean;
  loadingCounter: number;
}

const useStore = create<AppState>((set) => {
  return {
    ducks: {},
    duckBeingHired: false,
    fireDuck: async (id: string) => {
      set((state) => {
        return produce(state, (draft) => {
          draft.loadingCounter = state.loadingCounter + 1;
          draft.ducks[id].isBeingFired = true;
        });
      });
      try {
        const fired = await fireDuck(id);
        set((state) => {
          return produce(state, (draft) => {
            delete draft.ducks[fired.id];
          });
        });
      } finally {
        set((state) => ({
          loadingCounter: state.loadingCounter - 1
        }));
      }
    },
    getDucks: async () => {
      set((state) => ({
        loadingCounter: state.loadingCounter + 1
      }));
      try {
        const ducks = await getDucks();

        const duckObject = Object.fromEntries(ducks.map((d) => [d.id, d]));
        set(() => ({
          ducks: duckObject,
          isInitialized: true
        }));
      } finally {
        set((state) => ({
          loadingCounter: state.loadingCounter - 1
        }));
      }
    },
    hireDuck: async (prospect: DuckProspectType) => {
      set((state) => ({
        loadingCounter: state.loadingCounter + 1
      }));
      try {
        const hired = await hireDuck(prospect);
        set((state) => {
          return produce(state, (draft) => {
            draft.ducks[hired.id] = hired;
          });
        });
      } finally {
        set((state) => ({
          loadingCounter: state.loadingCounter - 1
        }));
      }
    },
    isInitialized: false,
    loadingCounter: 0
  };
});

export default useStore;

// const useStore = create<BearState>()(devtools(persist((set) => ({
//   bears: 0,
//   increase: (by) => set((state) => ({ bears: state.bears + by })),
// }))))
