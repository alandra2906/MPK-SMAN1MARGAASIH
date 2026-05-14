import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const komisiData = [
  {
    id: 'komisi1',
    name: 'Komisi 1',
    title: 'Penampung dan Penyalur Aspirasi',
    description: 'Komisi I berfokus dalam perannya menjadi penyalur aspirasi siswa SMA Negeri 1 Margaasih, yang mempunyai tugas utama sebagai wadah penampung aspirasi siswa, juga sebagai pengawas OSIS Sekbid 1 dan Sekbid 2.',
    groupImage: '/images/komisi/komisi1.jpeg',
    members: [
      { name: 'Callula Shafa Avila', kelas: 'XI IPA 3', jabatan: 'Ketua Komisi', image: '/images/Dokumentasi foto per orang/22.png'},
      { name: 'Alya Batrisya Said', kelas: 'XI IPS 5', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/9.png'},
      { name: 'Muhammad Alandra Fairuz', kelas: 'X 3', jabatan: 'Anggotahh', image: '/images/Dokumentasi foto per orang/18.png'},
      { name: 'Azkya Royan Maharani', kelas: 'X 4', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/20.png' },
      { name: 'Riva Sukma Amilin', kelas: 'X 5', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/25.png' },
    ],
  },
  {
    id: 'komisi2',
    name: 'Komisi 2',
    title: 'Hubungan Masyarakat',
    description: 'Komisi II berperan sebagai humas organisasi, publikasi dan dokumentasi kegiatan MPK SMA Negeri 1 Margaasih, serta bertugas sebagai pengawas kinerja OSIS Sekbid 3 dan Sekbid 4.', // Deskripsi komisi 2
    groupImage: '/images/komisi/komisi2.jpeg',
    members: [
      { name: 'Naya Widya Putri', kelas: 'XI IPA 5', jabatan: 'Ketua Komisi', image: '/images/Dokumentasi foto per orang/3.png'},
      { name: 'Seli Maulidia', kelas: 'XI IPS 3', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/6.png' },
      { name: 'Sabrina Bilqis', kelas: 'XI IPS 4', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/5.png' },
      { name: 'Azillie Zulfa Syahrushiam', kelas: 'X 7', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/24.png' },
      { name: 'Hafizha Nur Khaira', kelas: 'X 12', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/10.png' },
    ],
  },
  {
    id: 'komisi3',
    name: 'Komisi 3',
    title: 'Ekstrakulikuler dan Prestasi',
    description: 'Komisi III bertugas menjadi pengurus bidang ekstrakurikuler di SMA Negeri 1 Margaasih, juga sebagai pengawas kinerja OSIS Sekbid 5 dan 6.',
    groupImage: '/images/komisi/komisi3.jpeg',
    members: [
      { name: 'Raifa Junia Keaila', kelas: 'XI IPS 7', jabatan: 'Ketua Komisi', image: '/images/Dokumentasi foto per orang/26.png' },
      { name: 'Shevira Dwi Fitria', kelas: 'XI IPS 1', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/8.png' },
      { name: 'Neng Wini Fathu Rohmah', kelas: 'X 1', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/15.png' },
      { name: 'Assyfa Rahmi Illahi Q.J.P.K', kelas: 'X 9', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/12.png' },
    ],
  },
  {
    id: 'komisi4',
    name: 'Komisi 4',
    title: 'Keanggotaan dan Administrasi',
    description: 'Komisi IV berperan sebagai konektor (perombak, memperbaiki kesalahan) administrasi organisasi, serta sebagai pengurus Anggaran Dasar dan Rumah Tangga organisasi, juga bertugas mengawasi kinerja OSIS Sekbid 7 dan Sekbid 8.',
    groupImage: '/images/komisi/komisi4.jpg',
    members: [
      { name: 'Azriel Falco Moreno', kelas: 'XI IPA 2', jabatan: 'Ketua Komisi', image: '/images/Dokumentasi foto per orang/11.png' },
      { name: 'Syifa Raya Merlinda', kelas: 'X 2', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/14.png' },
      { name: 'Nazma Mushal Hakim', kelas: 'X 6', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/21.png' },
      { name: 'Nessa Astriyani', kelas: 'X 8', jabatan: 'Anggota', image: '/images/Dokumentasi foto per orang/4.png' },
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
{ category: 'sekretaris', title: 'Membuat File Anggota MPK', tujuan: 'Agar seluruh data MPK tersusun rapih dan tidak dan tidak mudah hilang.', pelaksanaan: 'Jangka pendek' },
  { category: 'sekretaris', title: 'Membuat File Data Keanggotaan MPK & OSIS', tujuan: 'Agar seluruh data MPK OSIS tersusun rapih, tidak mudah hilang dan gampang dicari ketika sedang membutuhkan data anggota-anggota OSIS dan MPK.', pelaksanaan: 'Jangka pendek' },
  { category: 'sekretaris', title: 'Membuat Surat Peringatan', tujuan: 'Agar seluruh anggota MPK OSIS dapat bertanggung jawab di setiap kesalahannya dengan adanya surat ini.', pelaksanaan: 'Jangka menengah' },
  { category: 'sekretaris', title: 'Membuat Lampiran Daftar Kehadiran Anggota MPK Pada Setiap Rapat', tujuan: 'Agar mengetahui dan memantau perkembangan kehadiran anggota MPK dalam setiap rapat bulanan.', pelaksanaan: 'Jangka menengah' },
  { category: 'sekretaris', title: 'Pembuatan kalender kegiatan MPK', tujuan: 'Agar dapat memastikan seluruh kegiatan berjalan sesuai rencana dan mengurangi resiko penundaan', pelaksanaan: 'Jangka menengah' },
  { category: 'sekretaris', title: 'Membuat Google drive untuk arsip MPK', tujuan: 'Agar seluruh file dan surat MPK tersusun rapi, tidak mudah hilang, serta mudah dibagikan kepada sekretaris MPK periode berikutnya sebagai referensi', pelaksanaan: 'Jangka panjang' },
  { category: 'sekretaris', title: 'Membuat Notulensi Setiap Rapat', tujuan: 'Agar terdapat ringkasan tentang materi rapat yang telah disampaikan.', pelaksanaan: 'Jangka panjang' },
  { category: 'sekretaris', title: 'Membuat SIPRO-MPK (Sistem Proposal Terpadu)', tujuan: 'Tujuannya untuk mempermudah proses pengajuan izin dan persetujuan dalam pelaksanaan kegiatan atau acara MPK', pelaksanaan: 'Jangka panjang' },
  { category: 'bendahara', title: 'Mengadakan Iuran Kas Rutin', tujuan: 'Melatih kedisiplinan dan tanggung jawab seorang anggota dengan membayar iuran kas sebesar Rp.10.000/bulan degan tujuan menambah dan menjaga kestabilan kas MPK.', pelaksanaan: 'Jangka Panjang' },
  { category: 'bendahara', title: 'Mencatat Pengeluaran dan Pemasukan', tujuan: 'Untuk transparansi, mengetahui pengeluaran dan pemasukan dana dengan jelas.', pelaksanaan: 'Jangka Panjang' },
  { category: 'bendahara', title: 'Konsultasi Keuangan Dengan Ketua dan Wakil MPK', tujuan: 'Untuk memastikan pengelolaan dan penggunaan dana MPK berjalan dengan lancar.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi1', title: 'KoPi (Kotak Aspirasi)', tujuan: 'Menampung aspirasi melalui kotak aspirasi yang akan disediakan untuk menampung suara dari siswa/i SMAN 1 Margaasih.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi1', title: 'GMYA (Give Me Your Aspiration)', tujuan: 'Menampung kritik/saran dari siswa/i SMAN 1 Margaasih mengenai kegiatan dan lomba-lomba untuk acara yang telah diadakan.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi1', title: 'Laman MPK', tujuan: 'Sebagai media informasi dan komunikasi resmi untuk menyampaikan program kerja, kegiatan, serta aspirasi siswa yang mudah diakses oleh seluruh siswa/i SMAN 1 Margaasih.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi1', title: 'SAKEDAP (Saran Kegiatan dan Perlombaan)', tujuan: 'Menampung aspirasi siswa/i pra event melalui Google Form yang akan diunggah pada Story Instagram MPK dan OSIS yang sudah disediakan.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi1', title: 'PENA (Pesan Anonim)', tujuan: 'Sebagai wadah penyaluran pesan siswa/i SMAN 1 Margaasih secara anonim kepada para pengurus MPK dan OSIS.', pelaksanaan: 'Jangka Pendek' },
  { category: 'komisi2', title: 'Poster Peringatan Hari Besar dan Nasional', tujuan: 'Menumbuhkan rasa nasionalisme dan semangat kebangsaan, berupa poster yang di buat. Di share melalui story Instagram MPK.', pelaksanaan: 'Jangka panjang' },
  { category: 'komisi2', title: 'Lebih Mengaktifkan Media Sosial (Instagram)', tujuan: 'Mendokumentasikan setiap kegiatan yang berhubungan dengan OSIS.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi2', title: 'Membuat Broadcast Pada Setiap Kegiatan Rapat', tujuan: 'Tujuan proker ini untuk membangun sistem komunikasi yang terstruktur dan jelas bagi pengurus.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi2', title: 'Membuat Poster Orasi Pemilihan Ketua dan Wakil Ketua MPK Masa Periode Selanjutnya', tujuan: 'Membuat poster informasi tentang pergantian ketua dan wakil ketua MPK untuk periode selanjutnya.', pelaksanaan: 'Jangka pendek' },
  { category: 'komisi3', title: 'Melaksanakan Kegiatan Sosialiasi Ekstrakurikuler', tujuan: 'Agar seluruh siswa/siswi SMA Negeri 1 Margasih memperoleh pemahaman mengenai pilihan ekstrakurikuler yang ada serta terdorong untuk mengikuti kegiatan ekstrakurikuler sesuai dengan minat dan bakat masing-masing.', pelaksanaan: 'Jangka Pendek' },
  { category: 'komisi3', title: 'Tanda Penghargaan Ekstrakurikuler Yang Paling Banyak Meraih Juara Selama Setahun', tujuan: 'Memberikan motivasi serta rasa bangga bagi seluruh anggota esktrakurikuler atas kerja kerja mereka.', pelaksanaan: 'Jangka Pendek' },
  { category: 'komisi3', title: 'Koordinasi Rutin Dengan Pembina dan Ketua Ekstrakurikuler Terkait Jadwal Serta Kegiatan Eskul', tujuan: 'Agar pelaksanaan kegiatan ekstrakurikuler dapat berjalan dengan tertib dan sesuai dengan jadwal yang telah ditetapkan.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi3', title: 'Memfasilitasi Penyampaian Informasi Kegiatan Ekstrakurikuler Melalui Media Informasi Yang Tersedia', tujuan: 'Agar mendukung keterbukaan informasi kegiatan ekstrakurikulerkepada seluruh siswa/siswi.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi3', title: 'Mendata Pencapaian Hasil Perlombaan yang Telah Diikuti oleh Anggota Ekstrakurikuler', tujuan: 'Memberikan apresiasi atas keberhasilan agar memotivasi semangat siswa dalam berprestasi.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi3', title: 'Meninjau Pelaksanaan Latihan Mingguan Sesuai Ketetapan Pengurus Ekstrakurikuler', tujuan: 'Menjamin kelancaran seluruh agenda tanpa ada gangguan.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi3', title: 'Merangkum Seluruh Data Kegiatan dan Pencapaian Selama Satu Tahun Kepengurusan', tujuan: 'Menjadi bahan evaluasi bagi pengurus selanjutnya agar menjadi lebih baik.', pelaksanaan: 'Jangka Panjang' },
  { category: 'komisi4', title: 'Pemantauan Awal Terhadap Pelaksanaan AD/ART OSIS/MPK', tujuan: 'Melakukan pemantauan awal terhadap pelaksanaan AD/ART OSIS/MPK pada awal masa jabatan agar seluruh kegiatan dan struktur organisasi berjalan sesuai ketentuan.', pelaksanaan: 'Jangka pendek' },
  { category: 'komisi4', title: 'Mengawasi Kinerja OSIS Dalam Melaksanakan Tugas', tujuan: 'Mengawasi kinerja OSIS dalam melaksanakan kegiatanya.', pelaksanaan: 'Jangka menengah' },
  { category: 'komisi4', title: 'Melaksanakan Rapat Rutin MPK', tujuan: 'Melaksanakan rapat rutin tiap 2 bulan untuk membahas kembali program kerja dan rencana kedepan', pelaksanaan: 'Jangka panjang' },
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
  const [prokerCategory, setProkerCategory] = useState<ProkerCategory>('sekretaris')

  // Daftar Urutan Tab untuk Navigasi Panah
  const tabList = ['struktur', 'proker', 'komisi1', 'komisi2', 'komisi3', 'komisi4']

  const handleNextTab = () => {
    const currentIndex = tabList.indexOf(activeTab)
    if (currentIndex < tabList.length - 1) {
      setActiveTab(tabList[currentIndex + 1])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevTab = () => {
    const currentIndex = tabList.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabList[currentIndex - 1])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-goldenrod text-xs font-mono-data uppercase tracking-wider mb-4">
            <span className="w-8 h-[2px] bg-goldenrod" />
            Profil Organisasi
            <span className="w-8 h-[2px] bg-goldenrod" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-green">
            About MPK
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Mengenal lebih dekat struktur, program, dan anggota Majelis
            Perwakilan Kelas periode 2025/2026.
          </p>
        </div>

        {/* Tabs Main Container */}
        <div className="mb-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto pb-4 hide-scrollbar" id="tabs-container">
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

            {/* Content Area with Centralized Navigation Arrows */}
            <div className="relative mt-6 min-h-[400px] w-full">
              {/* Navigation Arrows - Mobile Only, Vertical Center */}
              <button
                onClick={handlePrevTab}
                disabled={activeTab === tabList[0]}
                className="md:hidden absolute -left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/90 backdrop-blur shadow-lg border border-slate-100 rounded-full flex items-center justify-center text-slate-600 cursor-pointer disabled:opacity-20 transition-all active:scale-90"
                aria-label="Previous tab"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNextTab}
                disabled={activeTab === tabList[tabList.length - 1]}
                className="md:hidden absolute -right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/90 backdrop-blur shadow-lg border border-slate-100 rounded-full flex items-center justify-center text-slate-600 cursor-pointer disabled:opacity-20 transition-all active:scale-90"
                aria-label="Next tab"
              >
                <ChevronRight size={24} />
              </button>

              <AnimatePresence mode="wait"> {/* AnimatePresence membungkus semua konten tab */}
                {activeTab === 'struktur' && (
                  <motion.div
                    key="struktur"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold text-dark-green text-center mb-2">
                      Struktur Organisasi MPK
                    </h2>
                    <p className="text-slate-500 text-center mb-10">
                      Periode 2025 / 2026
                    </p>

                    <div className="max-w-5xl mx-auto px-4">
                      <div className="flex flex-col items-center mb-0">
                        <div className="bg-white border border-slate-200 rounded-xl py-3 px-4 text-center shadow-sm w-52 relative z-10">
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Pembina MPK</p>
                          <p className="font-bold text-dark-green text-base leading-tight">Adang Cucu Cahyana, S.Pd.</p>
                        </div>
                        <div className="w-px h-6 sm:h-12 bg-slate-200"></div>
                      </div>

                      <div className="relative max-w-4xl mx-auto mb-0">
                        <div className="absolute top-0 h-px bg-slate-200 hidden sm:block left-[calc((100%_-_3rem)/4)] w-[calc(50%_+_1.5rem)]" aria-hidden />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 relative">
                          <div className="flex flex-col items-center">
                            <div className="w-px h-6 sm:h-12 shrink-0 bg-slate-200 hidden sm:block"></div>
                            <motion.div 
                              whileHover={{ scale: 1.03 }}
                              className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center min-h-[260px] w-full"
                            >
                              <div className="w-32 h-32 rounded-full overflow-hidden mb-5 border-4 border-dark-green/10 shadow-md bg-slate-50">
                                <img 
                                  src="/images/Dokumentasi foto per orang/7.png" 
                                  alt="Sherin Alivka S - Ketua MPK" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h3 className="font-bold text-dark-green text-lg uppercase tracking-wide">Ketua MPK</h3>
                              <p className="text-goldenrod font-bold text-2xl mt-1">Sherin Alivka S</p>
                              <p className="text-slate-500 text-base mt-1">XI IPA 2</p>
                            </motion.div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-px h-6 sm:h-12 shrink-0 bg-slate-200 hidden sm:block"></div>
                            <motion.div 
                              whileHover={{ scale: 1.03 }}
                              className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center min-h-[260px] w-full"
                            >
                              <div className="w-32 h-32 rounded-full overflow-hidden mb-5 border-4 border-goldenrod/10 shadow-md bg-slate-50">
                                <img 
                                  src="/images/Dokumentasi foto per orang/2.png" 
                                  alt="Nailah Khoirunnisa - Wakil Ketua MPK" 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h3 className="font-bold text-dark-green text-lg uppercase tracking-wide">Wakil Ketua MPK</h3>
                              <p className="text-goldenrod font-bold text-2xl mt-1">Nailah Khoirunnisa</p>
                              <p className="text-slate-500 text-base mt-1">XI IPA 4</p>
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-6">
                        <div className="flex justify-center">
                          <div className="w-px h-6 sm:h-12 shrink-0 bg-slate-200 hidden sm:block" />
                        </div>
                        <div className="relative mb-4">
                          <div className="absolute top-0 h-px bg-slate-200 hidden lg:block left-[calc((100%_-_6rem)/8)] w-[calc(75%_+_1.5rem)]" aria-hidden />
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                            {[
                              { label: 'Sekretaris 1', name: 'Aulia Panca Oktaviani Putri', kelas: 'XI IPA 1', image: '/images/Dokumentasi foto per orang/23.png' },
                              { label: 'Sekretaris 2', name: 'Nadila Puspa Rini', kelas: 'X 10', image: '/images/Dokumentasi foto per orang/16.png' },
                              { label: 'Bendahara 1', name: 'Indri Pratiwi', kelas: 'XI IPS 6', image: '/images/Dokumentasi foto per orang/1.png' },
                              { label: 'Bendahara 2', name: 'Annisa Agustina', kelas: 'X 11', image: '/images/Dokumentasi foto per orang/17.png' }
                            ].map((staff, idx) => (
                              <div key={idx} className="flex flex-col items-center">
                                <div className="w-px h-6 sm:h-12 shrink-0 bg-slate-200 hidden lg:block"></div>
                                <motion.div 
                                  whileHover={{ scale: 1.03 }}
                                  className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm flex flex-col items-center justify-center w-full h-full min-h-[210px]"
                                >
                                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">{staff.label}</p>
                                  {(staff as any).image ? (
                                    <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-slate-200 shadow-sm bg-slate-50">
                                      <img
                                        src={(staff as any).image}
                                        alt={staff.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="w-24 h-24 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-4xl font-bold shrink-0 mb-3">
                                      {staff.name.charAt(0)}
                                    </div>
                                  )}
                                  <p className="font-bold text-dark-green text-base leading-tight mb-1">{staff.name}</p>
                                  <p className="text-slate-500 text-xs">{staff.kelas}</p>
                                </motion.div>
                              </div>
                            ))} 
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className="w-px h-6 sm:h-12 shrink-0 bg-slate-200 hidden sm:block"></div>
                        </div>
                        <div className="relative">
                          <div className="absolute top-0 h-px bg-slate-200 hidden lg:block left-[calc((100%_-_3rem)/8)] w-[calc(75%_+_0.75rem)]" aria-hidden />
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                            {komisiData.map((k) => (
                              <div key={k.id} className="flex flex-col items-center">
                                <div className="w-px h-4 shrink-0 bg-slate-200 hidden sm:block"></div>
                                <motion.button
                                  onClick={() => setActiveTab(k.id)}
                                  whileHover={{ scale: 1.03 }}
                                  className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md hover:border-gold transition-all cursor-pointer flex flex-col items-center w-full h-full"
                                >
                                  <h4 className="font-semibold text-dark-green text-base">{k.name}</h4>
                                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">{k.title}</p>
                                </motion.button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              {activeTab === 'proker' && ( /* Rendering kondisional untuk Proker */
                <motion.div
                  key="proker"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-3xl font-bold text-dark-green mb-2 text-center">Program Kerja MPK</h2>
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
                              <span className="font-medium text-slate-700">Tujuan:</span> {item.tujuan}
                            </p>
                          </div>
                        ))}
                    </div>
                </motion.div>
              )}

              {/* Komisi 1-4 */}
              {komisiData.map((komisi) => (
                activeTab === komisi.id && (
                  <motion.div
                    key={komisi.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div>
                      <div className="relative max-w-5xl mx-auto mb-10 h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                        <motion.img 
                          src={(komisi as any).groupImage} 
                          alt={komisi.name} 
                          className="absolute inset-0 w-full h-full object-cover"
                          animate={{ scale: [1, 1.1] }}
                          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold leading-tight">{komisi.name}</h2>
                          <p className="text-xs sm:text-base text-yellow-400 font-semibold mt-1">{komisi.title}</p>
                          <p className="text-[10px] sm:text-sm md:text-base text-slate-200 mt-2 max-w-2xl leading-tight">{komisi.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mt-6">
                        {komisi.members.map((member, idx) => (
                          <motion.div 
                            key={idx} 
                            whileHover={{ scale: 1.03 }}
                            className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow h-full"
                          >
                            <div className="w-32 h-32 rounded-full bg-dark-green text-white flex items-center justify-center text-4xl font-bold shrink-0 overflow-hidden border-4 border-slate-50 shadow-md mb-3">
                              {(member as any).image ? (
                                <img src={(member as any).image} alt={member.name} className="w-full h-full object-cover" />
                              ) : (
                                member.name.charAt(0)
                              )}
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-dark-green text-lg leading-tight">{member.name}</p>
                              <p className="text-slate-500 text-sm">
                                {member.kelas} · <span className="text-goldenrod font-semibold">{member.jabatan}</span>
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
