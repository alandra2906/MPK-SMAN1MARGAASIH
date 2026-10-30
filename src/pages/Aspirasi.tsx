import { useState, useEffect, useRef } from 'react'
import { MessageSquare, Send, ExternalLink, MessageCircleQuestion, Award, Check } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import aspirasiData from '@/content/aspirasi/index.json'

const DEFAULT_GMYA_FORM_URL = "https://forms.zohopublic.com/mpksman1margaasihofficialgm1/form/GMYAGiveMeYourAspiration/formperma/HXGN8-A0a1AdYRagRQdxWJNkq7Q_PsXxg6jKARYtT9o?zf_enablecamera=true"
const DEFAULT_GMYA_BANNER = "/images/GMYABANNER.png"
const DEFAULT_SAKEDAP_FORM_URL = "https://forms.zohopublic.com/mpksman1margaasihofficialgm1/form/SAKEDAPSaranKegiatandanPerlombaan/formperma/cKALA0mVLFk66ZBsQiK4G1j537qAsVXJTvsSmxXqmkc?zf_enablecamera=true"
const DEFAULT_SAKEDAP_BANNER = "/images/SAKEDAPBANNER.png"

export default function Aspirasi() {
  const gmyaFormUrl = aspirasiData?.gmyaFormUrl || DEFAULT_GMYA_FORM_URL
  const gmyaBanner = aspirasiData?.gmyaBanner || DEFAULT_GMYA_BANNER
  const sakedapFormUrl = aspirasiData?.sakedapFormUrl || DEFAULT_SAKEDAP_FORM_URL
  const sakedapBanner = aspirasiData?.sakedapBanner || DEFAULT_SAKEDAP_BANNER

  const [activeTab, setActiveTab] = useState<'gmya' | 'form' | 'sakedap' | 'angket'>('gmya')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const sakedapIframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSakedapLoading, setIsSakedapLoading] = useState(true)

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
    const zohoFrame = activeTab === 'form' ? iframeRef.current : activeTab === 'sakedap' ? sakedapIframeRef.current : null

    if ((activeTab === 'form' || activeTab === 'sakedap') && zohoFrame) {
      try {
        const zf_frame = zohoFrame
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
          if (activeTab === 'form') {
            setIsLoading(true)
          } else if (activeTab === 'sakedap') {
            setIsSakedapLoading(true)
          }
          zf_frame.src = ifrmSrc
        }
      } catch (e) { }
    }
  }, [activeTab])

  return (
    <motion.div
      className="min-h-screen bg-[#f8fafc] pt-20 pb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
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
            Setiap suara berarti sangat berarti bagi kami. Gunakan program GMYA dan SAKEDAP untuk menyampaikan ide,
            kritik, dan saran yang ditujukan untuk pihak sekolah, OSIS, MPK, maupun pihak lainnya demi keberlangsungan lingkungan sekolah yang lebih baik.
          </p>
        </div>

        {/* Tabs */}
         <Tabs value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'gmya' | 'form' | 'sakedap' | 'angket')} 
          className="w-full relative"
         >      
          {/* 1. Kontainer Utama: Menyembunyikan scrollbar bawaan dengan utility class khusus */}
          <div className="w-full overflow-x-auto flex justify-start md:justify-center mb-8 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            
            {/* 2. TabsList: Rata kiri secara default di mobile, otomatis rata tengah di layar komputer (md:justify-center) */}
            <TabsList className="bg-white border border-slate-200 p-1 rounded-lg h-auto flex flex-row justify-start md:justify-center whitespace-nowrap">
              
              <TabsTrigger value="gmya" className="px-6 py-2.5 text-sm data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md flex items-center gap-2">
                <MessageSquare size={16} className="mr-2" /> 
                Tentang GMYA & SAKEDAP
              </TabsTrigger>

              <TabsTrigger value="form" className="px-6 py-2.5 text-sm data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md flex items-center gap-2">
                <Send size={16} className="mr-2" />
                Form GMYA
              </TabsTrigger>

              <TabsTrigger value="sakedap" className="px-6 py-2.5 text-sm data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md flex items-center gap-2">
                <Award size={16} className="mr-2" />
                Form SAKEDAP
              </TabsTrigger>

            </TabsList>
          </div>

          {/* Tentang GMYA & SAKEDAP */}
          <AnimatePresence mode="wait">
            {activeTab === 'gmya' && (
              <motion.div
                key="gmya-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="flex flex-col gap-6">
                  {/* Badge Program Unggulan */}
                  <div className="self-start inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vanilla/50 text-goldenrod text-xs font-semibold uppercase tracking-wider">
                    Program Unggulan Komisi 1
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 items-stretch">
                    
                    {/* Card 1: GMYA */}
                    <div className="group bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-dark-green/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="flex items-center gap-4 mb-5">
                          <div className="w-16 h-16 rounded-xl bg-[#e2ece9] p-1 flex items-center justify-center shrink-0 border border-dark-green/10">
                            <img 
                              src="/images/GMYA.webp" 
                              alt="GMYA Logo" 
                              className="w-full h-full object-contain rounded-lg" // <-- Ditambahkan rounded-lg di sini
                            />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-goldenrod uppercase tracking-wider">Wadah Suara Siswa</span>
                            <h3 className="text-xl font-bold text-dark-green">GMYA</h3>
                          </div>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Give Me Your Aspiration</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Wadah resmi bagi seluruh siswa untuk menyampaikan aspirasi, kritik, saran, dan masukan terkait perkembangan sekolah secara transparan dan terstruktur.
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                        <button 
                          onClick={() => setActiveTab('form')} 
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-dark-green hover:text-goldenrod transition-colors"
                        >
                          Buka Formulir GMYA <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Card 2: SAKEDAP */}
                    <div className="group bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-goldenrod/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="flex items-center gap-4 mb-5">
                          <div className="w-16 h-16 rounded-xl bg-[#fcf8e3] p-1 flex items-center justify-center shrink-0 border border-goldenrod/10">
                            <img 
                              src="/images/SAKEDAP.webp" 
                              alt="SAKEDAP Logo" 
                              className="w-full h-full object-contain rounded-lg" // <-- Ditambahkan rounded-lg di sini
                              onError={(e)=>{e.currentTarget.src="/images/GMYA.webp"}} 
                            />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-goldenrod uppercase tracking-wider">Evaluasi Event</span>
                            <h3 className="text-xl font-bold text-dark-green">SAKEDAP</h3>
                          </div>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Saran KEgiatan DAn Perlombaan</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          Wadah khusus untuk menampung kesan, pesan, ide kreatif, serta umpan balik siswa selama dan sesudah kegiatan sekolah maupun perlombaan berlangsung.
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                        <button 
                          onClick={() => setActiveTab('sakedap')} 
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-dark-green hover:text-goldenrod transition-colors"
                        >
                          Buka Formulir SAKEDAP <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Kesimpulan & Core Values di bagian bawah */}
                  <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <p className="text-slate-600 text-sm leading-relaxed text-center max-w-2xl mx-auto mb-6">
                      Kedua program ini mencerminkan komitmen penuh dari <strong className="text-dark-green">MPK SMAN 1 Margaasih</strong> untuk mendengarkan setiap suara siswa dan mengubahnya menjadi aksi nyata demi perbaikan berkelanjutan nyata di lingkungan sekolah.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-3">
                      <div className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] border border-slate-200/60 rounded-xl text-xs font-medium text-slate-700">
                        <Check size={16} className="text-goldenrod"/>
                        Aspirasi Transparan
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] border border-slate-200/60 rounded-xl text-xs font-medium text-slate-700">
                        <Check size={16} className="text-goldenrod"/>
                        Tindak Lanjut Jelas
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] border border-slate-200/60 rounded-xl text-xs font-medium text-slate-700">
                        <Check size={16} className="text-goldenrod"/>
                        Akses untuk Semua Siswa
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

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
                    Formulir Penyampaian Aspirasi GMYA (Give Me Your Aspiration)
                  </h2>
                  <p className="text-slate-500 text-sm mb-6">
                    Silakan isi formulir di bawah ini untuk menyampaikan aspirasi,
                    kritik, atau saran anda pada pihak yang anda tujukan. Pastikan data yang dimasukkan akurat
                    agar kami dapat menindaklanjuti dengan baik.
                  </p>

                  {/* Gambar Banner GMYA */}
                  {gmyaBanner && (
                    <div className="mb-8 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                      <img 
                        src={gmyaBanner} 
                        alt="GMYABANNER" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {/* Form Embed */}
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
                      aria-label="GMYA (Give Me Your Aspiration)"
                      src={gmyaFormUrl}
                      className="w-full h-[1025px] border-0"
                      allow="camera"
                    >
                      <p className="p-6 text-slate-500 text-center">
                        Browser Anda tidak mendukung iframe. Silakan{' '}
                        <a
                          href={gmyaFormUrl}
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
                    <MessageCircleQuestion size={18} className="text-goldenrod mt-0.5 shrink-0" />
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

            {activeTab === 'sakedap' && (
              <motion.div
                key="sakedap-content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-3xl mx-auto">
                  <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-dark-green mb-2">
                      Formulir SAKEDAP (Saran Kegiatan DAn Perlombaan)
                    </h2>
                    <p className="text-slate-500 text-sm mb-6">
                      Gunakan formulir ini untuk memberikan kesan dan pesan terkait
                      perlombaan atau event yang telah dilaksanakan.
                    </p>

                    {/* Gambar Banner SAKEDAP */}
                    {sakedapBanner && (
                      <div className="mb-8 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                        <img 
                          src={sakedapBanner} 
                          alt="SAKEDAPBANNER" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    <div className="relative rounded-lg overflow-hidden border border-slate-200 min-h-[550px] bg-white">
                      {isSakedapLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                          <div className="w-10 h-10 border-4 border-slate-100 border-t-goldenrod rounded-full animate-spin mb-4"></div>
                          <p className="text-xs font-mono-data text-slate-500 uppercase tracking-widest animate-pulse">
                            Memuat Formulir SAKEDAP...
                          </p>
                        </div>
                      )}
                      <iframe
                        ref={sakedapIframeRef}
                        id="ziframe_869677"
                        onLoad={() => setIsSakedapLoading(false)}
                        aria-label="SAKEDAP (Saran Kegiatan Dan Perlombaan)"
                        src={sakedapFormUrl}
                        className="w-full h-[910px] border-0"
                        allow="camera"
                      >
                        <p className="p-6 text-slate-500 text-center">
                          Browser Anda tidak mendukung iframe. Silakan{' '}
                          <a
                            href={sakedapFormUrl}
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
                      <MessageCircleQuestion size={18} className="text-goldenrod mt-0.5 shrink-0" />
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
    </motion.div> 
  )
}
