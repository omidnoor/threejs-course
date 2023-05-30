import { create } from "zustand";

const useGame = create((set) => {
  return {
    blocksCount: 5,

    /**
     * Phases
     */
    phase: "ready",
    start: () => {
      set(() => {
        return {
          phase: "playing",
        };
      });
    },
    restart: () => {
      set(() => {
        return {
          phase: "ready",
        };
      });
    },
    end: () => {
      set(() => {
        return {
          phase: "ended",
        };
      });
    },
  };
});

export default useGame;
