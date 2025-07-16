# AI-Assisted React Native Bottom Sheet

This project is a React Native (Expo) application that implements a sophisticated, AI-powered conversational bottom sheet. It serves as a demonstration of modern mobile development techniques, combining a fluid user interface with robust state management and a feature-rich chat experience.

## Project Overview

The core of the application is the `AssistantSheet`, a bottom sheet component that allows users to interact with a simulated AI assistant. Users can type questions, receive answers, and engage in a continuous conversation. The component is designed to be performant, responsive, and user-friendly.

## Core Technologies

- **UI Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Bottom Sheet**: `@gorhom/bottom-sheet` (v4)
- **State Management**: `@reduxjs/toolkit` and `react-redux`
- **High-Performance List**: `@shopify/flash-list`
- **Gesture Handling**: `react-native-gesture-handler`
- **Animation**: `react-native-reanimated`

## Functionality Requirements

### Message Interaction

- **User Input**: A text input field is fixed to the bottom of the sheet, allowing users to type and submit questions.
- **Simulated API**: A mock API (`features/assistant/api/assistantAPI.ts`) simulates network requests with randomized delays, providing dynamic responses.
- **Loading State**: A loading indicator is displayed while the application awaits a response from the assistant, providing clear feedback to the user.
- **Response Handling**: The assistant's response, along with follow-up questions, is appended to the message list upon receipt.

### Bottom Sheet Behavior

- **Dynamic Resizing**: The bottom sheet supports multiple snap points (e.g., partially and fully expanded), allowing users to resize it as needed.
- **Scrolling**: The `MessageList` component, built with `@shopify/flash-list`, ensures smooth and efficient scrolling, even with a large number of messages.
- **Keyboard Management**: The component gracefully handles the appearance and dismissal of the keyboard, ensuring the text input remains visible and accessible at all times. This is achieved through the `keyboardBehavior` and `keyboardBlurBehavior` props of the `@gorhom/bottom-sheet` component.

## Project Structure

The project follows a feature-based directory structure to promote modularity and separation of concerns.

```
.
├── app/                # Main application screens and layout
├── components/         # Generic, reusable components
├── features/           # Self-contained feature modules
│   └── assistant/      # The core AI assistant feature
│       ├── api/        # Simulated API logic
│       ├── components/ # UI components for the assistant
│       ├── state/      # Redux slice for state management
│       └── types/      # TypeScript type definitions
└── store/              # Redux store configuration
```

## How Key Requirements Are Addressed

- **Scrollable Message List**: Implemented in `features/assistant/components/MessageList.tsx` using `@shopify/flash-list` for optimal performance.
- **Fixed Text Input**: The `features/assistant/components/ChatInput.tsx` component is rendered within the `AssistantSheet`, ensuring it remains fixed at the bottom.
- **Simulated API with Loading**: The `submitQuestion` async thunk in `features/assistant/state/assistantSlice.ts` manages the loading state while `features/assistant/api/assistantAPI.ts` simulates the delayed response.
- **Dynamic Resizing**: The `snapPoints` prop of the `BottomSheet` component in `features/assistant/components/AssistantSheet.tsx` defines the expansion and collapse points.
- **Keyboard Handling**: The `keyboardBehavior="interactive"` and `keyboardBlurBehavior="restore"` props on the `BottomSheet` component provide a seamless user experience when the keyboard is active.
