import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { ChevronDown, Target, Eye } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('tentang-mpk')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Parallax effect for desktop only
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = {
    stiffness: 100,
    damping: 10,
    mass: 0.5,
  }

  const parallaxX = useSpring(mouseX, springConfig)
  const parallaxY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Detect touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)

    if (!isTouchDevice) {
      const handleMouseMove = (event: MouseEvent) => {
        const { clientX, clientY, currentTarget } = event
        const { offsetWidth, offsetHeight } = currentTarget as HTMLElement

        // Calculate center of the element
        const centerX = offsetWidth / 2
        const centerY = offsetHeight / 2

        // Calculate mouse position relative to the center (-1 to 1)
        const x = (clientX - centerX) / centerX
        const y = (clientY - centerY) / centerY

        // Apply a small parallax shift (e.g., 10px to 20px)
        mouseX.set(x * 15) // Adjust multiplier for desired intensity
        mouseY.set(y * 15) // Adjust multiplier for desired intensity
      }

      const sectionElement = document.getElementById('intro-splash-section')
      if (sectionElement) {
        sectionElement.addEventListener('mousemove', handleMouseMove)
        return () => sectionElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isTouchDevice, mouseX, mouseY])

  return (
    <div className="min-h-screen">
      {/* Intro Splash Section */}
      <section id="intro-splash-section" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        {/* Background Layer */}
        {/* Layer 1 (Paling Bawah): motion.div berisi gambar background (ini yang bergerak/parallax). */}
        <motion.div
          className="absolute inset-0 z-0"
          style={!isTouchDevice ? { x: parallaxX, y: parallaxY } : {}}
        >
          <img
            src="/images/IMG-20251006-WA0120.jpg.jpeg"
            alt="Background"
            className="w-full h-full object-cover blur-[4px] scale-110 grayscale-[0.45] brightness-[0.45]"
          />
        </motion.div>
        {/* Layer 2 (Tengah): div statis untuk overlay gradient/hitam (ini diam, tidak ikut bergerak). */}
          {/* Strong Cinematic Vignette Overlay */}
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle,_transparent_20%,_rgba(0,17,0,0.9)_99%)] pointer-events-none" />

        {/* Content with immediate Fade In effect */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 reveal revealed space-y-6 drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">
          <div className="transform transition-transform duration-1000">
            <img
              src="/images/LOGOMPKFINAL.png"
              alt="Logo MPK"
              className="w-48 h-48 md:w-80 md:h-80"
            />
          </div>
          <div className="space-y-2">
            <motion.h1
              className="text-white font-black text-8xl md:text-9xl tracking-normal uppercase leading-none cursor-default"
              whileHover={{
                textShadow: "0px 0px 10px rgba(255, 255, 255, 0.6)",
                filter: "brightness(1.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              MPK
            </motion.h1>
            <motion.p
              className="text-white font-medium text-lg md:text-2xl tracking-[0.2em] uppercase leading-none cursor-default"
              whileHover={{
                textShadow: "0px 0px 10px rgba(255, 255, 255, 0.6)",
                filter: "brightness(1.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              Majelis Perwakilan Kelas
            </motion.p>
            <motion.h2
              className="text-yellow-500 font-medium text-xl md:text-2xl tracking-widest uppercase opacity-90 cursor-default"
              whileHover={{
                textShadow: "0px 0px 15px rgba(238, 255, 0, 0.6)",
                filter: "brightness(1)",
              }}
              transition={{ duration: 0.3 }}
            >
              SMAN 1 MARGAASIH
            </motion.h2>
          </div>
        </div>
        {/* Pulsing Arrow Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
          <button 
            onClick={() => heroRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="animate-bounce opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} className="text-white" />
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-dark-green overflow-hidden"
      >
        {/* Background gradient accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cal-poly/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <h2 className="text-xl sm:text-2xl font-medium text-yellow-400/90 tracking-wide mb-4">
                Selamat Datang di
              </h2>

              <h1 className="leading-tight drop-shadow-md mb-4">
                <span className="block text-5xl sm:text-6xl lg:text-8xl font-black text-white tracking-tight">
                  Laman MPK
                </span>
              </h1>

              <p className="text-slate-300 text-lg sm:text-xl max-w-xl leading-relaxed mt-4">
                Laman MPK adalah sebuah media penyampaian informasi dan komunikasi resmi untuk program kerja, kegiatan, serta aspirasi siswa yang mudah diakses oleh seluruh siswa SMAN 1 Margaasih.
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={scrollToAbout}
                  className="px-6 py-3 bg-goldenrod hover:bg-gold text-white font-semibold rounded-md transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-goldenrod/20"
                >
                  Jelajahi MPK
                </button>
                <Link
                  to="/aspirasi"
                  className="px-6 py-3 border border-slate-600 hover:border-gold text-slate-300 hover:text-gold font-semibold rounded-md transition-all duration-200"
                >
                  Sampaikan Aspirasi
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative group max-w-xs sm:max-w-sm lg:max-w-md">
                <div className="absolute -inset-4 bg-gold/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/images/Laman MPK.png"
                  alt="Laman MPK"
                  className="relative w-full h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang MPK Section */}
      <section id="tentang-mpk" className="py-20 lg:py-28 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 text-goldenrod text-xs font-mono-data uppercase tracking-wider mb-4">
                <span className="w-8 h-[2px] bg-goldenrod" />
                Tentang Kami
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark-green mb-6">
                Apa itu MPK?
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-dark-green">
                    Majelis Perwakilan Kelas (MPK)
                  </strong>{' '}
                  adalah organisasi siswa intra sekolah yang berfungsi sebagai
                  lembaga legislatif dan pengawas OSIS. MPK juga menjadi
                  menjadi jembatan komunikasi antara siswa dengan pihak sekolah
                  dalam menyampaikan aspirasi, kritik, dan saran.
                </p>
                <p>
                  Sebagai badan perwakilan, MPK bertugas menampung berbagai
                  masukan dari seluruh siswa SMAN 1 Margaasih, mengawasi pelaksanaan program
                  kerja OSIS, serta memastikan setiap kebijakan yang dibuat
                  mengedepankan kepentingan dan kesejahteraan siswa.
                </p>
                <p>
                MPK terdiri dari perwakilan terpilih dari setiap kelas yang terbagi ke dalam empat komisi sesuai bidang tugas masing-masing. Bersama-sama, kami berkomitmen untuk mewujudkan SMAN 1 Margaasih yang lebih baik.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-6 text-goldenrod hover:text-gold font-semibold transition-colors"
              >
                Pelajari lebih lanjut
                <span className="text-lg">→</span>
              </Link>
            </div>

            <div className="reveal">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/images/IMG-20260130-WA0104.jpg.jpeg"
                  alt="MPK dalam rapat"
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-green/40 to-transparent" />
                <Link
                  to="/gallery"
                  className="absolute bottom-4 right-4 px-4 py-2 bg-gray-500/30 hover:bg-gray-500/50 text-white text-xs sm:text-sm font-semibold rounded-md transition-all duration-200 hover:scale-[1.025] shadow-lg z-10"
                >
                  Jelajahi Journey MPK
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-20 lg:py-28 bg-dark-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <div className="inline-flex items-center gap-2 text-gold text-xs font-mono-data uppercase tracking-wider mb-4">
              <span className="w-8 h-[2px] bg-gold" />
              Arah dan Tujuan
              <span className="w-8 h-[2px] bg-gold" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Visi & Misi
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Visi Card */}
            <div className="reveal bg-cal-poly/20 border border-slate-700 rounded-xl p-8 hover:border-gold/50 transition-colors duration-300">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-6">
                <Eye size={24} className="text-gold" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Visi</h3>
              <p className="text-slate-400 leading-relaxed">
                Menjadi Majelis Perwakilan Kelas yang berintegritas, kritis, dan
                bijaksana dalam menyalurkan aspirasi siswa, serta mampu menjadi
                penyeimbang yang adil dalam kehidupan organisasi sekolah.
              </p>
            </div>

            {/* Misi Card */}
            <div className="reveal bg-cal-poly/20 border border-slate-700 rounded-xl p-8 hover:border-gold/50 transition-colors duration-300">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-6">
                <Target size={24} className="text-gold" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Misi</h3>
              <ul className="space-y-3 text-slate-400 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Menampung dan menyampaikan aspirasi siswa secara objektif, jujur, dan bertanggung jawab.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Menjalankan fungsi pengawasan terhadap kinerja OSIS secara profesional dan konstruktif.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Membangun komunikasi yang sehat antara siswa, OSIS, dan pihak sekolah.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Menumbuhkan budaya berpikir kritis, terbuka, dan solutif di kalangan siswa.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Menjadi contoh dalam sikap disiplin, etika, dan pengambilan keputusan yang bijak.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Mendorong transparansi dan keadilan dalam setiap kegiatan organisasi.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-green mb-4">
            Punya Aspirasi? Sampaikan Sekarang Juga.
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Setiap suara penting. Lewat program GMYA (Give Me Your Aspiration), kamu bisa menyampaikan
            aspirasi, kritik, dan saran secara mudah dan transparan.
          </p>
          <Link
            to="/aspirasi"
            className="inline-flex items-center gap-2 px-8 py-4 bg-dark-green hover:bg-cal-poly text-white font-semibold rounded-md transition-all duration-200 hover:scale-[1.02] shadow-xl"
          >
            Sampaikan Aspirasimu
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
