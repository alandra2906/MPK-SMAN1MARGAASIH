import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const komisiData = [
  {
    id: 'komisi1',
    name: 'Komisi 1',
    title: 'Penampung dan Penyalur Aspirasi',
    description: 'Komisi I berfokus dalam perannya menjadi penyalur aspirasi siswa SMA Negeri 1 Margaasih, yang mempunyai tugas utama sebagai wadah penampung aspirasi siswa, juga sebagai pengawas OSIS Sekbid 1 dan Sekbid 2.',
    members: [
      { name: 'Calulla Shafa Avila', kelas: 'XI IPA 3', jabatan: 'Ketua Komisi' },
      { name: 'Alya Batrisya Said', kelas: 'XI IPS 10', jabatan: 'Anggota' },
      { name: 'Muhammad Alandra Fairuz', kelas: 'X 3', jabatan: 'Orang kece' },
      { name: 'Azkya Royan Maharani', kelas: 'X 4', jabatan: 'Anggota' },
      { name: 'Riva Sukma Amilin', kelas: 'X 5', jabatan: 'Anggota' },
    ],
  },
  {
    id: 'komisi2',
    name: 'Komisi 2',
    title: 'Hubungan Masyarakat',
    description: 'Komisi II berperan sebagai humas organisasi, publikasi dan dokumentasi kegiatan MPK SMA Negeri 1 Margaasih, serta bertugas sebagai pengawas kinerja OSIS Sekbid 3 dan Sekbid 4.',
    members: [
      { name: 'Naya Widyani Putri', kelas: 'XI IPA 5', jabatan: 'Ketua Komisi' },
      { name: 'Seli Maulidia', kelas: 'XI IPS 8', jabatan: 'Anggota' },
      { name: 'Sabrina Bilqis', kelas: 'X IPS 9', jabatan: 'Anggota' },
      { name: 'Azillie Zulfa Syahrushiam', kelas: 'X 7', jabatan: 'Anggota' },
      { name: 'Hafizha Nur Khaira', kelas: 'XI 12', jabatan: 'Anggota' },
    ],
  },
  {
    id: 'komisi3',
    name: 'Komisi 3',
    title: 'Ekstrakulikuler dan Prestasi',
    description: 'Komisi III bertugas menjadi pengurus bidang ekstrakurikuler di SMA Negeri 1 Margaasih, juga sebagai pengawas kinerja OSIS Sekbid 5 dan 6',
    members: [
      { name: 'Raifa Junia Keaila', kelas: 'XI IPS 12', jabatan: 'Ketua Komisi' },
      { name: 'Shevira Dwi Fitria', kelas: 'XI IPA 6', jabatan: 'Anggota' },
      { name: 'Neng Wini Fathu Rohmah', kelas: 'X 1', jabatan: 'Anggota' },
      { name: 'Assyfa Rahmi Illahi Q.J.P.K', kelas: 'X 9', jabatan: 'Anggota' },
    ],
  },
  {
    id: 'komisi4',
    name: 'Komisi 4',
    title: 'Keanggotaan dan Administrasi',
    description: 'Komisi IV berperan sebagai konektor (perombak, memperbaiki kesalahan) administrasi organisasi, serta sebagai pengurus Anggaran Dasar dan Rumah Tangga organisasi, juga bertugas mengawasi kinerja OSIS Sekbid 7 dan Sekbid 8.',
    members: [
      { name: 'Azriel Falco Moreno', kelas: 'XI IPA 2', jabatan: 'Ketua Komisi' },
      { name: 'Syifa Raya Merlinda', kelas: 'X 2', jabatan: 'Anggota' },
      { name: 'Nazma Mushal Hakim', kelas: 'X 6', jabatan: 'Anggota' },
      { name: 'Toni Kurniawan', kelas: 'X IPS 1', jabatan: 'Anggota' },
      { name: 'Nessa Astriyani', kelas: 'X 8', jabatan: 'Anggota' },
    ],
  },
]

type ProkerCategory = 'sekretaris' | 'bendahara' | 'komisi1' | 'komisi2' | 'komisi3' | 'komisi4'

type ProkerItem = {
  category: ProkerCategory
  title: string
  tujuan: string
  pelaksanaan: string
}

const allProkerData: ProkerItem[] = [
{ category: 'sekretaris', title: 'Membuat file anggota MPK', tujuan: 'Agar seluruh data MPK tersusun rapih dan tidak dan tidak mudah hilang.', pelaksanaan: 'Jangka pendek' },
  { category: 'sekretaris', title: 'Membuat file data anggota MPK & OSIS', tujuan: 'Agar seluruh data MPK OSIS tersusun rapih, tidak mudah hilang dan gampang dicari ketika sedang membutuhkan data anggota-anggota OSIS dan MPK.', pelaksanaan: 'Jangka pendek' },
  { category: 'sekretaris', title: 'Membuat Surat Peringatan', tujuan: 'Agar seluruh anggota MPK OSIS dapat bertanggung jawab di setiap kesalahannya dengan adanya surat ini.', pelaksanaan: 'Jangka menengah' },
  { category: 'sekretaris', title: 'Membuat lampiran daftar kehadiran anggota MPK pada setiap rapat', tujuan: 'Agar mengetahui dan memantau perkembangan kehadiran anggota MPK dalam setiap rapat bulanan.', pelaksanaan: 'Jangka menengah' },
  { category: 'sekretaris', title: 'Pembuatan kalender kegiatan MPK', tujuan: 'Agar dapat memastikan seluruh kegiatan berjalan sesuai rencana dan mengurangi resiko penundaan', pelaksanaan: 'Jangka menengah' },
  { category: 'sekretaris', title: 'Membuat Google drive untuk arsip MPK', tujuan: 'Agar seluruh file dan surat MPK tersusun rapi, tidak mudah hilang, serta mudah dibagikan kepada sekretaris MPK periode berikutnya sebagai referensi', pelaksanaan: 'Jangka panjang' },
  { category: 'sekretaris', title: 'Membuat notulensi setiap rapat', tujuan: 'Agar terdapat ringkasan tentang materi rapat yang telah disampaikan.', pelaksanaan: 'Jangka panjang' },
  { category: 'sekretaris', title: 'Membuat SIPRO-MPK (Sistem Proposal Terpadu)', tujuan: 'Tujuannya untuk mempermudah proses pengajuan izin dan persetujuan dalam pelaksanaan kegiatan atau acara MPK', pelaksanaan: 'Jangka panjang' },
  { category: 'bendahara', title: 'Mengadakan iuran kas rutin', tujuan: 'Melatih kedisiplinan dan tanggung jawab seorang anggota dengan membayar iuran kas sebesar Rp.10.000/bulan degan tujuan menambah dan menjaga kestabilan kas MPK.', pelaksanaan: 'Jangka Panjang' },
  { category: 'bendahara', title: 'Mencatat pengeluaran dan pemasukan', tujuan: 'Untuk transparansi, mengetahui pengeluaran dan pemasukan dana dengan jelas.', pelaksanaan: 'Jangka Panjang' },
  { category: 'bendahara', title: 'Konsultasi keuangan dengan ketua dan wakil MPK', tujuan: 'Untuk memastikan pengelolaan dan penggunaan dana MPK berjalan dengan lancar.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi1', title: 'KoPi (Kotak Aspirasi)', tujuan: 'Menampung aspirasi melalui kotak aspirasi yang akan disediakan untuk menampung suara dari siswa/i SMAN 1 Margaasih.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi1', title: 'GMYA (Give Me Your Aspiration)', tujuan: 'Menampung kritik/saran dari siswa/i SMAN 1 Margaasih mengenai kegiatan dan lomba-lomba untuk acara yang telah diadakan.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi1', title: 'Laman MPK', tujuan: 'Sebagai media informasi dan komunikasi resmi untuk menyampaikan program kerja, kegiatan, serta aspirasi siswa yang mudah diakses oleh seluruh siswa/i SMAN 1 Margaasih.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi1', title: 'SAKEDAP (Saran Kegiatan dan Perlombaan)', tujuan: 'Menampung aspirasi siswa/i pra event melalui Google Form yang akan diunggah pada Story Instagram MPK dan OSIS yang sudah disediakan.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi1', title: 'PENA (Pesan Anonim)', tujuan: 'Sebagai wadah penyaluran pesan siswa/i SMAN 1 Margaasih secara anonim kepada para pengurus MPK dan OSIS.', pelaksanaan: 'Jangka Pendek' },
  { category: 'komisi2', title: 'Poster peringatan hari besar dan nasional.', tujuan: 'Menumbuhkan rasa nasionalisme dan semangat kebangsaan, berupa poster yang di buat. Di share melalui story Instagram MPK.', pelaksanaan: 'Jangka panjang' },
  { category: 'komisi2', title: 'Lebih mengaktifkan media sosial (Instagram).', tujuan: 'Mendokumentasikan setiap kegiatan yang berhubungan dengan OSIS.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi2', title: 'Membuat broadcast pada setiap kegiatan rapat.', tujuan: 'Tujuan proker ini untuk membangun sistem komunikasi yang terstruktur dan jelas bagi pengurus.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi2', title: 'Membuat poster orasi pemilihan ketua dan wakil ketua MPK masa periode selanjutnya.', tujuan: 'Membuat poster informasi tentang pergantian ketua dan wakil ketua MPK untuk periode selanjutnya.', pelaksanaan: 'Jangka pendek' },
  { category: 'komisi3', title: 'Melaksanakan kegiatan sosialiasi dan pengenalan berbagai jenis ekstrakurikuler.', tujuan: 'Agar seluruh siswa/siswi SMA Negeri 1 Margasih memperoleh pemahaman mengenai pilihan ekstrakurikuler yang ada serta terdorong untuk mengikuti kegiatan ekstrakurikuler sesuai dengan minat dan bakat masing-masing.', pelaksanaan: 'Jangka Pendek' },
  { category: 'komisi3', title: 'Memberikan tanda penghargaan kepada ekstrakurikuler yang paling banyak meraih juara selama setahun.', tujuan: 'Memberikan motivasi serta rasa bangga bagi seluruh anggota esktrakurikuler atas kerja kerja mereka.', pelaksanaan: 'Jangka Pendek' },
  { category: 'komisi3', title: 'Koordinasi rutin dengan pembina dan ketua ekstrakurikuler terkait jadwal serta pelaksanaan kegiatan.', tujuan: 'Agar pelaksanaan kegiatan ekstrakurikuler dapat berjalan dengan tertib dan sesuai dengan jadwal yang telah ditetapkan.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi3', title: 'Mendukung dan memfasilitasi penyampaian informasi kegiatan ekstrakurikuler melalui media informasi yang tersedia di sekolah.', tujuan: 'Agar mendukung keterbukaan informasi kegiatan ekstrakurikulerkepada seluruh siswa/siswi.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi3', title: 'Mendata pencapaian hasil perlombaan yang telah diikuti oleh anggota ekstrakurikuler.', tujuan: 'Memberikan apresiasi atas keberhasilan agar memotivasi semangat siswa dalam berprestasi.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi3', title: 'Meninjau pelaksanaan latihan mingguan sesuai ketetapan pengurus ekstrakurikuler.', tujuan: 'Menjamin kelancaran seluruh agenda tanpa ada gangguan.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi3', title: 'Merangkum seluruh data kegiatan dan pencapaian selama satu tahun kepengurusan.', tujuan: 'Menjadi bahan evaluasi bagi pengurus selanjutnya agar menjadi lebih baik.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi4', title: 'Pemantauan awal terhadap pelaksanaan AD/ART OSIS/MPK', tujuan: 'Melakukan pemantauan awal terhadap pelaksanaan AD/ART OSIS/MPK pada awal masa jabatan agar seluruh kegiatan dan struktur organisasi berjalan sesuai ketentuan.', pelaksanaan: 'Jangka pendek' },
  { category: 'komisi4', title: 'Mengawasi kinerja OSIS dalam melaksanakan kegiatanya.', tujuan: 'Mengawasi kinerja OSIS dalam melaksanakan kegiatanya.', pelaksanaan: 'Jangka menengah' },
  { category: 'komisi4', title: 'Melaksanakan rapat rutin', tujuan: 'Melaksanakan rapat rutin tiap 2 bulan untuk membahas kembali program kerja dan rencana kedepan', pelaksanaan: 'Jangka panjang' },
];

const prokerCategoryOptions: { id: ProkerCategory; label: string }[] = [
  { id: 'sekretaris', label: 'Sekretaris' },
  { id: 'bendahara', label: 'Bendahara' },
  { id: 'komisi1', label: 'Komisi 1' },
  { id: 'komisi2', label: 'Komisi 2' },
  { id: 'komisi3', label: 'Komisi 3' },
  { id: 'komisi4', label: 'Komisi 4' },
]

export default function About() {
  const [activeTab, setActiveTab] = useState('struktur')
  const [scrollPos, setScrollPos] = useState(0)
  const [prokerCategory, setProkerCategory] = useState<ProkerCategory>('sekretaris')

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
  }, [activeTab])

  const scrollTabs = (dir: 'left' | 'right') => {
    const container = document.getElementById('tabs-container')
    if (!container) return
    const amount = 200
    const newPos = dir === 'left' ? scrollPos - amount : scrollPos + amount
    container.scrollTo({ left: newPos, behavior: 'smooth' })
    setScrollPos(newPos)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center gap-2 text-goldenrod text-xs font-mono-data uppercase tracking-wider mb-4">
            <span className="w-8 h-[2px] bg-goldenrod" />
            Profil Organisasi
            <span className="w-8 h-[2px] bg-goldenrod" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-green">
            Tentang MPK
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Mengenal lebih dekat struktur, program, dan anggota Majelis
            Perwakilan Kelas periode 2024/2025.
          </p>
        </div>

        {/* Tabs with scroll buttons for mobile */}
        <div className="relative mb-10">
          <button
            onClick={() => scrollTabs('left')}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow rounded-full flex items-center justify-center text-slate-600"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollTabs('right')}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow rounded-full flex items-center justify-center text-slate-600"
          >
            <ChevronRight size={16} />
          </button>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto pb-2 hide-scrollbar" id="tabs-container">
              <TabsList className="bg-white border border-slate-200 p-1 rounded-lg inline-flex min-w-full md:min-w-0 h-auto flex-nowrap md:flex-wrap">
                <TabsTrigger value="struktur" className="px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md">
                  Struktur
                </TabsTrigger>
                <TabsTrigger value="proker" className="px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md">
                  Proker
                </TabsTrigger>
                <TabsTrigger value="komisi1" className="px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md">
                  Komisi 1
                </TabsTrigger>
                <TabsTrigger value="komisi2" className="px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md">
                  Komisi 2
                </TabsTrigger>
                <TabsTrigger value="komisi3" className="px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md">
                  Komisi 3
                </TabsTrigger>
                <TabsTrigger value="komisi4" className="px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-dark-green data-[state=active]:text-white rounded-md">
                  Komisi 4
                </TabsTrigger>
              </TabsList>
            </div>

            <div className={activeTab === 'struktur' ? 'mt-6 block' : 'hidden'}>
              <div className="reveal">
                <h2 className="text-2xl font-bold text-dark-green mb-2 text-center">
                  Struktur Organisasi MPK
                </h2>
                <p className="text-slate-500 text-center mb-10">
                  Periode 2025 / 2026
                </p>

                  <div className="max-w-5xl mx-auto px-4">
                    {/* Tier 0: Pembina MPK */}
                    <div className="flex flex-col items-center mb-0">
                      <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm w-56 relative z-10">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Pembina MPK</p>
                        <p className="font-bold text-dark-green text-lg">Pak Adang</p>
                      </div>
                      <div className="w-px h-12 bg-slate-200"></div>
                    </div>

                    {/* Tier 1: Ketua & Wakil Ketua — horizontal span matches grid centers (gap-8) */}
                    <div className="relative max-w-4xl mx-auto mb-0">
                      <div
                        className="absolute top-0 h-px bg-slate-200 hidden sm:block left-[calc((100%_-_2rem)/4)] w-[calc(50%_+_1rem)]"
                        aria-hidden
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
                        <div className="flex flex-col items-center">
                          <div className="w-px h-8 shrink-0 bg-slate-200 hidden sm:block"></div>
                          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center min-h-[160px] w-full">
                            <div className="w-16 h-16 rounded-full bg-dark-green text-white flex items-center justify-center mb-4 text-xl font-bold">K</div>
                            <h3 className="font-bold text-dark-green">Ketua MPK</h3>
                            <p className="text-goldenrod font-semibold mt-1">Sherin Alivka S</p>
                            <p className="text-slate-500 text-sm">XI IPA 2</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-px h-8 shrink-0 bg-slate-200 hidden sm:block"></div>
                          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center min-h-[160px] w-full">
                            <div className="w-16 h-16 rounded-full bg-goldenrod text-white flex items-center justify-center mb-4 text-xl font-bold">W</div>
                            <h3 className="font-bold text-dark-green">Wakil Ketua MPK</h3>
                            <p className="text-goldenrod font-semibold mt-1">Nailah Khoirunnisa</p>
                            <p className="text-slate-500 text-sm">XI IPS 3</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10">
                    {/* Line down to Tier 2 (trunk; length meets Tier 2 horizontal at top-0) */}
                    <div className="flex justify-center">
                      <div className="w-px h-16 shrink-0 bg-slate-200 hidden sm:block" />
                    </div>

                    {/* Tier 2: Sekretaris & Bendahara — horizontal matches 4-col grid (gap-4) */}
                    <div className="relative mb-6">
                      <div
                        className="absolute top-0 h-px bg-slate-200 hidden sm:block left-[calc((100%_-_3rem)/8)] w-[calc(75%_+_0.75rem)]"
                        aria-hidden
                      />
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-px h-4 shrink-0 bg-slate-200 hidden sm:block"></div>
                          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm flex flex-col items-center justify-center w-full h-full">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Sekretaris 1</p>
                            <p className="font-semibold text-dark-green text-sm">Aulia Panca Oktaviani Putri</p>
                            <p className="text-slate-500 text-[10px]">XI IPA 1</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-px h-4 shrink-0 bg-slate-200 hidden sm:block"></div>
                          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm flex flex-col items-center justify-center w-full h-full">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Sekretaris 2</p>
                            <p className="font-semibold text-dark-green text-sm">Nadila Puspa Rini</p>
                            <p className="text-slate-500 text-[10px]">X 10</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-px h-4 shrink-0 bg-slate-200 hidden sm:block"></div>
                          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm flex flex-col items-center justify-center w-full h-full">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Bendahara 1</p>
                            <p className="font-semibold text-dark-green text-sm">Indri Pratiwi</p>
                            <p className="text-slate-500 text-[10px]">XI IPS 11</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-px h-4 shrink-0 bg-slate-200 hidden sm:block"></div>
                          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm flex flex-col items-center justify-center w-full h-full">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Bendahara 2</p>
                            <p className="font-semibold text-dark-green text-sm">Annisa Agustina</p>
                            <p className="text-slate-500 text-[10px]">X 11</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Line down to Tier 3 */}
                    <div className="flex justify-center">
                      <div className="w-px h-6 shrink-0 bg-slate-200 hidden sm:block"></div>
                    </div>

                    {/* Tier 3: 4 Komisi */}
                    <div className="relative">
                      <div
                        className="absolute top-0 h-px bg-slate-200 hidden sm:block left-[calc((100%_-_3rem)/8)] w-[calc(75%_+_0.75rem)]"
                        aria-hidden
                      />
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {komisiData.map((k) => (
                          <div key={k.id} className="flex flex-col items-center">
                            <div className="w-px h-4 shrink-0 bg-slate-200 hidden sm:block"></div>
                            <button
                              onClick={() => setActiveTab(k.id)}
                              className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md hover:border-gold transition-all cursor-pointer flex flex-col items-center w-full"
                            >
                              <div className="w-12 h-12 rounded-lg bg-vanilla/20 text-goldenrod flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                                {k.name.replace('Komisi ', 'K')}
                              </div>
                              <h4 className="font-semibold text-dark-green text-sm">
                                {k.name}
                              </h4>
                              <p className="text-slate-500 text-[11px] mt-1 line-clamp-2">
                                {k.title}
                              </p>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={activeTab === 'proker' ? 'mt-6 block' : 'hidden'}>
                <div className="reveal">
                  <h2 className="text-2xl font-bold text-dark-green mb-2 text-center">
                    Program Kerja MPK
                  </h2>
                  <p className="text-slate-500 text-center mb-6 max-w-2xl mx-auto">
                    Inisiatif strategis MPK untuk memajukan kesejahteraan siswa
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto px-1">
                    {prokerCategoryOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setProkerCategory(opt.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                          prokerCategory === opt.id
                            ? 'bg-dark-green text-white border-dark-green'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-dark-green/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {allProkerData
                      .filter((item) => item.category === prokerCategory)
                      .map((item) => (
                        <div
                          key={`${item.category}-${item.title}`}
                          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full text-left"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2 mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-dark-green leading-tight flex-1 min-w-[min(100%,10rem)]">
                              {item.title}
                            </h3>
                            <span className="shrink-0 text-xs font-medium leading-snug text-right px-2.5 py-1.5 rounded-lg bg-goldenrod/10 text-goldenrod border border-goldenrod/20 max-w-[min(100%,14rem)] ml-auto">
                              Pelaksanaan: {item.pelaksanaan}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed mt-auto">
                            <span className="font-medium text-slate-700">Tujuan:</span>{' '}
                            {item.tujuan}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Komisi 1-4 */}
              {komisiData.map((komisi) => (
                <div key={komisi.id} className={activeTab === komisi.id ? 'mt-6 block' : 'hidden'}>
                  <div className="reveal">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-dark-green">
                        {komisi.name}
                      </h2>
                      <p className="text-goldenrod font-medium mt-1">
                        {komisi.title}
                      </p>
                      <p className="text-slate-500 max-w-2xl mx-auto mt-2 text-sm">
                        {komisi.description}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                      {komisi.members.map((member, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="w-12 h-12 rounded-full bg-dark-green text-white flex items-center justify-center text-lg font-bold shrink-0">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-dark-green">
                              {member.name}
                            </p>
                            <p className="text-slate-500 text-sm">
                              {member.kelas} ·{' '}
                              <span className="text-goldenrod">{member.jabatan}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
