"use strict";

console.log("P09 JavaScript aktif");

// Data produk Cucur Sundariyah (stok bersifat dummy, sama seperti data lain di situs).
const produkUmkm = [
  {
    nama: "Cucur",
    kategori: "Camilan harian",
    harga: 2000,
    stok: 25,
    unggulan: true,
    deskripsi: "Rasa klasik gula aren lokal.",
  },
  {
    nama: "Klepon",
    kategori: "Camilan harian",
    harga: 3000,
    stok: 4,
    unggulan: true,
    deskripsi: "Sensasi gula meleleh di mulut.",
  },
  {
    nama: "Onde onde",
    kategori: "Camilan harian",
    harga: 2000,
    stok: 0,
    unggulan: false,
    deskripsi: "Bulat sempurna dan padat berisi.",
  },
  {
    nama: "Wajik",
    kategori: "Paket acara",
    harga: 2500,
    stok: 12,
    unggulan: false,
    deskripsi: "Ketan manis gula merah dengan aroma pandan khas.",
  },
];

console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

console.log(formatRupiah.format(produkUmkm[0].harga));

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Camilan harian":
      return "Camilan untuk setiap hari";
    case "Paket acara":
      return "Cocok untuk acara/hajatan";
    default:
      return "Produk UMKM";
  }
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  // app.js dimuat di semua halaman, jadi keluar dulu kalau target tidak ada.
  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
    const badgeUnggulan = produk.unggulan
      ? `<span class="stock-badge featured">Produk unggulan</span>`
      : "";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup =
      markup +
      `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p>${produk.deskripsi}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        ${badgeUnggulan}
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);
