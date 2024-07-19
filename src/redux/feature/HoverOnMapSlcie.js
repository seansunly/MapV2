import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  hover: "no",
};

const hoverandCountSlice = createSlice({
  name: "countAndHovers",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    hoveronMa: (state) => {
      state.hover =
        "https://5.imimg.com/data5/SELLER/Default/2022/3/LT/TS/IA/133083788/the-amazing-flying-ball-toys-500x500.jpg";
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    hoverMaps: (state, action) => {
        console.log("action ",action)
      state.hover = action.payload;
    },
    resetHover:(state)=>{
        state.hover = "";
    }
  },
});

export const {
  increment,
  decrement,
  hoveronMa,
  incrementByAmount,
  hoverMaps,
  resetHover,
} = hoverandCountSlice.actions;

export default hoverandCountSlice.reducer;
export const hoverMapsss = (state) => state.countAndHovers.hover;
export const counts = (state) => state.countAndHovers.value;
