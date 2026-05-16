import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Send, Mic, Bot, User } from 'lucide-react'
import { useState } from 'react'
import useAppStore from '../../../store/useAppStore'

const suggestions = [
  'Show attendance trends for this week',
  'How many fee defaults pending?',
  'Generate student performance report',
  'NEP 2020 compliance status',
]

export default function AIAssistant() {
  const { aiAssistantOpen, setAiAssistantOpen } = useAppStore()
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I\'m your Birla Open Minds AI Assistant. I can help with student data, attendance analytics, fee reports, NEP compliance, and more. How can I help you today?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: input }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'I\'ve analyzed your request. Based on the current data, here are the key insights. The attendance rate this week is 94.2%, up 1.5% from last week. Fee collection is at 87% for the current quarter. Would you like me to generate a detailed report?'
      }])
    }, 1500)
  }

  return (
    <AnimatePresence>
      {aiAssistantOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 w-[380px] max-h-[500px] rounded-2xl bg-card border border-border shadow-2xl flex flex-col overflow-hidden z-50"
        >
          {/* Header */}
          <div className="gradient-birla p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-birla-gold/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-birla-gold" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Birla AI Assistant</h3>
                <p className="text-[10px] text-birla-cyan/60">Smart Campus Intelligence</p>
              </div>
            </div>
            <button onClick={() => setAiAssistantOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[300px]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full gradient-birla flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-birla-gold" />
                  </div>
                )}
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-birla-gold/15 text-foreground'
                    : 'bg-muted text-foreground'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => { setInput(s) }}
                  className="px-2 py-1 rounded-lg bg-birla-gold/8 border border-birla-gold/15 text-[10px] text-foreground hover:bg-birla-gold/15 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything about your school data..."
                className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-birla-gold/40"
              />
              <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                <Mic className="w-4 h-4" />
              </button>
              <button
                onClick={handleSend}
                className="p-2 rounded-lg gradient-birla text-white hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
