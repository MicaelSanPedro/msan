#!/usr/bin/env python3
"""Apply remaining changes to page.tsx"""
import re

with open("/home/z/my-project/src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Fix fetchChats to merge with localStorage
old_fetch = '''  const fetchChats = async () => {
    try {
      console.log("[fetchChats] Fetching chats from server session...");
      const res = await fetch(`/api/chats`);
      if (res.ok) {
        const data = await res.json();
        console.log("[fetchChats] Loaded", data.length, "chats from Gists");
        const mapped: ChatHistory[] = data.map((c: Record<string, unknown>) => ({
          id: c.id as string,
          title: c.title as string,
          model: c.model as string,
          messages: (c.messages || []).map((m: Record<string, unknown>) => ({
            role: m.role as "user" | "assistant",
            content: m.content as string,
            model: m.model as string,
          })),
          createdAt: c.createdAt as number,
          updatedAt: c.updatedAt as number,
        }));
        setHistory(mapped);
        setNeedsReauth(false);
      } else {'''

new_fetch = '''  const fetchChats = async () => {
    try {
      console.log("[fetchChats] Fetching chats from server...");
      const localHistory = loadHistory();
      const res = await fetch(`/api/chats`);
      if (res.ok) {
        const data = await res.json();
        console.log("[fetchChats] Loaded", data.length, "chats from Gists");
        const mapped: ChatHistory[] = data.map((c: Record<string, unknown>) => ({
          id: c.id as string,
          title: c.title as string,
          model: c.model as string,
          messages: (c.messages || []).map((m: Record<string, unknown>) => ({
            role: m.role as "user" | "assistant",
            content: m.content as string,
            model: m.model as string,
          })),
          createdAt: c.createdAt as number,
          updatedAt: c.updatedAt as number,
        }));
        const gistIds = new Set(mapped.map(c => c.id));
        const localOnly = localHistory.filter(c => !gistIds.has(c.id));
        const merged = [...mapped, ...localOnly].sort((a, b) => b.updatedAt - a.updatedAt);
        setHistory(merged);
        setNeedsReauth(false);
      } else {'''

content = content.replace(old_fetch, new_fetch)

# 2. Remove `filtered` and `search` references, fix handleSend, add image/paste handlers
# Remove the `filtered` variable
content = content.replace(
    '''  const filtered = MODELS.filter((m) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return m.id.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q);
  });''',
    '  const mi = MODELS.find((m) => m.id === selectedModel);\n  const isVisionModel = !!mi?.vision;'
)

# 3. Fix handleSend to support images and file prompt
old_handleSend = '''  const handleSend = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const model = selectedModel;
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);
    if (inputRef.current) inputRef.current.style.height = "auto";'''

new_handleSend = '''  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAttachedImage(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const removeImage = () => setAttachedImage(null);
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = () => setAttachedImage(reader.result as string);
        reader.readAsDataURL(item.getAsFile()!);
        return;
      }
    }
  };

  const sendAsTxt = () => { fileModeRef.current = true; setShowFilePrompt(false); };
  const sendNormal = () => { fileModeRef.current = false; setShowFilePrompt(false); };
  const filePromptAnswered = useRef(false);
  useEffect(() => {
    if (filePromptAnswered.current && !showFilePrompt) { filePromptAnswered.current = false; handleSend(); }
    if (showFilePrompt) filePromptAnswered.current = true;
  }, [showFilePrompt]);

  const handleSend = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if ((!text && !attachedImage) || loading) return;
    if (text.length > 2000 && fileModeRef.current === null && !overrideText) { setShowFilePrompt(true); return; }
    const img = attachedImage;
    const isFile = fileModeRef.current === true && text.length > 2000;
    fileModeRef.current = null;
    const fileContent = isFile ? `Arquivo: documento.txt\\n\\n\\`\\`\\`txt\\n${text}\\n\\`\\`\\`` : text;
    const userMsg: Message = { role: "user", content: isFile ? fileContent : (text || "Descreva esta imagem."), image: img || undefined };
    const model = selectedModel;
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setAttachedImage(null);
    setLoading(true);
    if (inputRef.current) inputRef.current.style.height = "auto";'''

content = content.replace(old_handleSend, new_handleSend)

# 4. Fix API messages to support images
old_api = 'const apiMessages = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));'
new_api = '''const apiMessages = [...messages, userMsg].map((m) => {
      if (m.image) return { role: m.role, content: [{ type: "text", text: m.content }, { type: "image_url", image_url: { url: m.image } }] };
      return { role: m.role, content: m.content };
    });'''
content = content.replace(old_api, new_api)

# 5. Update handleSend deps
content = content.replace(
    '}, [input, loading, selectedModel, messages, activeChatId, isLoggedIn]);',
    '}, [input, loading, selectedModel, messages, activeChatId, isLoggedIn, attachedImage]);'
)

# 6. Fix newChat to clear image
content = content.replace(
    'setLoading(false); setMessages([]); setActiveChatId(null); setSearch("");',
    'setLoading(false); setMessages([]); setActiveChatId(null); setChatSearch(""); setAttachedImage(null);'
)

# 7. Fix selectModel
old_select = 'const selectModel = (id: string) => { setSelectedModel(id); setDropdownOpen(false); setSearch(""); setSidebarOpen(false); };'
new_select = 'const selectModel = (id: string) => { setSelectedModel(id); setDropdownOpen(false); };'
content = content.replace(old_select, new_select)

# 8. Update SidebarContent calls
content = content.replace(
    'search={search} setSearch={setSearch} filtered={filtered} selectModel={selectModel} ps={ps} getShort={getShort}',
    'chatSearch={chatSearch} setChatSearch={setChatSearch}'
)
content = content.replace(
    'search={search} setSearch={setSearch} filtered={filtered} selectModel={selectModel} ps={ps} getShort={getShort}',
    'chatSearch={chatSearch} setChatSearch={setChatSearch}'
)

# 9. Replace the header model selector + header with simpler version
old_header_model = '''            {/* Model selector */}
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="btn-elegant flex items-center gap-2 px-2.5 md:px-3 py-1.5 md:py-2 rounded-md border" style={{ background: "rgba(197, 168, 128, 0.03)", borderColor: "rgba(139, 115, 85, 0.12)" }}>
                <div className="provider-dot" style={{ background: ms.c }} />
                <span className="text-[12px] md:text-[13px] font-medium leading-tight truncate max-w-[120px] sm:max-w-none" style={{ color: "#EAE5D9", fontFamily: "var(--font-inter)" }}>
                  {getShort(selectedModel)}
                </span>
                {mi?.params && <span className="hidden sm:inline text-[10px] leading-tight" style={{ color: "#9B9585", fontFamily: "var(--font-inter)" }}>{mi.params}</span>}
                <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${dropdownOpen ? "rotate-180" : ""}`} style={{ color: "#9B9585" }} strokeWidth={1.5} />
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-30 fade-in" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute top-full left-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-[400px] max-w-[400px] max-h-[75vh] rounded-md z-40 flex flex-col overflow-hidden slide-up" style={{ background: "rgba(22, 21, 20, 0.95)", border: "1px solid rgba(139, 115, 85, 0.18)", boxShadow: "0 16px 48px rgba(0,0,0,0.6)", backdropFilter: "blur(20px)" }}>
                    <div className="p-2.5 md:p-3" style={{ borderBottom: "1px solid rgba(139, 115, 85, 0.10)" }}>
                      <input type="text" placeholder="Buscar modelo..." value={search} onChange={(e) => setSearch(e.target.value)} autoFocus className="w-full h-9 px-3 text-[12px] rounded-md bg-[rgba(197,168,128,0.03)] border text-[#C9C3B4] placeholder-[#9B9585] outline-none transition-all duration-500" style={{ borderColor: "rgba(139, 115, 85, 0.12)", fontFamily: "var(--font-inter)" }} onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(197, 168, 128, 0.3)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(139, 115, 85, 0.12)"; }} />
                    </div>
                    <div className="overflow-y-auto p-1.5 md:p-2">
                      {filtered.map((m) => {
                        const s = ps(m.provider);
                        const a = selectedModel === m.id;
                        return (
                          <button key={m.id} onClick={() => selectModel(m.id)} className="dropdown-item w-full text-left px-2.5 md:px-3 py-2 md:py-2.5 rounded-md" style={{ background: a ? "rgba(197,168,128,0.08)" : "transparent" }}>
                            <div className="flex items-center gap-2.5">
                              <div className="provider-dot" style={{ background: s.c }} />
                              <div className="min-w-0 flex-1">
                                <p className={`text-[12px] md:text-[13px] font-medium truncate transition-colors duration-500 ${a ? "text-[#EAE5D9]" : "text-[#C9C3B4]"}`} style={{ fontFamily: "var(--font-inter)" }}>{getName(m.id)}</p>
                                <p className="text-[10px] md:text-[11px] truncate" style={{ color: "#9B9585", fontFamily: "var(--font-inter)" }}>{m.provider}{m.params ? ` · ${m.params}` : ""}</p>
                              </div>
                              {m.popular && <span className="text-[8px] px-1.5 py-[2px] rounded-sm font-semibold tracking-wider flex-shrink-0 ui-caps" style={{ background: "rgba(197, 168, 128, 0.08)", color: "#C5A880", fontFamily: "var(--font-inter)" }}>TOP</span>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>'''

new_header_model = '''            {/* Model name in header (opens dropdown moved to input area) */}
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="btn-elegant flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ background: "rgba(197, 168, 128, 0.03)", border: "1px solid rgba(139, 115, 85, 0.12)" }}>
              <span className="text-[12px] font-medium" style={{ color: "#EAE5D9", fontFamily: "var(--font-inter)" }}>{getShort(selectedModel)}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} style={{ color: "#9B9585" }} strokeWidth={1.5} />
            </button>'''

content = content.replace(old_header_model, new_header_model)

# 10. Replace the old input bar + footer with new pill input + Gemini model selector
old_input_area = '''        {/* Input bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 glass-footer pt-3 pb-3 md:pb-4 px-3 md:px-4">
          <div className="w-full max-w-2xl mx-auto">
            <div className="input-elegant flex items-end gap-2 px-3 py-2.5 md:px-4 md:py-3 rounded-lg" style={{ background: "rgba(22, 21, 20, 0.85)", border: "1px solid rgba(139, 115, 85, 0.12)" }}>
              <textarea ref={inputRef} value={input} onChange={(e) => { setInput(e.target.value); const ta = e.target; ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 120) + "px"; }} onKeyDown={handleKeyDown} placeholder="Escreva seu pensamento..." disabled={loading} rows={1} className="flex-1 bg-transparent text-[14px] resize-none outline-none leading-[1.6] pt-0 pb-0" style={{ maxHeight: "120px", caretColor: "#C5A880", color: "#EAE5D9", fontFamily: "var(--font-inter)" }} />
              {loading ? (
                <button onClick={stopGen} className="btn-elegant w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "rgba(197, 168, 128, 0.06)", color: "#9B9585" }} title="Parar">
                  <Square className="w-2.5 h-2.5" fill="currentColor" strokeWidth={1} />
                </button>
              ) : (
                <button onClick={() => handleSend()} disabled={!input.trim()} className={`send-btn w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${input.trim() ? "active" : "inactive"}`} title="Enviar">
                  <ArrowUp className="w-3 h-3" strokeWidth={1.5} />
                </button>
              )}
            </div>
            <p className="text-center mt-2.5 text-[10px] opacity-25 hidden md:block" style={{ color: "#9B9585", fontFamily: "var(--font-inter)" }}>
              Chatbot pode cometer erros. Verifique informações importantes.
            </p>
          </div>
        </div>'''

new_input_area = '''        {/* Input bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 glass-footer pt-3 pb-3 md:pb-4 px-3 md:px-4">
          <div className="w-full max-w-2xl mx-auto">
            {/* Gemini-style model selector */}
            <div className="flex justify-center mb-2">
              <div className="relative w-fit">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors" style={{ background: dropdownOpen ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <span style={{ color: "#EAE5D9", fontSize: "13px", fontFamily: "var(--font-inter)", fontWeight: 500 }}>{getShort(selectedModel)}</span>
                  {mi?.vision && <span className="text-[9px] px-1.5 py-px rounded" style={{ background: "rgba(74,144,217,0.15)", color: "#4A90D9", fontFamily: "var(--font-inter)" }}>VISAO</span>}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} style={{ color: "#888" }} strokeWidth={1.5} />
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} style={{ background: "rgba(0,0,0,0.4)" }} />
                    <div className="absolute bottom-full left-0 mb-2 w-full z-40 rounded-xl overflow-hidden" style={{ background: "#2a2a2a", boxShadow: "0 -8px 32px rgba(0,0,0,0.5)" }}>
                      <div className="flex justify-center pt-2 pb-1">
                        <div className="w-[40%] h-[1px]" style={{ background: "rgba(255,255,255,0.2)" }} />
                      </div>
                      <div className="max-h-[50vh] overflow-y-auto px-1.5 pb-1.5">
                        {MODELS.map((m) => {
                          const isSelected = selectedModel === m.id;
                          return (
                            <button key={m.id} onClick={() => { setSelectedModel(m.id); setDropdownOpen(false); }} className="w-full flex items-center px-3 py-3 rounded-lg text-left transition-colors" style={{ background: isSelected ? "rgba(255,255,255,0.06)" : "transparent" }}>
                              <div className="flex-1 min-w-0">
                                <p style={{ color: "#fff", fontSize: "14px", fontWeight: 600, fontFamily: "var(--font-inter)" }}>{getName(m.id)}</p>
                                <p style={{ color: "#888", fontSize: "12px", fontFamily: "var(--font-inter)" }}>{m.desc || `${m.provider} · ${m.params}`}</p>
                              </div>
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#4A90D9" }}>
                                  <Check className="w-3 h-3" style={{ color: "#fff" }} strokeWidth={2.5} />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Image preview */}
            {attachedImage && (
              <div className="relative inline-block mb-2 pl-2">
                <img
                  src={attachedImage}
                  alt="Preview"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const maxW = 160, maxH = 120;
                    const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
                    img.style.width = Math.round(img.naturalWidth * ratio) + "px";
                    img.style.height = Math.round(img.naturalHeight * ratio) + "px";
                  }}
                  className="rounded-lg object-contain"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <button onClick={removeImage} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(22, 21, 20, 0.9)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <X className="w-3 h-3" style={{ color: "#EAE5D9" }} strokeWidth={2} />
                </button>
              </div>
            )}

            {/* File prompt modal */}
            {showFilePrompt && (
              <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setShowFilePrompt(false)}>
                <div onClick={e => e.stopPropagation()} className="mx-4 p-5 rounded-2xl w-full max-w-sm" style={{ background: "#1a1918", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p className="text-[15px] font-medium mb-1" style={{ color: "#EAE5D9", fontFamily: "var(--font-inter)" }}>Texto longo detectado</p>
                  <p className="text-[13px] mb-4" style={{ color: "#9B9585", fontFamily: "var(--font-inter)" }}>
                    Seu texto tem {input.length.toLocaleString()} caracteres. Quer enviar como arquivo <span className="font-mono" style={{ color: "#C5A880" }}>.txt</span> para melhor organizacao?
                  </p>
                  <div className="flex gap-2">
                    <button onClick={sendNormal} className="flex-1 py-2 rounded-xl text-[13px] font-medium transition-colors" style={{ background: "rgba(255,255,255,0.06)", color: "#EAE5D9", fontFamily: "var(--font-inter)" }}>
                      Enviar normal
                    </button>
                    <button onClick={sendAsTxt} className="flex-1 py-2 rounded-xl text-[13px] font-medium transition-colors flex items-center justify-center gap-1.5" style={{ background: "rgba(197, 168, 128, 0.15)", color: "#C5A880", border: "1px solid rgba(197, 168, 128, 0.3)", fontFamily: "var(--font-inter)" }}>
                      <FileText className="w-3.5 h-3.5" />
                      Enviar como .txt
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Import success toast */}
            {importSuccess && (
              <div className="text-center mb-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px]" style={{ background: "rgba(74,144,74,0.12)", color: "#5a5", fontFamily: "var(--font-inter)" }}>
                  <Check className="w-3 h-3" strokeWidth={2} /> Importado com sucesso
                </span>
              </div>
            )}

            {/* Pill input */}
            <div className="input-elegant flex items-center gap-3 px-3 py-3 md:px-4 md:py-3 rounded-full" style={{ background: "rgba(22, 21, 20, 0.85)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                onClick={() => isVisionModel && imageInputRef.current?.click()}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.15)", opacity: isVisionModel ? 1 : 0.2, cursor: isVisionModel ? "pointer" : "not-allowed" }}
                title={isVisionModel ? "Adicionar imagem" : "Modelo nao suporta imagens"}
              >
                <Plus className="w-4 h-4" style={{ color: "#EAE5D9" }} strokeWidth={1.5} />
              </button>
              <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <textarea ref={inputRef} onPaste={handlePaste} value={input} onChange={(e) => { setInput(e.target.value); const ta = e.target; ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 60) + "px"; }} onKeyDown={handleKeyDown} placeholder="Pergunte alguma coisa" disabled={loading} rows={1} className="flex-1 bg-transparent text-[14px] resize-none outline-none leading-[1.5] py-0 overflow-y-auto" style={{ maxHeight: "60px", caretColor: "#C5A880", color: "#EAE5D9", fontFamily: "var(--font-inter)" }} />
              {loading ? (
                <button onClick={stopGen} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(255,255,255,0.15)" }} title="Parar">
                  <Square className="w-3 h-3" fill="#EAE5D9" strokeWidth={1} />
                </button>
              ) : (
                <div className="flex items-center gap-2 flex-shrink-0">
                  {(input.trim() || attachedImage) && (
                    <button onClick={() => handleSend()} className="w-8 h-8 rounded-full flex items-center justify-center send-btn active" title="Enviar">
                      <ArrowUp className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              )}
            </div>
            <p className="text-center mt-2.5 text-[10px] opacity-25 hidden md:block" style={{ color: "#9B9585", fontFamily: "var(--font-inter)" }}>
              Chatbot pode cometer erros. Verifique informacoes importantes.
            </p>
          </div>
        </div>'''

content = content.replace(old_input_area, new_input_area)

# 11. Add image rendering in user messages
old_user_msg = '''                    {msg.role === "user" ? (
                      <div className="flex justify-end gap-2.5 md:gap-3.5">
                        <div className="max-w-[88%] md:max-w-[70%] flex flex-col items-end">
                          <div className="px-3.5 py-2.5 md:px-4 md:py-3 text-[14px] leading-relaxed rounded-md" style={{ background: "rgba(197, 168, 128, 0.06)", color: "#EAE5D9", fontFamily: "var(--font-inter)", border: "1px solid rgba(139, 115, 85, 0.08)" }}>
                            {msg.content}
                          </div>
                        </div>'''

new_user_msg = '''                    {msg.role === "user" ? (
                      <div className="flex justify-end gap-2.5 md:gap-3.5">
                        <div className="max-w-[88%] md:max-w-[70%] flex flex-col items-end">
                          {msg.image && <img src={msg.image} alt="" className="max-w-full max-h-48 rounded-lg mb-2 object-contain" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />}
                          <div className="px-3.5 py-2.5 md:px-4 md:py-3 text-[14px] leading-relaxed rounded-md" style={{ background: "rgba(197, 168, 128, 0.06)", color: "#EAE5D9", fontFamily: "var(--font-inter)", border: "1px solid rgba(139, 115, 85, 0.08)" }}>
                            {msg.content}
                          </div>
                        </div>'''

content = content.replace(old_user_msg, new_user_msg)

with open("/home/z/my-project/src/app/page.tsx", "w") as f:
    f.write(content)

print("All changes applied successfully!")
print(f"File size: {len(content)} bytes")