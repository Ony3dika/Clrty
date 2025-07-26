import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      user: {
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
      },

      updateUser: (userData) =>
        set((state) => ({
          user: {
            ...state.user,
            ...userData,
          },
        })),
    }),
    { name: "clrtyStore" }
  )
);
