import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ChevronDown, Target, Eye } from 'lucide-react'

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

  return (
    <div className="min-h-screen">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-mono-data uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Majelis Perwakilan Kelas
              </div>

              <h1 className="mb-6 leading-tight drop-shadow-md">
                <span className="block text-6xl sm:text-7xl lg:text-9xl font-black text-white tracking-tighter">
                  MPK
                </span>
                <span className="block text-lg sm:text-xl lg:text-2xl text-gold font-bold tracking-[0.25em] uppercase mt-1">
                  SMAN 1 Margaasih
                </span>
              </h1>

              <p className="text-slate-400 text-lg sm:text-xl max-w-lg mb-8 leading-relaxed">
                Perubahan Bermakna dimulai dari setiap suara. MPK hadir sebagai
                wadah perwakilan siswa untuk menyalurkan aspirasi, ide, dan
                semangat demokrasi di sekolah.
              </p>

              <div className="flex flex-wrap gap-4">
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
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gold/10 rounded-2xl blur-2xl" />
                <img
                  src="/images/IMG-20251006-WA0120.jpg.jpeg"
                  alt="Foto Keanggotaan MPK"
                  className="relative rounded-xl shadow-2xl shadow-black/40 w-full object-cover aspect-[4/3]"
                />
                {/* Decorative badge */}
                <div className="absolute -bottom-4 -left-4 bg-dark-green border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
                  <p className="text-xs text-slate-400 font-mono-data uppercase">
                    Periode
                  </p>
                  <p className="text-white font-bold">2024 / 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-gold transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={28} />
        </button>
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
                  lembaga legislatif dan pengawas organisasi siswa. MPK juga menjadi
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
                  MPK terdiri dari anggota-anggota yang berasal dari perwakilan terepilih tiap kelas,
                  yang dikelompokkan dalam empat komisi sesuai dengan bidang
                  tugasnya masing-masing. Bersama, kami berkomitmen untuk
                  mewujudkan SMAN 1 Margaasih yang lebih baik.
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
              <h3 className="text-xl font-bold text-white mb-4">Visi</h3>
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
              <h3 className="text-xl font-bold text-white mb-4">Misi</h3>
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
