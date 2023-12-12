import { createSlice } from "@reduxjs/toolkit";
const initialState = { sent: [], inbox: [], count: 0 };

const mailSlice = createSlice({
  name: "mailSlice",
  initialState: initialState,
  reducers: {
    sent(state, action) {
      state.sent = action.payload;
    },
    inbox(state, action) {
      state.inbox = action.payload;
    },
    countUnreadMail(state, action) {
      state.count = action.payload;
    },
  },
});

export const mailAction = mailSlice.actions;
export default mailSlice.reducer;
