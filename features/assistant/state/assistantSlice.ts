import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAssistantResponse } from "../api/assistantAPI";
import { Message } from "../types";

interface AssistantState {
  messages: Message[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AssistantState = {
  messages: [],
  status: "idle",
};

export const submitQuestion = createAsyncThunk(
  "assistant/submitQuestion",
  async (questionText: string) => {
    const response = await fetchAssistantResponse(questionText);
    return response;
  }
);

const assistantSlice = createSlice({
  name: "assistant",
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        submitQuestion.fulfilled,
        (state, action: PayloadAction<Message>) => {
          state.status = "succeeded";
          state.messages.push(action.payload);
        }
      );
  },
});

export const { addUserMessage } = assistantSlice.actions;
export default assistantSlice.reducer;
