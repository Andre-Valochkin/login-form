import { create } from "zustand";

export const useAuthStore = create((set) => ({
	isLoggedIn: false,
	email: "",
	login: (email) => set({ isLoggedIn: true, email }),
	logout: () => set({ isLoggedIn: false, email: "" }),
}));