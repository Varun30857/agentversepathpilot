"use client";

import { useState } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export function useInterview() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(
    userMessage: string,
    company: string,
    role: string,
    difficulty: string
  ) {
    const updated: Message[] = [
      ...messages,
      {
        role: "user",
        content: userMessage,
      },
    ];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          config: {
            company,
            role,
            difficulty,
          },
          messages: updated,
          isCompleted: false,
        }),
      });

      console.log("HTTP Status:", res.status);

      const data = await res.json();

      console.log("===== API RESPONSE =====");
      console.log(JSON.stringify(data, null, 2));

      const response = data;
      console.log("API Response:", data);
      console.log("HTTP Status:", res.status);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.content,
        },
      ]);

      return response;
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    sendMessage,
  };
}