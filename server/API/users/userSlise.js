"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.adminActions = exports.userActions = void 0;
//import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
const toolkit_1 = require("@reduxjs/toolkit");
const userSclice = createSlice({
    name: "user",
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("userId");
            state.isLoggedIn = false;
        },
    },
});
const adminSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("adminId");
            localStorage.removeItem("token");
            state.isLoggedIn = false;
        },
    },
});
exports.userActions = userSclice.actions;
exports.adminActions = adminSlice.actions;
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        user: userSclice.reducer,
        admin: adminSlice.reducer,
    },
});
