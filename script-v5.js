// 🎣 DAFZX FISH IT STORE v100 PROMAX
// Semua fitur aktif + efek suara + admin + animasi

// ==========================
// 🐟 Data Produk Fish It
// ==========================
const produkData = [
  {
    nama: "Astral Rod",
    harga: 15000,
    gambar: "https://i.ibb.co/3rKp0G6/fishit1.png",
    deskripsi: "Pancing langka untuk mancing dewa 🎣"
  },
  {
    nama: "Ares Rod",
    harga: 20000,
    gambar: "https://i.ibb.co/z72gWrp/fishit2.png",
    deskripsi: "Senjata para pemancing profesional 💪"
  },
  {
    nama: "Angler Rod",
    harga: 25000,
    gambar: "https://cdn-offer-photos.zeusx.com/e1505222-1ca0-4180-80ff-37aeb1bda6c8.jpg",
    deskripsi: "Rod cepat & ringan untuk AFK mancing 🎯"
  },
  {
    nama: "Ghostfind Rod",
    harga: 30000,
    gambar: "https://i.ebayimg.com/images/g/sEQAAeSwfNxo23oh/s-l400.png",
    deskripsi: "Rod hantu yang bisa dapet rare item 👻"
  },
  {
    nama: "1 M Coin",
    harga: 15000,
    gambar: "https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/183/2025/10/14/Screenshot_2339-1269319107.jpg",
    deskripsi: "Tambah 1 juta coin instan 💰"
  },
  {
    nama: "AFK 24 Jam",
    harga: 10000,
    gambar: "https://cdn-icons-png.flaticon.com/512/2920/2920341.png",
    deskripsi: "Auto mancing 24 jam tanpa gangguan 💤"
  }
];

// ==========================
// 🛒 Render Produk
// ==========================
const produkList = document.getElementById("produkList");
function renderProduk() {
  produkList.innerHTML = "";
  produkData.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "produk-card glass";
    card.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}">
      <h3>${p.nama}</h3>
      <p>${p.deskripsi}</p>
      <p><strong>Rp${p.harga.toLocaleString("id-ID")}</strong></p>
      <button onclick="tambahKeranjang(${i})">Tambah</button>
    `;
    produkList.appendChild(card);
  });
}
renderProduk();

// ==========================
// 🧺 Keranjang
// ==========================
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function tambahKeranjang(index) {
  const produk = produkData[index];
  const ada = cart.find(item => item.nama === produk.nama);
  if (ada) ada.jumlah++;
  else cart.push({ ...produk, jumlah: 1 });
  simpanCart();
  renderCart();
  new Audio("https://assets.mixkit.co/sfx/preview/mixkit-interface-click-1126.mp3").play();
}

function simpanCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.harga * item.jumlah;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nama} x${item.jumlah} - Rp${(item.harga * item.jumlah).toLocaleString("id-ID")}
      <button onclick="hapusItem(${i})">❌</button>
    `;
    cartList.appendChild(li);
  });
  document.getElementById("totalHarga").innerText = `Rp${total.toLocaleString("id-ID")}`;
}
renderCart();

function hapusItem(i) {
  cart.splice(i, 1);
  simpanCart();
  renderCart();
}

function checkout() {
  if (cart.length === 0) return alert("Keranjang masih kosong!");
  let pesan = "Halo, saya mau order di DAFZX Fish It Store:%0A%0A";
  cart.forEach(item => {
    pesan += `• ${item.nama} x${item.jumlah} = Rp${(item.harga * item.jumlah).toLocaleString("id-ID")}%0A`;
  });
  const total = document.getElementById("totalHarga").innerText;
  pesan += `%0ATotal: ${total}%0A%0ATerima kasih!`;
  window.open(`https://wa.me/6281266435034?text=${pesan}`);
}

// ==========================
// ⭐ Review Pelanggan
// ==========================
function kirimReview(e) {
  e.preventDefault();
  const nama = document.getElementById("reviewNama").value.trim();
  const teks = document.getElementById("reviewText").value.trim();
  if (!nama || !teks) return alert("Isi semua kolom!");
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  reviews.push({ nama, teks });
  localStorage.setItem("reviews", JSON.stringify(reviews));
  renderReview();
  e.target.reset();
  new Audio("https://assets.mixkit.co/sfx/preview/mixkit-fast-small-sweep-transition-166.mp3").play();
}

function renderReview() {
  const reviewList = document.getElementById("reviewList");
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  reviewList.innerHTML = "";
  reviews.forEach(r => {
    const div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML = `<strong>${r.nama}</strong><br>${r.teks}`;
    reviewList.appendChild(div);
  });
}
renderReview();

// ==========================
// 🔐 Admin Panel
// ==========================
function bukaAdmin() {
  const pass = prompt("Masukkan password admin:");
  if (pass === "DafzxJoki") {
    alert("✅ Selamat datang, Admin Fish It Store!");
    const stats = `
Produk: ${produkData.length}
Review: ${(JSON.parse(localStorage.getItem("reviews")||"[]")).length}
Keranjang: ${cart.length}
`;
    alert(stats);
    new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-level-completed-2059.mp3").play();
  } else {
    alert("❌ Password salah!");
  }
}

// Klik kanan 3× → buka admin
let klikKanan = 0;
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  klikKanan++;
  if (klikKanan >= 3) {
    bukaAdmin();
    klikKanan = 0;
  }
});

// ==========================
// 💬 Promo & Efek Cahaya
// ==========================
const promoTexts = [
  "🎣 Promo Fish It Rod Diskon 10%!",
  "💰 Top Up Cepat dan Aman – DAFZX Store!",
  "🌊 Event Rare Rod Minggu Ini!",
  "🧊 v100 PROMAX Hijau-Black Edition!"
];
let promoIndex = 0;
function gantiPromo() {
  document.getElementById("promoText").innerText = promoTexts[promoIndex];
  promoIndex = (promoIndex + 1) % promoTexts.length;
}
setInterval(gantiPromo, 3500);
gantiPromo();

// ==========================
// 🔊 Suara Klik Global
// ==========================
document.addEventListener("click", () => {
  const snd = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3");
  snd.volume = 0.3;
  snd.play();
});
