import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice.js";
import cuentaReducer from "./cuentaSlice.js";

const store = configureStore({
    reducer: {
        users: usersReducer,
        cuenta: cuentaReducer,
    },
});

export default store;
