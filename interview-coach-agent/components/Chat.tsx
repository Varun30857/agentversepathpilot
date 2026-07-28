"use client";

interface Message {
  role: string;
  content: string;
}

interface Props {
  messages: Message[];
}

export default function Chat({ messages }: Props) {
  return (
    <div className="space-y-4 mt-8">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-4 rounded-xl ${msg.role === "assistant"
              ? "bg-violet-900"
              : "bg-zinc-800"
            }`}
        >
          <p className="text-sm text-gray-400 mb-1">
            {msg.role === "assistant" ? "AI Interviewer" : "You"}
          </p>

          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  );
}