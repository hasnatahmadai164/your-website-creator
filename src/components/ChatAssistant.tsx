import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHAT_WEBHOOK_URL, SITE_LINKS } from "@/config/site";

type ChatMessage = { role: "assistant" | "visitor"; text: string; time: string };

const welcome =
  "Hello, I am Edith's assistant. I can answer questions about her coaching, services and how to book a call. How can I help you today?";

const prompts = [
  "What services does Edith offer?",
  "Can you help with interview preparation?",
  "I am a senior leader. Can Edith help me?",
  "How do I book a call?",
];

function cleanReply(value: string) {
  return value
    .replace(/[\*#`]/g, "")
    .replace(/^[\s]*[-–—][\s]*/gm, "")
    .replace(/[\s]+[–—-][\s]+/g, ". ")
    .trim();
}

function timeNow() {
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date());
}

function createSessionId() {
  return crypto.randomUUID?.() ?? `${Date.now()}${Math.random().toString(36).slice(2)}`;
}

function getSessionId() {
  try {
    const stored = sessionStorage.getItem("edithChatSession");
    if (stored) return stored;
    const next = createSessionId();
    sessionStorage.setItem("edithChatSession", next);
    return next;
  } catch {
    return createSessionId();
  }
}

function LinkedMessage({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+|[\w.+]+@[\w.-]+\.[A-Za-z]{2,})/g);
  return (
    <p className="whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (part.startsWith("http")) {
          const booking = part.includes("calendly.com");
          return (
            <a
              key={`${part}${index}`}
              href={part}
              target="_blank"
              rel="noreferrer"
              className={booking ? "chat-booking-link" : "chat-text-link"}
            >
              {booking ? "Book a call" : part}
            </a>
          );
        }
        if (part.includes("@")) {
          return <a key={`${part}${index}`} href={`mailto:${part}`} className="chat-text-link">{part}</a>;
        }
        return part;
      })}
    </p>
  );
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: welcome, time: timeNow() },
  ]);
  const sessionId = useRef("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionId.current = getSessionId();
    const timer = window.setTimeout(() => setTooltip(true), 2800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(value: string) {
    const question = value.trim();
    if (!question || loading) return;
    setMessages((current) => [...current, { role: "visitor", text: question, time: timeNow() }]);
    setInput("");
    setLoading(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 70000);
    try {
      const response = await fetch(CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sendMessage", sessionId: sessionId.current, chatInput: question }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Request failed");
      const contentType = response.headers.get("content-type") ?? "";
      const payload: unknown = contentType.includes("application/json") ? await response.json() : await response.text();
      const item = Array.isArray(payload) ? payload[0] : payload;
      const raw = typeof item === "string" ? item : item && typeof item === "object"
        ? ["output", "text", "reply", "message"].map((key) => (item as Record<string, unknown>)[key]).find((entry) => typeof entry === "string")
        : undefined;
      if (typeof raw !== "string" || !raw.trim()) throw new Error("Empty response");
      setMessages((current) => [...current, { role: "assistant", text: cleanReply(raw), time: timeNow() }]);
    } catch {
      setMessages((current) => [...current, {
        role: "assistant",
        text: `I am having trouble connecting right now. Please email Edith at ${SITE_LINKS.email} or book a call using the link in the footer.`,
        time: timeNow(),
      }]);
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <div className="chat-shell">
      {open && (
        <section className="chat-window" aria-label="Edith's Assistant">
          <header className="chat-header">
            <div className="chat-monogram">E</div>
            <div className="flex-1">
              <h2 className="font-display text-sm tracking-wide text-primary-foreground">Edith's Assistant</h2>
              <p className="flex items-center gap-2 text-xs text-primary-foreground/75"><span className="online-dot" />Online</p>
            </div>
            <Button variant="icon" size="icon" aria-label="Close assistant" onClick={() => setOpen(false)}>
              <X className="size-5" />
            </Button>
          </header>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={`${message.time}${index}`} className={`chat-row ${message.role === "visitor" ? "justify-end" : "justify-start"}`}>
                <div className={message.role === "visitor" ? "visitor-bubble" : "assistant-bubble"}>
                  <LinkedMessage text={message.text} />
                  <span className="chat-time">{message.time}</span>
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="chat-prompts">
                {prompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt}</button>)}
              </div>
            )}
            {loading && <div className="typing"><span /><span /><span /></div>}
            <div ref={endRef} />
          </div>
          <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); void sendMessage(input); }}>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage(input);
                }
              }}
              rows={1}
              placeholder="Type your question"
              aria-label="Type your question"
              disabled={loading}
            />
            <Button type="submit" size="icon" aria-label="Send message" disabled={!input.trim() || loading}><Send className="size-4" /></Button>
          </form>
        </section>
      )}
      {!open && tooltip && <div className="chat-tooltip">Questions? Ask Edith's Assistant</div>}
      <Button
        variant="icon"
        className="chat-launcher"
        aria-label="Open Edith's Assistant"
        onClick={() => { setOpen(true); setTooltip(false); }}
      >
        <MessageCircle className="size-6" />
      </Button>
    </div>
  );
}