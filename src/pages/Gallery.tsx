import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const alumniList = [
  { year: '2024/2025', ketua: 'Allesvien Swary Dzikri Qolbi (XII IPA 3)', wakil: 'Maulida Nur Nazmina (XII IPA 2)' },
  { year: '2023/2024', ketua: 'Bimo Nugroho Adji (XII IPA 3)', wakil: 'Ikmal Khoeruddin (XII IPA 4)' },
  { year: '2022/2023', ketua: 'Nabila Putri Asti Febrianty (XII IPS 1)', wakil: 'Dwi Zulfa N.F (XII IPA 3)' },
  { year: '2021/2022', ketua: 'Chintya Rahmadanti (XII IPA 3)', wakil: 'Aghniya Hilyah Putri (XII IPS 1)' },
  { year: '2020/2021', ketua: 'Faqih Ragi (XI IPA 4)', wakil: 'Halimun Sanjaya (XI IPA 2)' },
  { year: '2019/2020', ketua: 'M Dias Ilyasa (XI IPA 3)', wakil: 'Toni Yusuf (XI IPS 3)' },
]

const galleryImages = [
  { src: '/images/IMG-20251006-WA0120.jpg.jpeg', caption: 'Pasca Pemilihan Ketua dan Wakil Ketua MPK' },
  { src: '/images/IMG-20260131-WA0009.jpg.jpeg', caption: 'Foto Bersama Pasca Sidang Pleno I 2026' },
  { src: '/images/IMG-20260131-WA0015.jpg.jpeg', caption: 'Foto Bersama Pasca Sidang Pleno I 2026' },
  { src: '/images/IMG-20260131-WA0038.jpg.jpeg', caption: 'Foto Bersama OSIS & MPK pasca Sidang Pleno I 2026' },
  { src: '/images/IMG-20260130-WA0104.jpg.jpeg', caption: 'Rapat Pra Sidang Pleno I 2026' },
  { src: '/images/IMG-20251030-WA0074.jpg.jpeg', caption: 'Rapat Pra Event Career Day 2026' },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const openModal = (index: number) => {
    setSelectedImage(galleryImages[index].src)
    setCurrentIndex(index)
  }

  const closeModal = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedImage(null)
  }

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    const nextIdx = (currentIndex + 1) % galleryImages.length
    setCurrentIndex(nextIdx)
    setSelectedImage(galleryImages[nextIdx].src)
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    const prevIdx = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    setCurrentIndex(prevIdx)
    setSelectedImage(galleryImages[prevIdx].src)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, currentIndex])

  // Centralized management of body overflow
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }; // Cleanup
  }, [selectedImage]);

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

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Judul halaman */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 text-goldenrod text-xs font-mono-data uppercase tracking-wider mb-4">
            <span className="w-8 h-[2px] bg-goldenrod" />
            Alumni & Dokumentasi
            <span className="w-8 h-[2px] bg-goldenrod" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-green">
            Journey MPK
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Kenangan kepemimpinan generasi sebelumnya dan dokumentasi visual
            kegiatan Majelis Perwakilan Kelas.
          </p>
        </div>

        {/* Alumni — atas */}
        <section className="mb-20 lg:mb-24 reveal" aria-labelledby="hall-of-fame-heading">
          <h2
            id="hall-of-fame-heading"
            className="text-2xl font-bold text-dark-green mb-2 text-center"
          >
            Hall of Fame
          </h2>
          <p className="text-slate-500 text-center mb-10">
            Jejak Kepemimpinan Generasi Sebelumnya
          </p>

          <div className="max-w-3xl mx-auto">
            {alumniList.map((alumni, idx) => (
              <div
                key={idx}
                className="relative pl-8 pb-8 border-l-2 border-slate-200 last:pb-0 last:border-0"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-goldenrod border-4 border-white shadow" />
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vanilla text-goldenrod text-xs font-semibold">
                      Periode {alumni.year}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">
                        Ketua MPK
                      </p>
                      <p className="font-semibold text-dark-green">
                        {alumni.ketua}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">
                        Wakil Ketua
                      </p>
                      <p className="font-semibold text-dark-green">
                        {alumni.wakil}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pemisah dekoratif */}
        <div
          className="relative max-w-xl mx-auto mb-16 lg:mb-20 reveal"
          aria-hidden
        >
          <div className="h-px bg-gradient-to-r from-transparent via-goldenrod/40 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#f8fafc]">
            <span className="inline-block w-2 h-2 rotate-45 bg-goldenrod/80 shadow-sm ring-4 ring-[#f8fafc]" />
          </div>
        </div>

        {/* Galeri dokumentasi */}
        <section className="reveal" aria-labelledby="documentation-heading">
          <h2
            id="documentation-heading"
            className="text-2xl font-bold text-dark-green mb-2 text-center"
          >
            Dokumentasi
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
            Dokumentasi dan Momen Kegiatan MPK yang Berkesan.
          </p>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((img, idx) => (
              <figure
                key={`${img.src}-${idx}`}
                onClick={() => openModal(idx)}
                className="break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-dark-green/5 cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-green/85 via-dark-green/20 to-transparent opacity-90 md:opacity-70 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <span className="block text-[10px] font-mono-data uppercase tracking-widest text-goldenrod mb-1.5 opacity-95">
                    Dokumentasi
                  </span>
                  <p className="text-white font-semibold text-sm sm:text-base leading-snug drop-shadow-sm">
                    {img.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10 backdrop-blur-sm"
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
              aria-label="Close preview"
            >
              <X size={32} />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-[110]"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="relative max-w-5xl w-full flex flex-col items-center">
                <motion.img
                  key={selectedImage}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }} // Reverted to basic scale animation
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  src={selectedImage}
                  alt={galleryImages[currentIndex].caption}
                  className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl" // Reverted to original class
                  onClick={(e) => e.stopPropagation()}
                  // Removed all zoom/drag related event handlers and style
                />
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-6 text-white text-center font-medium text-2xl sm:text-4xl px-4"
              >
                {galleryImages[currentIndex].caption}
              </motion.p>
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-[110]"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
