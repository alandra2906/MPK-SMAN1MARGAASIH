import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Pendaftaran() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(false) // Set default false agar tidak menutupi tampilan

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <motion.div
      className="min-h-screen bg-[#f8fafc] pt-20 pb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-goldenrod text-xs font-mono-data uppercase tracking-wider mb-4">
            <span className="w-8 h-[2px] bg-goldenrod" />
            Pendaftaran Anggota
            <span className="w-8 h-[2px] bg-goldenrod" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-green">
            Form Pendaftaran Calon Pengurus MPK
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Isi formulir pendaftaran di bawah ini untuk mengikuti seleksi pengurus MPK Periode 2026/2027.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 min-h-[800px] bg-white">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                  <div className="w-10 h-10 border-4 border-slate-100 border-t-goldenrod rounded-full animate-spin mb-4"></div>
                  <p className="text-xs font-mono-data text-slate-500 uppercase tracking-widest animate-pulse">
                    Memuat Formulir...
                  </p>
                </div>
              )}

              <iframe
                ref={iframeRef}
                title="Form Pendaftaran Anggota MPK"
                src="https://docs.google.com/forms/d/e/1FAIpQLSdmQuGPmFR4k_wRGXKjgDWgW2lDLJy2T5MT50rJEtGp_XqUiQ/viewform?embedded=true"
                className="w-full h-[800px] border-0"
                onLoad={() => setIsLoading(false)}
                frameBorder={0}
                aria-label="Form Pendaftaran Anggota MPK"
              >
                <p className="p-6 text-slate-500 text-center">
                  Browser Anda tidak mendukung iframe. Silakan{' '}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdmQuGPmFR4k_wRGXKjgDWgW2lDLJy2T5MT50rJEtGp_XqUiQ/viewform?embedded=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-goldenrod hover:underline font-medium"
                  >
                    klik di sini
                  </a>{' '}
                  untuk mengakses formulir.
                </p>
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}