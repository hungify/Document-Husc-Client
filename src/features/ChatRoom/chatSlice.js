// import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import io from "socket.io-client";
// import documentsService from "services/documentsService";

// const init = createAction("messages/init/socket");
// export const initSocket = createAsyncThunk(init.type, async (args, thunkAPI) => {
//   try {
//     const socket = await io("https://localhost:8000", {
//       transports: ["websocket"],
//     });

//     return socket;
//   } catch (error) {
//     const { message } = error;
//     return thunkAPI.rejectWithValue(message);
//   }
// });

// const fetch = createAction("messages/fetch");
// export const fetchMessage = createAsyncThunk(fetch.type, async (slug, thunkAPI) => {
//   try {
//     const { data } = await documentsService.fetchDocumentDetailsByTab({
//       slug,
//       key: "chat",
//     });
//     return data.messages;
//   } catch (error) {
//     const { message } = error.response.data;
//     return thunkAPI.rejectWithValue(message);
//   }
// });

// const initialState = {
//   messages: [],
//   conversationId: "",
// };

// export const chatSlice = createSlice({
//   name: "chat",
//   initialState,
//   reducers: {
//     setConversationId: (state, action) => {
//       state.conversationId = action.payload;
//     },
//     setMessages: (state, action) => {
//       state.messages = action.payload;
//     },
//     addMessage: (state, action) => {
//       state.messages.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(initSocket.fulfilled, (state, action) => {
//       state.socket = action.payload;
//     });
//     builder.addCase(fetchMessage.fulfilled, (state, action) => {
//       state.messages = action.payload;
//     });
//   },
// });

// export const { setConversationId, setMessages, addMessage } = chatSlice.actions;
// export default chatSlice.reducer;
