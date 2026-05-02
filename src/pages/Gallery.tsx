import { useEffect } from 'react'

const alumniList = [
  { year: '2023/2024', ketua: 'Andi Wijaya', wakil: 'Rina Susanti' },
  { year: '2022/2023', ketua: 'Bima Sakti', wakil: 'Dewi Anggraini' },
  { year: '2021/2022', ketua: 'Citra Lestari', wakil: 'Fajar Nugroho' },
  { year: '2020/2021', ketua: 'Dedi Kurniawan', wakil: 'Hana Pratiwi' },
]

const galleryImages = [
  { src: '/images/IMG-20251006-WA0120.jpg.jpeg', caption: 'Demo Demokrasi 2024' },
  { src: '/images/gallery-2.jpg', caption: 'OSIS Fest Booth' },
  { src: '/images/gallery-3.jpg', caption: 'Foto Bersama MPK 2024' },
  { src: '/images/gallery-4.jpg', caption: 'Pelantikan Anggota' },
  { src: '/images/gallery-1.jpg', caption: 'Foto Resmi Keanggotaan' },
  { src: '/images/about-mpk.jpg', caption: 'Rapat Kerja MPK' },
]

/** Bento spans for lg+ — pola portofolio: satu sel besar + variasi tinggi */
const galleryCellLayout: string[] = [
  'md:col-span-2 md:row-span-2 md:min-h-[min(520px,70vh)]',
  'md:col-span-1 md:min-h-[220px]',
  'md:col-span-1 md:min-h-[220px]',
  'md:col-span-1 md:min-h-[220px]',
  'md:col-span-1 md:min-h-[220px]',
  'md:col-span-2 md:min-h-[260px]',
]

export default function Gallery() {
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
            Dokumentasi & Alumni
            <span className="w-8 h-[2px] bg-goldenrod" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-green">
            Galeri MPK
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Kenangan kepemimpinan generasi sebelumnya dan dokumentasi visual
            kegiatan Majelis Perwakilan Kelas.
          </p>
        </div>

        {/* Alumni — atas */}
        <section className="mb-20 lg:mb-24 reveal" aria-labelledby="alumni-heading">
          <h2
            id="alumni-heading"
            className="text-2xl font-bold text-dark-green mb-2 text-center"
          >
            Alumni MPK
          </h2>
          <p className="text-slate-500 text-center mb-10">
            Jejak kepemimpinan generasi sebelumnya
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
        <section className="reveal" aria-labelledby="galeri-heading">
          <h2
            id="galeri-heading"
            className="text-2xl font-bold text-dark-green mb-2 text-center"
          >
            Galeri Dokumentasi
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
            Momen kegiatan MPK dalam kurasi visual bergaya portofolio
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-[minmax(200px,auto)] gap-4 md:gap-5 max-w-6xl mx-auto">
            {galleryImages.map((img, idx) => (
              <figure
                key={`${img.src}-${idx}`}
                className={`group relative rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-dark-green/5 min-h-[220px] ${galleryCellLayout[idx] ?? 'md:col-span-1'}`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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
    </div>
  )
}
