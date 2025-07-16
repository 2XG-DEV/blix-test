import { Message } from "../types";

export const fetchAssistantResponse = async (
  question: string
): Promise<Message> => {
  return new Promise((resolve) => {
    const delay = Math.random() * (1500 - 500) + 500; // Random delay
    setTimeout(() => {
      resolve({
        id: `asst-${Date.now()}`,
        sender: "assistant",
        text: `This is a simulated answer to "${question}".`,
        followUpQuestions: [
          "Tell me more.",
          "What is another example?",
          "Why is that?",
        ],
      });
    }, delay);
  });
};
