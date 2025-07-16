Plan: AI-Assisted React Native Bottom Sheet Implementation

1. Project Objective
   The primary goal is to create a fully functional, polished, and performant bottom sheet component in a React Native (Expo) application. This component will serve as a conversational AI assistant interface, allowing users to ask questions and receive simulated responses.

2. Core Technologies & Libraries
   You must use the following technologies. Do not deviate unless absolutely necessary.

UI Framework: React Native with Expo

Language: TypeScript

Styling: NativeWind (Tailwind CSS for React Native)

Bottom Sheet: @gorhom/bottom-sheet (v4)

State Management: @reduxjs/toolkit and react-redux

High-Performance List: @shopify/flash-list

Gesture Handling: react-native-gesture-handler

Animation: react-native-reanimated

3. Project Structure
   The project adheres to the following feature-based directory structure.

.
├── app/
│ ├── index.tsx # Main screen, renders the Assistant
│ └── \_layout.tsx # Root layout for the app
│
├── components/
│ └── LoadingIndicator.tsx # Generic loading indicator
│
├── features/
│ └── assistant/
│ ├── api/
│ │ └── assistantAPI.ts # Simulated API logic
│ │
│ ├── components/
│ │ ├── AssistantSheet.tsx # Main bottom sheet component
│ │ ├── MessageList.tsx # Scrollable list of messages
│ │ ├── MessageItem.tsx # Individual message bubble
│ │ ├── ChatInput.tsx # Fixed text input area
│ │ └── FollowUpButton.tsx # Buttons for follow-up questions
│ │
│ ├── state/
│ │ └── assistantSlice.ts # Redux slice for the assistant
│ │
│ └── types/
│ └── index.ts # All TypeScript type definitions
│
└── store/
└── store.ts # Redux store configuration

4. Step-by-Step Implementation Guide
   Step 1: Define Types (features/assistant/types/index.ts)
   Create a Message interface. This is the single source of truth for the message data structure.

export interface Message {
id: string;
text: string;
sender: 'user' | 'assistant';
followUpQuestions?: string[];
}

Step 2: Simulate the API (features/assistant/api/assistantAPI.ts)
Implement the fetchAssistantResponse function. It must:

Be an async function.

Accept a question string as an argument.

Return a Promise<Message>.

Use setTimeout with a randomized delay between 500ms and 1500ms to simulate network latency.

Resolve with a hardcoded Message object of sender: 'assistant', including sample followUpQuestions.

Step 3: Implement the Redux Slice (features/assistant/state/assistantSlice.ts)
This is a critical step. The slice must manage the entire state for the chat.

State Interface: Define AssistantState with messages: Message[] and status: 'idle' | 'loading' | 'succeeded' | 'failed'.

Async Thunk:

Create an async thunk named submitQuestion using createAsyncThunk.

It should call fetchAssistantResponse from the API service.

It will handle the asynchronous lifecycle (pending, fulfilled, rejected).

Slice Definition:

Use createSlice.

initialState: messages should be an empty array, status should be 'idle'.

reducers:

addUserMessage(state, action: PayloadAction<Message>): A standard reducer to synchronously add the user's message to the messages array. This provides instant UI feedback.

extraReducers:

Handle submitQuestion.pending: Set state.status = 'loading'.

Handle submitQuestion.fulfilled: Set state.status = 'succeeded' and push the action.payload (the assistant's message) into the state.messages array.

Step 4: Build UI Components (features/assistant/components/ and components/)
AssistantSheet.tsx

This is the main container.

Use @gorhom/bottom-sheet's BottomSheet component.

snapPoints: Define with useMemo (e.g., ['25%', '90%']).

keyboardBehavior: Set to "interactive" for smooth keyboard handling.

keyboardBlurBehavior: Set to "restore".

The component's children will be MessageList and ChatInput, wrapped in a View with flex: 1.

MessageList.tsx

Use useSelector to get messages and status from the Redux store.

Use @shopify/flash-list to render the messages array.

estimatedItemSize is required for performance.

renderItem will render the MessageItem component.

The keyExtractor should use message.id.

Conditionally render the LoadingIndicator component at the end of the list if status === 'loading'.

The list must automatically scroll to the bottom when a new message is added. Use a ref on the FlashList and call scrollToEnd({ animated: true }).

ChatInput.tsx

Use useState to manage the text input's value.

Use @gorhom/bottom-sheet's BottomSheetTextInput for optimal keyboard interaction.

On submit (e.g., via a "Send" TouchableOpacity):

Dispatch addUserMessage with the user's new message object.

Dispatch the submitQuestion async thunk with the input text.

Clear the text input field.

The submit button should be disabled if the input is empty or if status === 'loading'.

MessageItem.tsx

A presentational component that receives a message: Message prop.

Use NativeWind to style the message bubble differently based on message.sender.

User messages: Aligned right, different background color (e.g., bg-blue-500).

Assistant messages: Aligned left, different background color (e.g., bg-gray-200).

If message.followUpQuestions exists, map over them and render a FollowUpButton for each.

FollowUpButton.tsx

A simple TouchableOpacity with text.

When pressed, it should trigger the same submission logic as the ChatInput (dispatch addUserMessage and submitQuestion).

LoadingIndicator.tsx (components/LoadingIndicator.tsx)

A simple, visually appealing loading animation. Can be a ActivityIndicator or a custom-animated view (e.g., pulsing dots).

Step 5: Assemble the App (store/store.ts and app/index.tsx)
store/store.ts

Configure the Redux store using configureStore.

Combine reducers, including assistant: assistantReducer.

Export RootState and AppDispatch types for use throughout the app.

app/index.tsx

Wrap the entire application in GestureHandlerRootView (from react-native-gesture-handler) inside `app/_layout.tsx`.

Wrap the app in the Redux Provider, passing the configured store.

Render the AssistantSheet component.

5. Quality Gates & Best Practices Checklist
   [ ] Clean Code: Code must be well-commented, clearly structured, and follow TypeScript best practices.

[ ] Performance: FlashList must be used for the message list. Avoid anonymous functions in renderItem.

[ ] UX - Keyboard: The keyboard must not hide the text input. The sheet must resize smoothly when the keyboard appears/disappears.

[ ] UX - Instant Feedback: The user's message must appear in the list immediately upon submission, before the API response is received.

[ ] UX - Loading State: A clear loading indicator must be visible while waiting for the assistant's response.

[ ] Responsiveness: The UI must look clean on various screen sizes.

[ ] State Integrity: All state related to the chat must be handled exclusively through Redux. No stray useState for message lists.

[ ] Component Reusability: Components should be as modular and reusable as possible.
