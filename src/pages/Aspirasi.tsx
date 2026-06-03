import { useState, useEffect, useRef } from 'react'
import { MessageSquare, Send, ExternalLink } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'

export default function Aspirasi() {
  const [activeTab, setActiveTab] = useState<'gmya' | 'form' | 'angket'>('gmya')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const angketIframeRef = useRef<HTMLIFrameElement>(null)
  const [isAngketLoading, setIsAngketLoading] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Logic from Zoho script to handle referrer tracking
  useEffect(() => {
    if (activeTab === 'form' && iframeRef.current) {
      try {
        const zf_frame = iframeRef.current
        let ifrmSrc = zf_frame.src

        if (!/([?&])referrername=/.test(ifrmSrc)) {
          let rfr = window.location.href
          
          try {
            rfr =
              window.self !== window.top && window.top != null
                ? window.top.location.href
                : /^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}/i.test(rfr)
                  ? rfr
                  : ''
          } catch (e) { }

          if (rfr && rfr !== "") {
            if (rfr.length > 1800) {
              const queryIndex = rfr.indexOf('?')
              rfr = queryIndex > -1 ? rfr.substring(0, queryIndex) : rfr
              rfr = rfr.substring(0, 1800)
            }
            ifrmSrc += (ifrmSrc.includes('?') ? '&' : '?') + 'referrername=' + encodeURIComponent(rfr)
          }
        }
        if (zf_frame.src !== ifrmSrc) {
          setIsLoading(true)
          zf_frame.src = ifrmSrc
        }
      } catch (e) { }
    }
  }, [activeTab])

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 pb-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 text-goldenrod text-xs font-mono-data uppercase tracking-wider mb-4">
            <span className="w-8 h-[2px] bg-goldenrod" />
            Wadah Aspirasi
            <span className="w-8 h-[2px] bg-goldenrod" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-green">
            Sampaikan Aspirasimu
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Setiap suara berarti. Gunakan program GMYA untuk menyampaikan ide,
            kritik, dan saran demi sekolah yang lebih baik.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-lg h-auto">
              <TabsTrigger
                value="gmya"
                className="px-6 py-2.5 text-sm data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md"
              >
                <MessageSquare size={16} className="mr-2" />
                Apa itu GMYA
              </TabsTrigger>
              <TabsTrigger
                value="form"
                className="px-6 py-2.5 text-sm data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md"
              >
                <Send size={16} className="mr-2" />
                Form Aspirasi
              </TabsTrigger>
              <TabsTrigger
                value="angket"
                className="px-6 py-2.5 text-sm data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md"
              >
                <ExternalLink size={16} className="mr-2" />
                Angket Pemilihan
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Apa itu GMYA */}
          <AnimatePresence mode="wait">
            {activeTab === 'gmya' && (
              <motion.div
                key="gmya-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vanilla text-goldenrod text-xs font-semibold uppercase tracking-wider mb-4">
                    Program Unggulan
                  </div>
                  <h2 className="text-3xl font-bold text-dark-green mb-4">
                    GMYA (Give Me Your Aspiration)
                  </h2>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p>
                      <strong className="text-dark-green">GMYA (Give Me Your Aspiration)</strong>{' '}
                      adalah salah satu program kerja unggulan komisi 1 yang dirancang
                      menjadi wadah bagi seluruh siswa untuk menyampaikan aspirasi,
                      kritik, saran, dan masukan terkait sekolah secara
                      transparan dan terstruktur.
                    </p>
                    <p>
                      Melalui GMYA, siswa dapat menyampaikan berbagai hal mulai dari
                      fasilitas sekolah, kebijakan akademik, kegiatan ekstrakurikuler,
                      hingga kesejahteraan siswa lainnya. Setiap aspirasi yang masuk
                      akan ditindaklanjuti oleh komisi terkait dan diberikan
                      respons yang jelas.
                    </p>
                    <p>
                      Program ini mencerminkan komitmen MPK untuk mendengarkan
                      setiap suara siswa dan mengubahnya menjadi aksi nyata demi
                      perbaikan berkelanjutan di lingkungan sekolah.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-goldenrod" />
                      Aspirasi Transparan
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-goldenrod" />
                      Tindak Lanjut Jelas
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-goldenrod" />
                      Akses untuk Semua Siswa
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('form')}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-dark-green hover:bg-cal-poly text-white font-semibold rounded-md transition-all hover:scale-[1.02]"
                  >
                    Isi Form Aspirasi Sekarang
                    <ExternalLink size={16} />
                  </button>
                </div>

                {/* Right: Image */}
                <div className="relative order-first lg:order-none">
                  <div className="absolute -inset-4 bg-gold/5 rounded-2xl blur-2xl" />
                  <img
                    src="/images/GMYA.webp"
                    loading="lazy"
                    alt="GMYA Program"
                    className="relative rounded-xl shadow-lg w-full h-auto object-contain"
                  />
                </div>
              </div>
              </motion.div>
            )}

          {/* Form Aspirasi */}
            {activeTab === 'form' && (
              <motion.div
                key="form-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
              <div className="max-w-3xl mx-auto">
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-xl font-bold text-dark-green mb-2">
                    Formulir Penyampaian Aspirasi GMYA
                  </h2>
                  <p className="text-slate-500 text-sm mb-6">
                    Silakan isi formulir di bawah ini untuk menyampaikan aspirasi,
                    kritik, atau saran Anda. Pastikan data yang dimasukkan akurat
                    agar kami dapat menindaklanjuti dengan baik.
                  </p>

                  {/* Zoho Form Embed */}
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
                      id="ziframe_385055"
                      onLoad={() => setIsLoading(false)}
                      aria-label="GMYA (Give Me Your Aspiration) 2025/2026"
                      src="https://forms.zohopublic.com/mpksman1margaasihofficialgm1/form/GMYAGiveMeYourAspiration/formperma/HXGN8-A0a1AdYRagRQdxWJNkq7Q_PsXxg6jKARYtT9o?zf_enablecamera=true"
                      className="w-full h-[800px] border-0"
                      allow="camera"
                    >
                      <p className="p-6 text-slate-500 text-center">
                        Browser Anda tidak mendukung iframe. Silakan{' '}
                        <a
                          href="https://forms.zohopublic.com/mpksman1margaasihofficialgm1/form/GMYAGiveMeYourAspiration/formperma/HXGN8-A0a1AdYRagRQdxWJNkq7Q_PsXxg6jKARYtT9o?zf_enablecamera=true"
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

                  <div className="mt-4 flex items-start gap-3 p-4 bg-vanilla/20 rounded-lg">
                    <MessageSquare size={18} className="text-goldenrod mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-dark-green font-medium">
                        Butuh bantuan?
                      </p>
                      <p className="text-sm text-cal-poly mt-1">
                        Jika formulir tidak dapat diakses, hubungi kami melalui{' '}
                        <a
                          href="mailto:mpk.sman1margaasih.official@gmail.com"
                          className="underline hover:text-gold"
                        >
                          email
                        </a>{' '}
                        atau{' '}
                        <a
                          href="https://www.instagram.com/mpk.1mga/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-gold"
                        >
                          Instagram
                        </a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>
            )}

            {activeTab === 'angket' && (
              <motion.div
                key="angket-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-3xl mx-auto">
                  <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-dark-green mb-2">
                      Formulir Angket Pemilihan
                    </h2>
                    <p className="text-slate-500 text-sm mb-6">
                      Silakan isi formulir angket pemilihan di bawah ini.
                    </p>

                    {/* Gambar PORSENI 2026 */}
                    <div className="mb-8 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                      <img 
                        src="/images/PORSENI 2026.png" 
                        loading="lazy"
                        alt="PORSENI 2026" 
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    <div className="relative rounded-lg overflow-hidden border border-slate-200 min-h-[965px] bg-white">
                      {isAngketLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                          <div className="w-10 h-10 border-4 border-slate-100 border-t-goldenrod rounded-full animate-spin mb-4"></div>
                          <p className="text-xs font-mono-data text-slate-500 uppercase tracking-widest animate-pulse">
                            Memuat Formulir...
                          </p>
                        </div>
                      )}
                      <iframe
                        ref={angketIframeRef}
                        id="google_form_angket"
                        onLoad={() => setIsAngketLoading(false)}
                        aria-label="Angket Pemilihan"
                        src="https://docs.google.com/forms/d/e/1FAIpQLScqWDlMUk612hHA5IwkMJz4diXWPjTPBxglvP6C-DYS-UxLGg/viewform?embedded=true"
                        className="w-full h-[965px] border-0"
                      >
                        <p className="p-6 text-slate-500 text-center">
                          Browser Anda tidak mendukung iframe. Silakan{' '}
                          <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLScqWDlMUk612hHA5IwkMJz4diXWPjTPBxglvP6C-DYS-UxLGg/viewform?embedded=true"
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

                    <div className="mt-4 flex items-start gap-3 p-4 bg-vanilla/20 rounded-lg">
                      <MessageSquare size={18} className="text-goldenrod mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-dark-green font-medium">
                          Butuh bantuan?
                        </p>
                        <p className="text-sm text-cal-poly mt-1">
                          Jika formulir tidak dapat diakses, hubungi kami melalui{' '}
                          <a href="mailto:mpk.sman1margaasih.official@gmail.com" className="underline hover:text-gold">email</a>{' '}
                          atau{' '}
                          <a href="https://www.instagram.com/mpk.1mga/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold">Instagram</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  )
}
