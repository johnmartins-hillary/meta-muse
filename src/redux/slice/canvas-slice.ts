import { createSlice } from "@reduxjs/toolkit";

interface Canvas {
	canvasCode: string;
	nftDescription: string;
	nftName: string;
}

const initialState: Canvas = {
	canvasCode: "",
	nftDescription: "",
	nftName: "",
};

const CanvasSlice = createSlice({
    name: "Canvas",
    initialState,
    reducers: {
        getCanvasFormDetails: (state, action) => {
            return {
                ...state,
                [action?.payload?.name]: action?.payload?.value,
            }
        },
    }
});

export const { getCanvasFormDetails } = CanvasSlice.actions;

export default CanvasSlice.reducer;
