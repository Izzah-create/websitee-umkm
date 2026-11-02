"use strict";

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

// Input: angka. Output: teks rupiah. Tidak mengubah DOM maupun data.
function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

// Input: stok (angka). Output: object { label, className }. Tidak ada efek samping.
function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

// Input: kategori (teks). Output: teks keterangan kategori.
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

// Input: satu object produk. Output: string HTML kartu. Tidak menyentuh DOM.
function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const badgeUnggulan = produk.unggulan
    ? `<span class="stock-badge featured">Produk unggulan</span>`
    : "";

  return `
    <article class="js-product-card">
      <h3>${produk.nama}</h3>
      <p class="category-note">${labelKategori(produk.kategori)}</p>
      <p>${produk.deskripsi}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
      ${badgeUnggulan}
    </article>
  `;
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  // app.js dimuat di semua halaman: diam saja kalau bukan halaman produk.
  if (!grid) {
    return;
  }

  // Halaman produk, tapi target lain belum ada: beri peringatan.
  if (!ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  // forEach dipakai untuk aksi (log), bukan untuk membuat data baru.
  produkUmkm.forEach((produk) => {
    console.log("Debug produk:", produk.nama, "stok:", produk.stok);
  });

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  console.log("Jumlah produk tersedia:", produkTersedia.length);

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProduk);

// Menu hamburger untuk navigasi mobile (tindak lanjut feedback P07).
function initMenuHamburger() {
  const nav = document.querySelector(".nav");
  const tombol = document.querySelector(".nav-toggle");

  // Halaman tanpa tombol/menu: tidak melakukan apa-apa.
  if (!nav || !tombol) {
    return;
  }

  // Class ini hanya ada kalau JavaScript jalan, jadi tanpa JS menu tetap tampil.
  nav.classList.add("js-ready");

  function setMenu(terbuka) {
    nav.classList.toggle("is-open", terbuka);
    tombol.setAttribute("aria-expanded", String(terbuka));
  }

  tombol.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      tombol.focus();
    }
  });

  // Saat layar melebar ke tampilan desktop, reset status menu.
  window
    .matchMedia("(min-width: 42rem)")
    .addEventListener("change", (event) => {
      if (event.matches) {
        setMenu(false);
      }
    });
}

document.addEventListener("DOMContentLoaded", initMenuHamburger);
