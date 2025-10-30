import { useState, useEffect, useRef, use } from "react";
import api from "../lib/http";

type ChatOut = { reply: string };

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({
      top: boxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [log]);

  const send = async () => {
    if (!msg.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const user = msg;
      setLog((prev) => [...prev, `You: ${user}`]);
      setMsg("");
      const res = await api.post<ChatOut>("/chat", { message: user });
      setLog((prev) => [...prev, `Bot: ${res.data.reply}`]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const isUserMessage = (line: string) => line.startsWith("You:");
  const getMessageContent = (line: string) => line.replace(/^(You|Bot): /, "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl h-[88vh] bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-800/50">
        {/* Header simplificado y elegante */}
        <div className="bg-slate-900/80 backdrop-blur-sm px-6 py-4 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg shadow-lg">
              🤖
            </div>
            <div>
              <h1 className="text-base font-semibold text-white">
                Juani Assistant
              </h1>
              <p className="text-xs text-slate-400">El mejor asistente del mundo.</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>
        </div>

        {/* Chat area con mejor espaciado */}
        <div ref={boxRef} className="flex-1 overflow-y-auto px-6 py-6">
          {log.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-5xl border border-purple-500/20">
                🤖
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-white">
                  ¡Hola! Soy tu asistente
                </h3>
                <p className="text-slate-400">
                  Haceme cualquier pregunta y te ayudaré
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6 max-w-lg w-full">
                {[
                  { icon: "💡", text: "Explicame algo" },
                  { icon: "📝", text: "Ayudame a escribir" },
                  { icon: "🔍", text: "Buscá información" },
                  { icon: "🎯", text: "Resolvé un problema" },
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setMsg(suggestion.text)}
                    className="flex items-center gap-2 p-3 bg-slate-800/50 hover:bg-slate-800/80 rounded-lg transition-all text-sm text-slate-300 hover:text-white"
                  >
                    <span className="text-lg">{suggestion.icon}</span>
                    <span>{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {log.map((line, i) => {
              const isUser = isUserMessage(line);
              const content = getMessageContent(line);

              return (
                <div
                  key={i}
                  className={`flex gap-3 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-sm shadow-lg">
                      🤖
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                      isUser
                        ? "bg-purple-600 text-white rounded-tr-sm"
                        : "bg-slate-800 text-slate-100 rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {content}
                    </p>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 text-sm shadow-lg">
                      👤
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-sm shadow-lg">
                  🤖
                </div>
                <div className="bg-slate-800 px-4 py-2.5 rounded-2xl rounded-tl-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-300">Escribiendo</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Input area mejorada */}
        <div className="flex-shrink-0 p-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-800/50">
          <div className="flex gap-2 items-center">
            <input
              className="flex-1 h-12 bg-slate-800 border border-slate-700 rounded-full px-5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Escribí tu mensaje..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && send()}
            />
            <button
              onClick={send}
              disabled={loading || !msg.trim()}
              className="flex-shrink-0 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6 font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Enviar</span>
                  <span className="text-base">✨</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
