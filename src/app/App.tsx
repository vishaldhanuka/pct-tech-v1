import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Phone, MessageCircle, Star, CheckCircle, ArrowRight, Bot, Shield, Clock, PhoneCall } from 'lucide-react';

const vetImage = "https://images.unsplash.com/photo-1640161415278-a5ac46f82d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB2ZXRlcmluYXJpYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI2MDAzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// ──────────────────────────────────
// Messaging options — 4 variants of how Pearl is positioned
// Each design tab renders the same layout; the messaging slider changes the copy
// ──────────────────────────────────
type MessagingOption = {
  id: string;
  label: string;
  description: string;
  phone: { subtext: string; badge: string };
  chat: { subtext: string };
  steps?: { phone: [string, string, string]; chat: [string, string, string] };
};

const MESSAGING_OPTIONS: MessagingOption[] = [
  {
    id: 'assistant',
    label: 'Vet Assistant',
    description: '"Pearl, our vet assistant, connects you to the right vet"',
    phone: {
      subtext: 'Pearl, our vet assistant, takes your call — then connects you to the right vet',
      badge: '🐾 Matched to a vet who specializes in your issue',
    },
    chat: {
      subtext: 'Pearl, our vet assistant, gathers details — then matches you with the right vet',
    },
  },
  {
    id: 'triage',
    label: 'Vet-Ready',
    description: '"Pearl gets your details so the right vet is ready for you"',
    phone: {
      subtext: "Pearl, our vet's assistant, answers first — gets details so the right vet is ready for you",
      badge: '✓ Faster help — your vet already knows the situation',
    },
    chat: {
      subtext: "Pearl, our vet's assistant, gathers details so the right vet can jump right in",
    },
  },
  {
    id: 'steps',
    label: '3-Step Flow',
    description: '"Visual 1 → 2 → 3 journey to a licensed vet"',
    phone: {
      subtext: '',
      badge: '✓ All 3 steps happen in one quick call',
    },
    chat: {
      subtext: '',
    },
    steps: {
      phone: ['Pearl, our vet assistant, answers', "Gets your pet's details", 'Connects you to the right vet'],
      chat: ['Pearl, our vet assistant, responds', "Gathers your pet's details", 'Matches you with the right vet'],
    },
  },
  {
    id: 'shortest',
    label: 'Shortest',
    description: '"Ultra-compact one-liner"',
    phone: {
      subtext: 'Pearl (vet assistant) picks up → connects you to the right vet',
      badge: 'Pearl answers instantly — no hold time',
    },
    chat: {
      subtext: 'Pearl (vet assistant) gathers details → matches you with the right vet',
    },
  },
];

// ──────────────────────────────────
// Messaging selector — pill buttons
// ──────────────────────────────────
function MessagingSelector({ value, onChange }: { value: number; onChange: (i: number) => void }) {
  return (
    <div className="mb-4">
      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Messaging variant</p>
      <div className="flex gap-1.5 flex-wrap">
        {MESSAGING_OPTIONS.map((opt, i) => (
          <button
            key={opt.id}
            onClick={() => onChange(i)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border ${
              i === value
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-gray-400 mt-1.5">{MESSAGING_OPTIONS[value].description}</p>
    </div>
  );
}

// ──────────────────────────────────
// Shared components
// ──────────────────────────────────
function VetAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };
  return (
    <img
      src={vetImage}
      alt="Dr. Andy, DVM"
      className={`${sizeClasses[size]} rounded-lg object-cover shadow-md`}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}

function StarRating({ count = 32852 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <span className="text-xs ml-0.5">{count.toLocaleString()} satisfied customers</span>
    </div>
  );
}

// ──────────────────────────────────
// Phone Mockup — 390 × 844 (top US viewport, 13.47% share)
// Covers iPhone 14, 15, 16 standard models
// On small screens (<md) the frame is hidden, content renders full-width
// ──────────────────────────────────
function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile: no frame */}
      <div className="md:hidden w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        {children}
      </div>

      {/* Desktop: device frame */}
      <div className="hidden md:block relative mx-auto" style={{ width: '390px' }}>
        <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)]">
          {/* Dynamic Island */}
          <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-30" />

          {/* Screen — 390 × 844 */}
          <div className="bg-white rounded-[2.4rem] overflow-hidden relative" style={{ height: '844px' }}>
            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 h-[54px] z-20 flex items-end justify-between px-8 pb-1 text-xs font-medium">
              <span className="font-semibold text-[13px]">9:41</span>
              <div className="flex items-center gap-[5px]">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor"/>
                  <rect x="5" y="5" width="3" height="7" rx="0.5" fill="currentColor"/>
                  <rect x="10" y="3" width="3" height="9" rx="0.5" fill="currentColor"/>
                  <rect x="15" y="0" width="3" height="12" rx="0.5" fill="currentColor"/>
                </svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="currentColor"/>
                  <path d="M3.757 7.757a6 6 0 018.486 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M1.515 5.515a9 9 0 0112.97 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                  <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke="currentColor" strokeOpacity="0.35"/>
                  <path d="M24 4.5v4c.8-.4 1.5-1 1.5-2s-.7-1.6-1.5-2z" fill="currentColor" opacity="0.4"/>
                  <rect x="2" y="2" width="19" height="9" rx="2" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="h-full overflow-auto pt-0">
              {children}
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/30 rounded-full" />
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════
// ORIGINAL (Control) — the current live page
// Problems: cluttered, mixed intent, phone buried.
// ═══════════════════════════════════════════════
function OriginalDesign() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-full flex flex-col">
      {/* Dark header */}
      <div className="bg-[#1a3a52] px-4 pt-4 md:pt-14 pb-2.5 flex gap-3 items-start text-white">
        <VetAvatar size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-[16px] font-bold leading-tight">Dr. Andy, DVM</h1>
            <div className="w-[16px] h-[16px] bg-[#1da1f2] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[9px] font-bold">✓</span>
            </div>
          </div>
          <p className="text-[12px] text-white/80 leading-snug mt-0.5">Doctor of Veterinary Medicine, Veterinarian specializing in small animals</p>
        </div>
      </div>

      {/* Availability + rating */}
      <div className="bg-[#1a3a52] px-4 pb-2.5 flex items-center justify-between text-white">
        <div className="flex items-center gap-1.5 text-sm">
          <div className="flex items-center gap-1">
            <MessageCircle className="w-[14px] h-[14px] opacity-80" />
            <Phone className="w-[14px] h-[14px] opacity-80" />
          </div>
          <span className="text-green-400 text-[11px] font-medium">Available</span>
        </div>
        <div className="flex items-center gap-1 text-[11px]">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-[13px] h-[13px] fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-white/80">32,852 satisfied customers</span>
        </div>
      </div>

      {/* Blue divider */}
      <div className="h-[3px] bg-[#3b82f6]" />

      {/* Content */}
      <div className="px-4 pt-3 pb-3 flex-1 flex flex-col">
        <h2 className="text-[20px] font-bold leading-tight mb-2 text-gray-900">
          Chat with a Veterinarian for personalized pet help
        </h2>

        <div className="space-y-1.5 mb-3">
          <div className="flex gap-2 items-start">
            <CheckCircle className="w-[16px] h-[16px] text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-gray-700 leading-snug">Trouble breathing, dog ate chocolate, cat won't eat or drink, and more</p>
          </div>
          <div className="flex gap-2 items-start">
            <CheckCircle className="w-[16px] h-[16px] text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-gray-700 leading-snug">Save hundreds on veterinary support to keep your animal healthy</p>
          </div>
        </div>

        {/* Call-out box */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-center mb-3">
          <p className="text-[13px] text-gray-700">Prefer to talk? Call us at <a href="tel:1-888-967-0099" className="font-bold text-gray-900 underline">1-888-967-0099</a></p>
          <p className="text-[10px] text-gray-500 mt-0.5">(Not for life-threatening emergencies)</p>
        </div>

        {/* Pearl chatbot bubble */}
        <div className="mb-3">
          <p className="text-[10px] text-gray-400 mb-1 ml-10">Pearl Chatbot, Veterinarian's Assistant</p>
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div className="relative bg-[#e8f4fd] px-3 py-2 rounded-2xl rounded-bl-md max-w-[85%]">
              <p className="text-[13px] text-gray-800 leading-snug">Welcome! What's going on with your pet or animal?</p>
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="space-y-2 mt-auto">
          <textarea
            placeholder="Ask your question..."
            rows={2}
            className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl text-[13px] resize-none focus:outline-none focus:border-blue-400 transition-colors"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="w-[6px] h-[6px] bg-green-500 rounded-full"></span>
              <span className="text-gray-500">Veterinarians are online now</span>
            </div>
            <a href="#" className="text-[11px] text-blue-500 underline">How to use JustAnswer</a>
          </div>
          <button className="w-full bg-[#e8573a] hover:bg-[#d14a2f] text-white py-3 px-6 rounded-lg font-semibold text-[14px] transition-colors shadow-sm">
            Start chat
          </button>
          <a
            href="tel:1-888-967-0099"
            className="flex items-center justify-center gap-2 w-full bg-[#fdf2f0] border-2 border-[#e8573a]/30 py-2.5 px-4 rounded-lg transition-colors hover:bg-[#fce8e4]"
          >
            <Phone className="w-4 h-4 text-[#e8573a]" />
            <span className="text-[13px] font-semibold text-[#c0392b]">Need a Vet Now? Call <span className="text-[#2563eb] underline">1-888-967-0099</span></span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// DESIGN A: Intent Router
// Clean fork — "How would you like to get help?"
// ═══════════════════════════════════════════════
function IntentRouterDesign({ messaging }: { messaging: MessagingOption }) {
  return (
    <div className="max-w-md mx-auto bg-white min-h-full flex flex-col">
      {/* Header */}
      <div className="bg-[#1a3a52] px-4 pt-5 md:pt-14 pb-3 text-white">
        <div className="flex gap-3 items-center">
          <VetAvatar size="sm" />
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-[15px] font-bold">Dr. Andy, DVM</h1>
              <div className="w-[15px] h-[15px] bg-[#1da1f2] rounded-full flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">✓</span>
              </div>
              <span className="text-green-400 text-[10px] font-medium ml-1">● Available</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-white/60">32,852 reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-6 pb-4 flex-1 flex flex-col">
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-gray-900 mb-1.5 leading-tight">
            Worried about your pet?
          </h2>
          <p className="text-[14px] text-gray-500">
            A licensed vet is ready to help right now
          </p>
        </div>

        <p className="text-[13px] font-semibold text-gray-700 text-center mb-4">How would you like to get help?</p>

        {/* Option 1: Call — visually dominant */}
        <a
          href="tel:1-888-967-0099"
          className="group flex items-center gap-4 bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white p-4 rounded-2xl shadow-lg mb-3 relative overflow-hidden transition-all hover:shadow-xl"
        >
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full border-2 border-white/10" />
          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <PhoneCall className="w-7 h-7" />
          </div>
          <div className="flex-1 relative z-10">
            <h3 className="font-bold text-[16px] mb-0.5">Prefer to talk?</h3>
            <p className="text-green-100 text-[13px] font-semibold">1-888-967-0099</p>
            {messaging.steps ? (
              <div className="mt-1 space-y-0.5">
                {messaging.steps.phone.map((step, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-[14px] h-[14px] rounded-full bg-white/20 flex items-center justify-center text-[8px] font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-green-100 text-[11px]">{step}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-100 text-[11px] mt-0.5">{messaging.phone.subtext}</p>
            )}
          </div>
          <ArrowRight className="w-5 h-5 text-white/50 flex-shrink-0 relative z-10" />
        </a>

        <div className="flex items-center gap-2 ml-2 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[11px] text-green-700 font-medium">{messaging.phone.badge}</span>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Option 2: Chat — secondary */}
        <button className="group flex items-center gap-4 border border-gray-200 bg-gray-50 text-gray-800 p-4 rounded-2xl transition-all hover:bg-gray-100 hover:border-gray-300 mb-6">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <MessageCircle className="w-7 h-7 text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-bold text-[16px] mb-0.5">Prefer to type?</h3>
            {messaging.steps ? (
              <div className="mt-0.5 space-y-0.5">
                {messaging.steps.chat.map((step, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="w-[14px] h-[14px] rounded-full bg-blue-200 flex items-center justify-center text-[8px] font-bold text-blue-700 flex-shrink-0">{i + 1}</span>
                    <span className="text-gray-500 text-[11px]">{step}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-[12px]">{messaging.chat.subtext}</p>
            )}
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
        </button>

        {/* Trust strip */}
        <div className="mt-auto space-y-2">
          <div className="flex gap-2 items-center">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <p className="text-[12px] text-gray-600">Trouble breathing, poisoning, loss of appetite & more</p>
          </div>
          <div className="flex gap-2 items-center">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <p className="text-[12px] text-gray-600">Save hundreds compared to an in-person emergency visit</p>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">(Not for life-threatening emergencies)</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// DESIGN B: Preference Router
// "🗣️ Prefer to talk" / "⌨️ Prefer to type"
// Targets older demographics who don't like typing
// ═══════════════════════════════════════════════
function PreferenceRouterDesign({ messaging }: { messaging: MessagingOption }) {
  return (
    <div className="max-w-md mx-auto bg-white min-h-full flex flex-col">
      {/* Header */}
      <div className="bg-[#1a3a52] px-4 pt-5 md:pt-14 pb-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex gap-2.5 items-center">
            <VetAvatar size="sm" />
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-[15px] font-bold">Dr. Andy, DVM</h1>
                <div className="w-[15px] h-[15px] bg-[#1da1f2] rounded-full flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">✓</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-white/60">32,852</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 rounded-full px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-[10px] text-green-300 font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-5 pb-4 flex-1 flex flex-col">
        <h2 className="text-[22px] font-bold text-gray-900 mb-1.5 leading-tight">
          What's going on with<br/>your pet?
        </h2>
        <p className="text-[13px] text-gray-500 mb-6">
          Help is available right now — choose how you'd like to connect
        </p>

        {/* TALK path — Call */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-green-200">
              🗣️ Prefer to talk
            </span>
            <span className="text-[12px] text-gray-500">Don't like typing? Just call us</span>
          </div>
          <a
            href="tel:1-888-967-0099"
            className="flex items-center gap-3 bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white p-4 rounded-2xl shadow-lg relative overflow-hidden transition-all hover:shadow-xl"
          >
            <div className="absolute -right-3 -top-3 w-20 h-20 rounded-full border-2 border-white/10" />
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div className="flex-1 relative z-10">
              <p className="text-[14px] font-bold mb-0.5">Prefer to talk? Call us</p>
              <p className="text-[18px] font-bold tracking-wide">1-888-967-0099</p>
              {messaging.steps ? (
                <div className="mt-1 space-y-0.5">
                  {messaging.steps.phone.map((step, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-[14px] h-[14px] rounded-full bg-white/20 flex items-center justify-center text-[8px] font-bold flex-shrink-0">{i + 1}</span>
                      <span className="text-green-200 text-[11px]">{step}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-green-200 text-[11px] mt-0.5">{messaging.phone.subtext}</p>
              )}
            </div>
            <ArrowRight className="w-5 h-5 text-white/50 flex-shrink-0 relative z-10" />
          </a>
        </div>

        {/* TYPE path — Chat */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-blue-200">
              ⌨️ Prefer to type
            </span>
            <span className="text-[12px] text-gray-500">More comfortable typing? Start a chat</span>
          </div>
          <button className="flex items-center gap-3 w-full border border-gray-200 bg-gray-50 text-gray-800 p-4 rounded-2xl transition-all hover:bg-gray-100 hover:border-gray-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[14px] font-bold mb-0.5">Prefer to type? Chat with us</p>
              {messaging.steps ? (
                <div className="mt-0.5 space-y-0.5">
                  {messaging.steps.chat.map((step, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="w-[14px] h-[14px] rounded-full bg-blue-200 flex items-center justify-center text-[8px] font-bold text-blue-700 flex-shrink-0">{i + 1}</span>
                      <span className="text-gray-500 text-[11px]">{step}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-[12px]">{messaging.chat.subtext}</p>
              )}
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
          </button>
        </div>

        {/* Trust strip */}
        <div className="mt-auto bg-gray-50 border border-gray-100 rounded-xl p-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-green-100 flex items-center justify-center">
                <Clock className="w-4 h-4 text-green-700" />
              </div>
              <p className="text-[11px] font-semibold text-gray-900">&lt;2 min</p>
              <p className="text-[10px] text-gray-500">Response</p>
            </div>
            <div>
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-700" />
              </div>
              <p className="text-[11px] font-semibold text-gray-900">Licensed</p>
              <p className="text-[10px] text-gray-500">Verified vets</p>
            </div>
            <div>
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-amber-100 flex items-center justify-center">
                <Star className="w-4 h-4 text-amber-700" />
              </div>
              <p className="text-[11px] font-semibold text-gray-900">32,852</p>
              <p className="text-[10px] text-gray-500">Happy clients</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">(Not for life-threatening emergencies)</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// RECOMMENDED: Streamlined Hybrid
// Call is hero CTA. Chat accessible but secondary.
// Pearl AI = vet's assistant who connects to the right vet.
// ═══════════════════════════════════════════════
function RecommendedDesign({ messaging }: { messaging: MessagingOption }) {
  return (
    <div className="max-w-md mx-auto bg-white min-h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1a3a52] to-[#1e4562] px-4 pt-5 md:pt-14 pb-4 text-white">
        <div className="flex gap-3 items-start">
          <VetAvatar size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-[16px] font-bold">Dr. Andy, DVM</h1>
              <div className="w-[16px] h-[16px] bg-[#1da1f2] rounded-full flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">✓</span>
              </div>
            </div>
            <p className="text-[11px] text-white/70 mt-0.5">Licensed Veterinarian • Small animals</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-white/60 ml-0.5">32,852 satisfied customers</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 rounded-full px-2.5 py-1 flex-shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-[10px] text-green-300 font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-4 pb-4 flex-1 flex flex-col">
        <h2 className="text-[21px] font-bold text-gray-900 mb-1.5 leading-tight">
          Get personalized help<br/>for your pet — now
        </h2>
        <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">
          Trouble breathing, poisoning, won't eat or drink, unusual behavior & more
        </p>

        {/* Benefit pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-green-200">
            <Clock className="w-3 h-3" />
            Avg. wait &lt;2 min
          </span>
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-blue-200">
            <Shield className="w-3 h-3" />
            Licensed vets only
          </span>
          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-purple-200">
            <CheckCircle className="w-3 h-3" />
            Save hundreds
          </span>
        </div>

        {/* PRIMARY: Call CTA */}
        <a
          href="tel:1-888-967-0099"
          className="flex items-center gap-3 bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white p-4 rounded-2xl shadow-lg mb-2 relative overflow-hidden transition-all hover:shadow-xl"
        >
          <div className="absolute -right-3 -top-3 w-20 h-20 rounded-full border-2 border-white/10" />
          <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0 relative z-10">
            <p className="text-[12px] text-green-100">Prefer to talk?</p>
            <p className="text-[20px] font-bold tracking-wide">1-888-967-0099</p>
            {messaging.steps ? (
              <div className="mt-1 space-y-0.5">
                {messaging.steps.phone.map((step, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-[14px] h-[14px] rounded-full bg-white/20 flex items-center justify-center text-[8px] font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-green-100 text-[10px]">{step}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-100 text-[10px] mt-0.5">{messaging.phone.subtext}</p>
            )}
          </div>
          <ArrowRight className="w-6 h-6 text-white/50 flex-shrink-0 relative z-10" />
        </a>

        <div className="flex items-center gap-2 mb-5 ml-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[11px] text-green-700 font-medium">{messaging.phone.badge}</span>
          <span className="text-[10px] text-gray-400 ml-1">(Not for life-threatening emergencies)</span>
        </div>

        {/* SECONDARY: Chat */}
        <div className="border border-gray-200 rounded-xl p-3.5 bg-gray-50/70 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-gray-900">Prefer to type?</p>
              {messaging.steps ? (
                <div className="space-y-0.5">
                  {messaging.steps.chat.map((step, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="w-[14px] h-[14px] rounded-full bg-blue-100 flex items-center justify-center text-[8px] font-bold text-blue-600 flex-shrink-0">{i + 1}</span>
                      <span className="text-gray-500 text-[10px]">{step}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-gray-500">{messaging.chat.subtext}</p>
              )}
            </div>
            <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-[12px] font-medium transition-colors flex-shrink-0">
              Start chat
            </button>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-auto">
          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <div className="flex -space-x-2 flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-green-800">S</div>
                <div className="w-7 h-7 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-800">M</div>
                <div className="w-7 h-7 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-purple-800">J</div>
              </div>
              <div className="flex-1">
                <p className="text-[12px] text-gray-800 leading-snug">
                  <span className="font-semibold">847 pet owners</span> connected with a vet today
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">"Got answers in minutes — saved us a $400 ER visit" — Sarah K.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// App Shell
// ═══════════════════════════════════════════════
export default function App() {
  const [activeTab, setActiveTab] = useState('recommended');
  const [msgIdx, setMsgIdx] = useState(0);
  const messaging = MESSAGING_OPTIONS[msgIdx];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-3 md:px-4">
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-gray-900">Veterinary Landing Page — Design Options</h1>
          <p className="text-gray-500 text-[13px] md:text-[15px]">Solving for <strong>low call volume</strong> (cluttered layout) and <strong>mixed intent</strong> (call vs. chat confusion)</p>
          <p className="text-gray-400 text-[11px] mt-1">Viewport: 390 × 844 — #1 US screen resolution (13.47% market share) • Phone = Pearl AI answers first</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto -mx-3 px-3 md:mx-0 md:px-0 mb-4 md:mb-8">
            <TabsList className="inline-flex w-max md:grid md:w-full md:grid-cols-4 gap-1">
              <TabsTrigger value="recommended" className="text-[12px] md:text-[13px] whitespace-nowrap">⭐ Recommended</TabsTrigger>
              <TabsTrigger value="original" className="text-[12px] md:text-[13px] whitespace-nowrap">Original (Control)</TabsTrigger>
              <TabsTrigger value="intent-router" className="text-[12px] md:text-[13px] whitespace-nowrap">Intent Router</TabsTrigger>
              <TabsTrigger value="preference" className="text-[12px] md:text-[13px] whitespace-nowrap">Preference Router</TabsTrigger>
            </TabsList>
          </div>

          {/* RECOMMENDED */}
          <TabsContent value="recommended">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              <div className="flex-1 bg-white rounded-2xl shadow-lg p-3 md:p-6">
                <div className="mb-4">
                  <span className="inline-block bg-amber-100 text-amber-800 text-[12px] font-semibold px-3 py-1 rounded-full mb-2">⭐ RECOMMENDED</span>
                  <h2 className="text-xl font-semibold mb-1">Streamlined Hybrid</h2>
                  <p className="text-gray-500 text-sm">Call is the hero CTA. Chat is accessible but clearly secondary. Pearl AI = vet's assistant who connects to the right vet.</p>
                </div>
                <MessagingSelector value={msgIdx} onChange={setMsgIdx} />
                <PhoneMockup>
                  <RecommendedDesign messaging={messaging} />
                </PhoneMockup>
              </div>
              <div className="lg:w-80 space-y-4">
                <div className="bg-white rounded-2xl shadow-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 text-[15px]">Why this design?</h3>
                  <ul className="space-y-2 text-[13px] text-gray-600">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><strong>Solves clutter:</strong> No chatbot bubble, no textarea, no competing CTAs on first view</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><strong>Solves mixed intent:</strong> Call is the primary action — chat is opt-in secondary</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><strong>Accurate:</strong> Pearl is positioned as the vet's assistant, not a replacement</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />Benefit pills scannable in &lt;2 seconds</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />Chat still accessible — preserves chat revenue</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                  <h3 className="font-semibold text-green-900 mb-2 text-[15px]">Expected impact</h3>
                  <div className="space-y-2 text-[13px] text-green-800">
                    <p>📞 <strong>+40-60%</strong> call tap rate (hero CTA, no competing action)</p>
                    <p>💬 <strong>-10-15%</strong> chat starts (trade-off, but net revenue gain)</p>
                    <p>⚡ <strong>Faster</strong> time-to-action (cleaner visual hierarchy)</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ORIGINAL */}
          <TabsContent value="original">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              <div className="flex-1 bg-white rounded-2xl shadow-lg p-3 md:p-6">
                <div className="mb-4">
                  <span className="inline-block bg-red-100 text-red-800 text-[12px] font-semibold px-3 py-1 rounded-full mb-2">CONTROL</span>
                  <h2 className="text-xl font-semibold mb-1">Original Design (Current)</h2>
                  <p className="text-gray-500 text-sm">The live page today. Chat-focused, phone number buried as secondary text link.</p>
                </div>
                <PhoneMockup>
                  <OriginalDesign />
                </PhoneMockup>
              </div>
              <div className="lg:w-80">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                  <h3 className="font-semibold text-red-900 mb-3 text-[15px]">🔴 Why this isn't working</h3>
                  <ul className="space-y-2 text-[13px] text-red-800">
                    <li className="flex gap-2"><span className="text-red-500">✗</span><strong>Cluttered:</strong> 9+ elements competing for attention above fold</li>
                    <li className="flex gap-2"><span className="text-red-500">✗</span><strong>Mixed intent:</strong> Heading says "Chat", body mentions phone 3×, chatbot bubble, textarea — user doesn't know what to do</li>
                    <li className="flex gap-2"><span className="text-red-500">✗</span><strong>Phone buried:</strong> Number is plain text in a gray box — zero CTA energy</li>
                    <li className="flex gap-2"><span className="text-red-500">✗</span><strong>Chat dominates:</strong> Textarea + chatbot + "Start chat" button take 40%+ of viewport</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* INTENT ROUTER */}
          <TabsContent value="intent-router">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              <div className="flex-1 bg-white rounded-2xl shadow-lg p-3 md:p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-1">Intent Router</h2>
                  <p className="text-gray-500 text-sm">Clean fork: "How would you like to get help?" — forces user to choose, call biased.</p>
                </div>
                <MessagingSelector value={msgIdx} onChange={setMsgIdx} />
                <PhoneMockup>
                  <IntentRouterDesign messaging={messaging} />
                </PhoneMockup>
              </div>
              <div className="lg:w-80 space-y-4">
                <div className="bg-white rounded-2xl shadow-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 text-[15px]">Design rationale</h3>
                  <ul className="space-y-2 text-[13px] text-gray-600">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><strong>Solves mixed intent:</strong> Forces a choice upfront — no ambiguity</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><strong>Call-biased:</strong> Green gradient + top position nudge toward phone</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><strong>Honest framing:</strong> Pearl positioned as assistant, not a gatekeeper</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />Chat stays equal in affordance — preserves chat revenue</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                  <h3 className="font-semibold text-blue-900 mb-2 text-[15px]">Best for</h3>
                  <p className="text-[13px] text-blue-800">Use when you want to increase calls but <strong>can't afford to lose any chat volume</strong>. Both paths are respected.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* PREFERENCE ROUTER */}
          <TabsContent value="preference">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              <div className="flex-1 bg-white rounded-2xl shadow-lg p-3 md:p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-1">Preference Router</h2>
                  <p className="text-gray-500 text-sm">"🗣️ Prefer to talk → Call" / "⌨️ Prefer to type → Chat". Targets older demographics who don't like typing.</p>
                </div>
                <MessagingSelector value={msgIdx} onChange={setMsgIdx} />
                <PhoneMockup>
                  <PreferenceRouterDesign messaging={messaging} />
                </PhoneMockup>
              </div>
              <div className="lg:w-80 space-y-4">
                <div className="bg-white rounded-2xl shadow-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-3 text-[15px]">Design rationale</h3>
                  <ul className="space-y-2 text-[13px] text-gray-600">
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><strong>Self-segmenting:</strong> User picks their preferred communication style</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><strong>Demographic targeting:</strong> "Prefer to talk" resonates with older US users who dislike typing</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><strong>Trust strip:</strong> Bottom grid adds credibility without clutter</li>
                    <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /><strong>Honest:</strong> Pearl clearly positioned as vet's assistant</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                  <h3 className="font-semibold text-green-900 mb-2 text-[15px]">Expected behavior</h3>
                  <p className="text-[13px] text-green-800">Older demographics (55+) strongly prefer speaking over typing. This design should naturally route them to phone while keeping younger users on chat.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Analysis */}
        <div className="mt-6 md:mt-8 bg-white rounded-2xl shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-5 text-gray-900">Analysis & A/B Testing Strategy</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 text-[13px] text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 text-[14px]">🔴 Root cause analysis</h3>
              <p className="font-medium text-gray-800 mb-1.5">Clutter (low calls):</p>
              <ul className="list-disc ml-4 space-y-1 mb-3">
                <li>9+ visual elements competing above fold</li>
                <li>No clear visual hierarchy — eye has no anchor</li>
                <li>Phone number repeated 3× but always as secondary text</li>
              </ul>
              <p className="font-medium text-gray-800 mb-1.5">Mixed intent (confusion):</p>
              <ul className="list-disc ml-4 space-y-1 mb-3">
                <li>H1 says "Chat" but body pushes phone</li>
                <li>Chatbot + textarea + Start Chat dominate viewport</li>
                <li>User sees two paths with equal weight → decision paralysis</li>
              </ul>
              <p className="font-medium text-gray-800 mb-1.5">Key constraint:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Phone calls go to <strong>Pearl AI first</strong> (vet's assistant), not directly to a vet</li>
                <li>Pearl gathers details, then connects to the <strong>right</strong> licensed vet</li>
                <li>Phone positioned for people who don't like typing (older US demographics)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 text-[14px]">🟢 Recommended test order</h3>
              <p className="mb-2"><strong>Pick a messaging variant first, then A/B design.</strong></p>
              <ol className="list-decimal ml-4 space-y-1.5">
                <li><strong>Week 1-2:</strong> Recommended vs. Original (50/50)
                  <br/><span className="text-gray-500">Measure: call tap rate, chat starts, overall conversion</span></li>
                <li><strong>Week 3-4:</strong> Winner vs. Intent Router
                  <br/><span className="text-gray-500">Tests whether explicit choice framing performs better</span></li>
                <li><strong>Week 5-6:</strong> Winner vs. Preference Router
                  <br/><span className="text-gray-500">Tests whether "prefer to talk/type" segmentation lifts call rate</span></li>
              </ol>
              <p className="mt-3 text-[12px] text-gray-500">Run messaging variants as a <strong>separate</strong> A/B test on the winning design to find the best copy.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 text-[14px]">📊 Key metrics to track</h3>
              <ul className="list-disc ml-4 space-y-1.5">
                <li><strong>Call tap rate</strong> — primary success metric</li>
                <li><strong>Chat start rate</strong> — monitor for cannibalization</li>
                <li><strong>Bounce rate</strong> — clutter reduction should lower this</li>
                <li><strong>Time to first action</strong> — cleaner design = faster decisions</li>
                <li><strong>Revenue per session</strong> — ultimate arbiter</li>
                <li><strong>Demographic split</strong> — call rate by age cohort (55+ vs younger)</li>
              </ul>
              <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-[12px] text-gray-600"><strong>Viewport note:</strong> All designs sized for <strong>390 × 844</strong> — the #1 US screen resolution (13.47% share, Feb 2025 – Feb 2026). Covers iPhone 14, 15, and 16 standard models.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
