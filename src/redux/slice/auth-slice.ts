import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import type { User } from "@/types";

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;

	firstName: string;
	lastName: string;
	emailAddress: string;
	password: string;

	authenticating: boolean;
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,

	firstName: "",
	lastName: "",
	emailAddress: "",
	password: "",

	authenticating: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action: PayloadAction<User>) {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		logout(state) {
			state.user = null;
			state.isAuthenticated = false;
		},
		setUser(state, action: PayloadAction<User | null>) {
			state.user = action.payload;
		},
		setAuthenticating(state, action) {
			state.authenticating = action.payload;
		},
		getAuthFormDetails: (state, action) => {
		return {
			...state,
			[action?.payload?.name]: action?.payload?.value,
		};
    },
	},
});

export const { login, logout, setUser, getAuthFormDetails,setAuthenticating } = authSlice.actions;
export default authSlice.reducer;
