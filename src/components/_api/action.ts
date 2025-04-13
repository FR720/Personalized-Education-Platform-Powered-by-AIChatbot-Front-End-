import { useApiMutation } from "@/hooks/useMutuation";

interface ChatMessage {
  message: string;
}

interface ChatResponse {
  message: string;
}

export const useChatMutation = (courseId: string) =>
  useApiMutation<ChatResponse, ChatMessage>({
    getUrl: () => `/courses/${courseId}/chat`,
    method: "POST",
  });
