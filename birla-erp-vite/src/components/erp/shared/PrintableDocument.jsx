import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Printer, MessageSquare, Mail, X, Download, Check, Copy, Share2 } from 'lucide-react'

/**
 * PrintableDocument - Reusable component for generating printable documents
 * with WhatsApp & Email sharing options.
 * 
 * Used across: Fee Receipts, Marksheets, TCs, ID Cards, Payslips, etc.
 * 
 * Props:
 * - isOpen: boolean - whether the modal is open
 * - onClose: () => void - close handler
 * - title: string - document title
 * - documentId: string - receipt/certificate ID
 * - recipientName: string - student/teacher name
 * - recipientPhone: string - phone for WhatsApp
 * - recipientEmail: string - email for sharing
 * - children: ReactNode - the printable content
 * - schoolName: string - school name for header
 */

export default function PrintableDocument({
  isOpen,
  onClose,
  title = 'Document',
  documentId = '',
  recipientName = '',
  recipientPhone = '',
  recipientEmail = '',
  children,
  schoolName = 'Birla Open Minds International School, Singur',
}) {
  const printRef = useRef(null)
  const [shareMode, setShareMode] = useState(null) // 'whatsapp' | 'email' | null
  const [emailTo, setEmailTo] = useState(recipientEmail)
  const [phoneTo, setPhoneTo] = useState(recipientPhone)
  const [shareSent, setShareSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const handlePrint = () => {
    const printContent = printRef.current
    if (!printContent) return

    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title} - ${documentId}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; color: #1e293b; }
          .school-header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #0A1628; padding-bottom: 15px; }
          .school-header h1 { font-size: 18px; margin: 0; color: #0A1628; }
          .school-header p { font-size: 11px; margin: 2px 0; color: #64748b; }
          .doc-title { text-align: center; font-size: 16px; font-weight: 700; margin: 15px 0; padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { padding: 6px 10px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 12px; }
          th { background: #f1f5f9; font-weight: 600; }
          .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 10px; text-align: center; color: #94a3b8; }
          .signatures { display: flex; justify-content: space-between; margin-top: 40px; }
          .sig-box { text-align: center; width: 200px; }
          .sig-line { border-top: 1px solid #1e293b; margin-top: 40px; padding-top: 5px; font-size: 11px; }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; }
          .badge-paid { background: #dcfce7; color: #166534; }
          .badge-pending { background: #fef3c7; color: #92400e; }
          .amount-highlight { font-size: 18px; font-weight: 700; color: #0A1628; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
        <script>window.onload = function() { window.print(); window.close(); }<\/script>
      </body>
      </html>
    `)
    printWindow.document.close()
  }

  const handleWhatsAppShare = () => {
    const phone = phoneTo.replace(/\D/g, '')
    const message = encodeURIComponent(
      `📄 *${title}*\n` +
      `School: ${schoolName}\n` +
      `Document ID: ${documentId}\n` +
      `Recipient: ${recipientName}\n\n` +
      `This is a system-generated document from Birla Open Minds ERP.`
    )
    const url = phone
      ? `https://wa.me/91${phone}?text=${message}`
      : `https://wa.me/?text=${message}`
    window.open(url, '_blank')
    setShareSent(true)
    setTimeout(() => setShareSent(false), 3000)
  }

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`${title} - ${documentId} | ${schoolName}`)
    const body = encodeURIComponent(
      `Dear Parent/Guardian,\n\n` +
      `Please find below the details of ${title}:\n\n` +
      `Document ID: ${documentId}\n` +
      `Student: ${recipientName}\n` +
      `School: ${schoolName}\n\n` +
      `This is a system-generated document from Birla Open Minds ERP + LMS.\n\n` +
      `Best regards,\nBirla Open Minds International School, Singur`
    )
    window.open(`mailto:${emailTo}?subject=${subject}&body=${body}`, '_blank')
    setShareSent(true)
    setTimeout(() => setShareSent(false), 3000)
  }

  const handleCopyId = () => {
    navigator.clipboard?.writeText(documentId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="gradient-birla p-4 flex items-center justify-between no-print">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-birla-gold/20 flex items-center justify-center">
                <Printer className="w-5 h-5 text-birla-gold" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{title}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-birla-cyan/60 font-mono">{documentId}</span>
                  <button onClick={handleCopyId} className="text-birla-cyan/40 hover:text-birla-cyan/80 transition-colors">
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Document Content (Printable Area) */}
          <div className="flex-1 overflow-y-auto p-6">
            <div ref={printRef} className="receipt-print">
              {children}
            </div>
          </div>

          {/* Action Bar */}
          <div className="border-t border-border p-4 bg-muted/30 no-print">
            <div className="flex flex-wrap items-center gap-2">
              {/* Print */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-birla text-white text-sm font-medium hover:opacity-90 transition-all shadow-md"
              >
                <Printer className="w-4 h-4" /> Print
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => setShareMode(shareMode === 'whatsapp' ? null : 'whatsapp')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  shareMode === 'whatsapp'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </button>

              {/* Email */}
              <button
                onClick={() => setShareMode(shareMode === 'email' ? null : 'email')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  shareMode === 'email'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                }`}
              >
                <Mail className="w-4 h-4" /> Email
              </button>

              {/* Download PDF */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-all"
              >
                <Download className="w-4 h-4" /> Save PDF
              </button>

              {shareSent && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1 text-emerald-600 text-xs font-medium"
                >
                  <Check className="w-3.5 h-3.5" /> Shared successfully!
                </motion.span>
              )}
            </div>

            {/* WhatsApp Share Panel */}
            <AnimatePresence>
              {shareMode === 'whatsapp' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
                >
                  <p className="text-xs font-medium text-emerald-700 mb-2">Send via WhatsApp</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={phoneTo}
                      onChange={(e) => setPhoneTo(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="flex-1 px-3 py-2 rounded-lg border border-emerald-500/20 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                    <button
                      onClick={handleWhatsAppShare}
                      className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Share Panel */}
            <AnimatePresence>
              {shareMode === 'email' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 p-3 rounded-xl border border-blue-500/20 bg-blue-500/5"
                >
                  <p className="text-xs font-medium text-blue-700 mb-2">Send via Email</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                      placeholder="parent@email.com"
                      className="flex-1 px-3 py-2 rounded-lg border border-blue-500/20 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                    <button
                      onClick={handleEmailShare}
                      className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
