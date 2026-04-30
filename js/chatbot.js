/* ─────────────────────────────────────────
   BPD Chat Widget + Contact Form → Telegram
   ───────────────────────────────────────── */
(function () {
  'use strict';

  const BOT  = '8250457851:AAGxe_QW2W0CPrU1pXHciOcGoq-QTZDTJ0I';
  const CHAT = '8280691508';          // Rachit personal Telegram
  const TEL  = '0400 000 000';

  /* ── Telegram send ── */
  async function tg(text) {
    try {
      await fetch('https://api.telegram.org/bot' + BOT + '/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT, text, parse_mode: 'HTML' })
      });
    } catch (e) { /* silent */ }
  }

  /* ── Styles ── */
  const css = `
#bpd-chat { position: fixed; bottom: 24px; right: 24px; z-index: 9999; font-family: 'Source Sans 3', system-ui, sans-serif; }

#bpd-bubble {
  width: 56px; height: 56px; border-radius: 50%;
  background: #1a5438; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(26,84,56,.45);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}
#bpd-bubble:hover { transform: scale(1.08); box-shadow: 0 8px 28px rgba(26,84,56,.55); }

#bpd-badge {
  position: absolute; top: -4px; right: -4px;
  width: 20px; height: 20px; border-radius: 50%;
  background: #e6b840; color: #0c1810;
  font-size: 11px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  animation: bpd-ping 2s ease-in-out infinite;
}
@keyframes bpd-ping {
  0%,100% { transform: scale(1); }
  50%      { transform: scale(1.18); }
}
#bpd-badge.hidden { display: none; }

#bpd-window {
  position: absolute; bottom: 68px; right: 0;
  width: 320px; border-radius: 16px;
  background: #fff; border: 1px solid #d4e0d8;
  box-shadow: 0 16px 56px rgba(12,24,16,.18);
  overflow: hidden;
  animation: bpd-slide-in 0.22s cubic-bezier(0.16,1,0.3,1);
}
@keyframes bpd-slide-in {
  from { opacity: 0; transform: translateY(12px) scale(.96); }
  to   { opacity: 1; transform: none; }
}

#bpd-head {
  background: #1a5438;
  padding: 16px 16px 14px;
  display: flex; align-items: center; justify-content: space-between;
}
#bpd-head-info { display: flex; align-items: center; gap: 10px; }
#bpd-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,.15); border: 1.5px solid rgba(255,255,255,.25);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 800; color: #fff; letter-spacing: -.04em;
  flex-shrink: 0;
}
#bpd-head-info div strong { display: block; font-size: 14px; font-weight: 700; color: #fff; }
#bpd-head-info div span  { font-size: 11px; color: rgba(255,255,255,.55); }
#bpd-close-btn {
  background: none; border: none; cursor: pointer; padding: 4px;
  color: rgba(255,255,255,.6); border-radius: 6px;
  transition: background 0.15s, color 0.15s;
}
#bpd-close-btn:hover { background: rgba(255,255,255,.1); color: #fff; }

#bpd-msgs {
  padding: 16px; min-height: 180px; max-height: 260px;
  overflow-y: auto; display: flex; flex-direction: column; gap: 10px;
  scroll-behavior: smooth;
}

.bpd-msg {
  max-width: 82%; padding: 10px 14px; border-radius: 12px;
  font-size: 14px; line-height: 1.5;
  animation: bpd-msg-in 0.18s ease;
}
@keyframes bpd-msg-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: none; }
}
.bpd-msg.bot {
  background: #f3f5f3; color: #111c14;
  border-bottom-left-radius: 4px; align-self: flex-start;
}
.bpd-msg.user {
  background: #1a5438; color: #fff;
  border-bottom-right-radius: 4px; align-self: flex-end;
}
.bpd-msg.done {
  background: #e6f0e9; color: #111c14;
  border-radius: 12px; align-self: flex-start;
  font-size: 13px; line-height: 1.55;
}
.bpd-msg.done strong { color: #1a5438; }
.bpd-msg.done a { color: #1a5438; font-weight: 700; }
.bpd-typing { display: flex; gap: 4px; padding: 12px 16px; }
.bpd-typing span {
  width: 7px; height: 7px; border-radius: 50%; background: #8fa898;
  animation: bpd-dot 1.2s ease-in-out infinite;
}
.bpd-typing span:nth-child(2) { animation-delay: .2s; }
.bpd-typing span:nth-child(3) { animation-delay: .4s; }
@keyframes bpd-dot {
  0%,80%,100% { transform: scale(.8); opacity: .5; }
  40%          { transform: scale(1.1); opacity: 1; }
}

#bpd-input-area {
  display: flex; gap: 8px; padding: 10px 12px;
  border-top: 1px solid #d4e0d8; background: #f3f5f3;
}
#bpd-input {
  flex: 1; border: 1.5px solid #d4e0d8; border-radius: 8px;
  padding: 9px 12px; font: 14px/1 'Source Sans 3', sans-serif;
  color: #111c14; background: #fff; outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
#bpd-input:focus { border-color: #1a5438; box-shadow: 0 0 0 3px rgba(26,84,56,.1); }
#bpd-send {
  width: 38px; height: 38px; border-radius: 8px;
  background: #1a5438; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.15s;
}
#bpd-send:hover { background: #1f6644; transform: scale(1.05); }
#bpd-send:disabled { background: #8fa898; cursor: default; transform: none; }

@media (max-width: 400px) {
  #bpd-window { width: calc(100vw - 32px); right: 0; }
  #bpd-chat   { bottom: 16px; right: 16px; }
}
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── Build widget DOM ── */
  const wrap = document.createElement('div');
  wrap.id = 'bpd-chat';
  wrap.innerHTML = `
    <button id="bpd-bubble" aria-label="Chat with us" aria-expanded="false">
      <svg id="bpd-ico-chat" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <svg id="bpd-ico-x" width="20" height="20" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" viewBox="0 0 24 24" style="display:none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      <span id="bpd-badge" aria-hidden="true">1</span>
    </button>
    <div id="bpd-window" role="dialog" aria-label="Book a driving lesson" style="display:none">
      <div id="bpd-head">
        <div id="bpd-head-info">
          <div id="bpd-avatar">BPD</div>
          <div>
            <strong>Betterprepared Drivers</strong>
            <span>We reply quickly</span>
          </div>
        </div>
        <button id="bpd-close-btn" aria-label="Close chat">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div id="bpd-msgs" aria-live="polite"></div>
      <div id="bpd-input-area">
        <input id="bpd-input" type="text" placeholder="Type here…" autocomplete="off">
        <button id="bpd-send" aria-label="Send">
          <svg width="15" height="15" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  /* ── Elements ── */
  const bubble   = document.getElementById('bpd-bubble');
  const win      = document.getElementById('bpd-window');
  const msgs     = document.getElementById('bpd-msgs');
  const input    = document.getElementById('bpd-input');
  const sendBtn  = document.getElementById('bpd-send');
  const badge    = document.getElementById('bpd-badge');
  const closeBtn = document.getElementById('bpd-close-btn');
  const icoChat  = document.getElementById('bpd-ico-chat');
  const icoX     = document.getElementById('bpd-ico-x');

  /* ── State ── */
  const lead = { name: '', location: '', phone: '' };
  let step = 0;
  let open = false;

  const STEPS = [
    { key: 'name',     q: "👋 Hi! Looking to book a driving lesson? I'll get you set up in 3 quick questions.\n\nWhat's your name?", placeholder: 'Your name', type: 'text' },
    { key: 'location', q: (n) => `Nice to meet you, ${n}! 📍\n\nWhat suburb or area are you in?`, placeholder: 'Your suburb', type: 'text' },
    { key: 'phone',    q: "Almost done! 📞\n\nWhat's the best number to reach you on?", placeholder: '04XX XXX XXX', type: 'tel' },
  ];

  /* ── Helpers ── */
  function addMsg(text, cls) {
    const el = document.createElement('div');
    el.className = 'bpd-msg ' + cls;
    el.innerHTML = text.replace(/\n/g, '<br>');
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'bpd-typing'; el.id = 'bpd-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('bpd-typing');
    if (el) el.remove();
  }

  function botSay(text, delay = 600) {
    showTyping();
    return new Promise(res => setTimeout(() => {
      removeTyping();
      addMsg(text, 'bot');
      res();
    }, delay));
  }

  function setInput(placeholder, type = 'text') {
    input.placeholder = placeholder;
    input.type = type;
    input.value = '';
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  }

  function disableInput() {
    input.disabled = true;
    sendBtn.disabled = true;
    input.placeholder = 'Type here…';
  }

  /* ── Start conversation ── */
  async function startChat() {
    step = 0;
    const q = STEPS[0].q;
    await botSay(typeof q === 'function' ? q() : q, 400);
    setInput(STEPS[0].placeholder, STEPS[0].type);
  }

  /* ── Handle user reply ── */
  async function handleSend() {
    const val = input.value.trim();
    if (!val) return;

    addMsg(val, 'user');
    disableInput();

    if (step < STEPS.length) {
      lead[STEPS[step].key] = val;
      step++;
    }

    if (step < STEPS.length) {
      const q = STEPS[step].q;
      await botSay(typeof q === 'function' ? q(lead.name) : q);
      setInput(STEPS[step].placeholder, STEPS[step].type);
    } else {
      // All collected — send to Telegram
      const msg = [
        '🚗 <b>New BPD Lead — Chat Widget</b>',
        '',
        '👤 <b>Name:</b> ' + lead.name,
        '📍 <b>Location:</b> ' + lead.location,
        '📞 <b>Phone:</b> ' + lead.phone,
        '',
        '🕐 ' + new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })
      ].join('\n');

      await tg(msg);

      await botSay(
        '✅ <strong>You\'re all set!</strong>\n\nOur instructor will call you at <strong>' + lead.phone + '</strong> shortly to confirm your lesson.\n\nWant to chat now? Call <a href="tel:+61400000000">' + TEL + '</a>',
        700
      );

      badge.classList.add('hidden');
      // Hide input area since done
      document.getElementById('bpd-input-area').style.display = 'none';
    }
  }

  /* ── Toggle open/close ── */
  function toggleChat() {
    open = !open;
    win.style.display = open ? 'block' : 'none';
    icoChat.style.display = open ? 'none' : 'block';
    icoX.style.display    = open ? 'block' : 'none';
    bubble.setAttribute('aria-expanded', open);
    if (open) {
      badge.classList.add('hidden');
      if (msgs.childElementCount === 0) startChat();
    }
  }

  bubble.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

  /* ════════════════════════════════════════
     CONTACT FORM → TELEGRAM
     ════════════════════════════════════════ */
  const form = document.querySelector('form.form-grid');
  if (form) {
    const submitBtn = form.querySelector('.form-submit');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name       = (form.querySelector('#name')?.value || '').trim();
      const phone      = (form.querySelector('#phone')?.value || '').trim();
      const suburb     = (form.querySelector('#suburb')?.value || '').trim();
      const lesson     = form.querySelector('#lesson')?.value || '';
      const experience = form.querySelector('#experience')?.value || '';
      const message    = (form.querySelector('#message')?.value || '').trim();

      if (!name || !phone || !suburb) {
        const missing = form.querySelectorAll('[required]');
        missing.forEach(f => {
          if (!f.value.trim()) {
            f.style.borderColor = '#cc2020';
            f.addEventListener('input', () => f.style.borderColor = '', { once: true });
          }
        });
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      const lines = [
        '📋 <b>New BPD Enquiry — Contact Form</b>',
        '',
        '👤 <b>Name:</b> ' + name,
        '📞 <b>Phone:</b> ' + phone,
        '📍 <b>Suburb:</b> ' + suburb,
      ];
      if (lesson)     lines.push('📚 <b>Lesson:</b> ' + lesson);
      if (experience) lines.push('🎓 <b>Experience:</b> ' + experience);
      if (message)    lines.push('💬 <b>Message:</b> ' + message);
      lines.push('', '🕐 ' + new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }));

      await tg(lines.join('\n'));

      // Success state
      const card = form.closest('.form-card') || form.parentElement;
      card.innerHTML = `
        <div style="text-align:center;padding:48px 24px;display:flex;flex-direction:column;align-items:center;gap:16px;">
          <div style="width:56px;height:56px;border-radius:50%;background:#e6f0e9;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="24" height="24" fill="none" stroke="#1a5438" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 style="font-size:22px;color:#111c14;margin:0">Enquiry received!</h3>
          <p style="font-size:15px;color:#4a5e52;max-width:36ch;margin:0">Thanks ${name} — our instructor will call you at <strong style="color:#111c14">${phone}</strong> within 24 hours.<br><br>Need to talk now? Call <a href="tel:+61400000000" style="color:#1a5438;font-weight:700">${TEL}</a></p>
        </div>
      `;
    });
  }

})();
