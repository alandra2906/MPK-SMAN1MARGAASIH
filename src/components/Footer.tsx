import { Instagram, Mail, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-green text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Tentang Laman */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">
              Tentang Laman MPK
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Laman MPK adalah salah satu program kerja Komisi 1 yang bertujuan sebagai media informasi dan komunikasi resmi untuk menyampaikan program kerja, kegiatan, serta aspirasi siswa yang mudah diakses oleh seluruh siswa/i SMAN 1 Margaasih.
            </p>
          </div>

          {/* Lokasi Sekolah */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">
              Lokasi Sekolah
            </h3>
            <div className="flex items-start gap-3 text-slate-400 text-sm">
              <div className="flex flex-col gap-3">
                <p>
                  Jl. Terusan Taman Kopo Indah 3, Mekar Rahayu, Kec. Margaasih, Kabupaten Bandung, Jawa Barat.
                  <br />
                  Kode Pos 40218
                </p>
                <a
                  href="https://maps.app.goo.gl/uHYRwbbbtvVBMya66"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 w-fit px-3 py-1.5 bg-gold/10 hover:bg-gold text-gold hover:text-dark-green text-[11px] font-bold rounded-md transition-all duration-300 border border-gold/30"
                >
                  Lihat di Google Maps
                  <br />
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">
              Hubungi Kami
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/mpk.1mga"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-400 hover:text-gold transition-colors text-sm"
              >
                <Instagram size={18} />
                <span>@mpk.1mga</span>
                <ExternalLink size={12} />
              </a>
              <a
                href="mailto:mpk.sman1margaasih.official@gmail.com?subject=Tanya%20MPK"
                className="flex items-center gap-3 text-slate-400 hover:text-gold transition-colors text-sm"
              >
                <Mail size={18} />
                <span>mpk.sman1margaasih.official@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bagian bawah footer yang dimodifikasi */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} MPK SMAN 1 Margaasih
          </p>
          
          <a
            href="https://www.instagram.com/ieah296/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-gold text-xs transition-colors duration-300 cursor-pointer"
          >
            Who made this?
          </a>
        </div>
      </div>
    </footer>
  )
}
