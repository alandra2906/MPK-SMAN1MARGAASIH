import { defineConfig } from "tinacms";

// Cabang git yang aktif untuk TinaCloud (atau local dev)
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Kosongkan untuk mode lokal (Self-hosted / Local Dev)
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "about",
        label: "Halaman About (Profil & Proker)",
        path: "src/content/about",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "pembina",
            label: "Pembina MPK",
            fields: [
              { type: "string", name: "title", label: "Jabatan Pembina" },
              { type: "string", name: "name", label: "Nama Pembina" },
            ],
          },
          {
            type: "object",
            name: "ketua",
            label: "Ketua MPK",
            fields: [
              { type: "string", name: "title", label: "Jabatan" },
              { type: "string", name: "name", label: "Nama Ketua" },
              { type: "string", name: "kelas", label: "Kelas" },
              { type: "image", name: "image", label: "Foto Ketua" },
            ],
          },
          {
            type: "object",
            name: "wakil",
            label: "Wakil Ketua MPK",
            fields: [
              { type: "string", name: "title", label: "Jabatan" },
              { type: "string", name: "name", label: "Nama Wakil Ketua" },
              { type: "string", name: "kelas", label: "Kelas" },
              { type: "image", name: "image", label: "Foto Wakil Ketua" },
            ],
          },
          {
            type: "object",
            name: "pengurusInti",
            label: "Pengurus Inti (Sekretaris & Bendahara)",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.label || 'Pengurus'}: ${item?.name || 'Belum diisi'}`,
              }),
            },
            fields: [
              { type: "string", name: "label", label: "Jabatan (e.g. Sekretaris 1, Bendahara 1)" },
              { type: "string", name: "name", label: "Nama Lengkap" },
              { type: "string", name: "kelas", label: "Kelas" },
              { type: "image", name: "image", label: "Foto" },
            ],
          },
          {
            type: "object",
            name: "komisi",
            label: "Daftar Komisi & Anggota",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name || "Komisi",
              }),
            },
            fields: [
              { type: "string", name: "id", label: "ID Komisi (contoh: komisi1, komisi2, komisi3, komisi4)", required: true },
              { type: "string", name: "name", label: "Nama Komisi (contoh: Komisi 1)" },
              { type: "string", name: "title", label: "Fokus / Gelar Komisi" },
              {
                type: "string",
                name: "description",
                label: "Deskripsi Tugas",
                ui: { component: "textarea" },
              },
              { type: "image", name: "groupImage", label: "Banner / Foto Bersama Komisi" },
              {
                type: "object",
                name: "members",
                label: "Anggota Komisi",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: `${item?.name || "Anggota"} (${item?.jabatan || "Jabatan"})`,
                  }),
                },
                fields: [
                  { type: "string", name: "name", label: "Nama Anggota" },
                  { type: "string", name: "kelas", label: "Kelas" },
                  { type: "string", name: "jabatan", label: "Jabatan (contoh: Ketua Komisi / Anggota)" },
                  { type: "image", name: "image", label: "Foto Anggota" },
                  { type: "string", name: "link", label: "Link Sosial Media (Opsional, e.g. Instagram)" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "proker",
            label: "Program Kerja (Proker)",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `[${item?.category || 'Umum'}] ${item?.title || 'Proker'}`,
              }),
            },
            fields: [
              {
                type: "string",
                name: "category",
                label: "Kategori",
                options: [
                  { value: "sekretaris", label: "Sekretaris" },
                  { value: "bendahara", label: "Bendahara" },
                  { value: "komisi1", label: "Komisi 1" },
                  { value: "komisi2", label: "Komisi 2" },
                  { value: "komisi3", label: "Komisi 3" },
                  { value: "komisi4", label: "Komisi 4" },
                ],
                required: true,
              },
              { type: "string", name: "title", label: "Judul Proker", required: true },
              {
                type: "string",
                name: "tujuan",
                label: "Tujuan Proker",
                ui: { component: "textarea" },
              },
              { type: "string", name: "pelaksanaan", label: "Jangka Waktu Pelaksanaan (e.g. Jangka pendek, Jangka menengah, Jangka panjang)" },
              { type: "image", name: "imgSrc", label: "Gambar / Logo Proker (Opsional)" },
            ],
          },
        ],
      },
      {
        name: "gallery",
        label: "Halaman Gallery (Alumni & Dokumentasi)",
        path: "src/content/gallery",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "alumni",
            label: "Hall of Fame (Daftar Periode Kepengurusan)",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.year || 'Periode'}: ${item?.ketua || 'Ketua'}`,
              }),
            },
            fields: [
              { type: "string", name: "year", label: "Periode (contoh: 2025/2026)", required: true },
              { type: "string", name: "ketua", label: "Nama Ketua (contoh: Sherin Alivka S (XII IPA 2))", required: true },
              { type: "string", name: "wakil", label: "Nama Wakil Ketua (contoh: Nailah Khoirunnisa (XII IPA 4))", required: true },
            ],
          },
          {
            type: "object",
            name: "moments",
            label: "Our Memorable Moment (Dokumentasi Foto)",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.caption || "Foto Dokumentasi",
              }),
            },
            fields: [
              { type: "image", name: "src", label: "File Foto / Gambar", required: true },
              { type: "string", name: "caption", label: "Judul / Keterangan Foto", required: true },
            ],
          },
        ],
      },
      {
        name: "aspirasi",
        label: "Halaman Aspirasi (Formulir Embed)",
        path: "src/content/aspirasi",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "gmyaFormUrl",
            label: "Link Embed Formulir GMYA (Zoho / Google Form URL)",
            required: true,
          },
          {
            type: "image",
            name: "gmyaBanner",
            label: "Gambar Banner GMYA (Opsional)",
          },
          {
            type: "string",
            name: "sakedapFormUrl",
            label: "Link Embed Formulir SAKEDAP (Zoho / Google Form URL)",
            required: true,
          },
          {
            type: "image",
            name: "sakedapBanner",
            label: "Gambar Banner SAKEDAP (Opsional)",
          },
        ],
      },
    ],
  },
});
