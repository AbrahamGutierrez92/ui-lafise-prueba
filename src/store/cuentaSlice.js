import { createSlice } from "@reduxjs/toolkit";


const cuentaSlice = createSlice({
    name: "cuenta",
    initialState:[],
    reducers: {
        fetchCuenta: (state, action) => {
            return action.payload;
        }
        
    }
});

export const { fetchCuenta } = cuentaSlice.actions;

export default cuentaSlice.reducer;