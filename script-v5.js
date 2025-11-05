// 🎮 Dafzx Joki & Store v5.1 – Glass White Edition
// © 2025 Dafzx Store — Full Fitur Versi

// =============================
// 🎣 Data Produk
// =============================
const produkData = [
  {
    nama: "Astral Rod",
    harga: 15000,
    gambar: "https://i.ibb.co/3rKp0G6/fishit1.png",
    deskripsi: "Pancing langka untuk mancing dewa 🎣",
  },
  {
    nama: "Ares Rod",
    harga: 20000,
    gambar: "https://i.ibb.co/z72gWrp/fishit2.png",
    deskripsi: "Senjata para pemancing profesional 💪",
  },
  {
    nama: "Angler Rod",
    harga: 25000,
    gambar: "https://cdn-offer-photos.zeusx.com/e1505222-1ca0-4180-80ff-37aeb1bda6c8.jpg",
    deskripsi: "Rod cepat & ringan untuk AFK mancing 🎯",
  },
  {
    nama: "Ghostfind Rod",
    harga: 30000,
    gambar: "https://i.ebayimg.com/images/g/sEQAAeSwfNxo23oh/s-l400.png",
    deskripsi: "Rod hantu yang bisa dapet rare item 👻",
  },
  {
    nama: "1M Coin",
    harga: 15000,
    gambar: "https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/183/2025/10/14/Screenshot_2339-1269319107.jpg",
    deskripsi: "Tambah 1 juta coin instan 💰",
  },
  {
    nama: "AFK 24 Jam",
    harga: 10000,
    gambar: "https://cdn-icons-png.flaticon.com/512/2920/2920341.png",
    deskripsi: "Auto mancing 24 jam tanpa gangguan 💤",
  },
];

// =============================
// 🛒 Render Produk + Filter
// =============================
const produkList = document.getElementById("produkList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

function renderProduk(data = produkData) {
  produkList.innerHTML = "";
  data.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "produk-card";
    card.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}">
      <h3>${p.nama}</h3>
      <p>${p.deskripsi}</p>
      <p><strong>Rp${p.harga.toLocaleString()}</strong></p>
      <button onclick="tambahKeranjang(${i})">Tambah ke Keranjang</button>
    `;
    produkList.appendChild(card);
  });
}
renderProduk();

// 🔍 Search
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = produkData.filter((p) =>
    p.nama.toLowerCase().includes(keyword)
  );
  renderProduk(filtered);
});

// ⬇️ Sort harga
sortSelect.addEventListener("change", () => {
  let sorted = [...produkData];
  if (sortSelect.value === "termurah")
    sorted.sort((a, b) => a.harga - b.harga);
  if (sortSelect.value === "termahal")
    sorted.sort((a, b) => b.harga - a.harga);
  renderProduk(sorted);
});

// =============================
// 🧺 Keranjang
// =============================
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function tambahKeranjang(index) {
  const produk = produkData[index];
  const ada = cart.find((item) => item.nama === produk.nama);
  if (ada) ada.jumlah++;
  else cart.push({ ...produk, jumlah: 1 });
  simpanCart();
  renderCart();
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
      ${item.nama} x${item.jumlah} - Rp${(item.harga * item.jumlah).toLocaleString()}
      <button onclick="hapusItem(${i})" style="float:right;background:red;color:white;border:none;border-radius:5px;padding:2px 6px;">X</button>
    `;
    cartList.appendChild(li);
  });

  document.getElementById("totalHarga").innerText = `Rp${total.toLocaleString()}`;
}
renderCart();

function hapusItem(i) {
  cart.splice(i, 1);
  simpanCart();
  renderCart();
}

function checkout() {
  if (cart.length === 0) return alert("Keranjang masih kosong!");
  let pesan = "Halo, saya mau order di Dafzx Store:\n\n";
  cart.forEach(item => {
    pesan += `• ${item.nama} x${item.jumlah} = Rp${(item.harga * item.jumlah).toLocaleString()}\n`;
  });
  const total = document.getElementById("totalHarga").innerText;
  pesan += `\nTotal: ${total}\n\nTerima kasih!`;

  window.open(`https://wa.me/6281266435034?text=${encodeURIComponent(pesan)}`);
}

// =============================
// ⭐ Review
// =============================
function kirimReview(e) {
  e.preventDefault();
  const nama = document.getElementById("reviewNama").value.trim();
  const teks = document.getElementById("reviewText").value.trim();
  if (!nama || !teks) return alert("Isi semua kolom!");
  const review = { nama, teks };
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  reviews.push(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  renderReview();
  e.target.reset();
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

// =============================
// 🔐 Admin Panel
// =============================
function bukaAdmin() {
  const pass = prompt("Masukkan password admin:");
  if (pass === "DafzxJoki") {
    document.getElementById("adminPanel").style.display = "flex";
    renderAdminMenu();
  } else {
    alert("Password salah!");
  }
}

function tutupAdmin() {
  document.getElementById("adminPanel").style.display = "none";
}

function renderAdminMenu() {
  const adminMenu = document.getElementById("adminMenu");
  adminMenu.innerHTML = `
    <button onclick="lihatStatistik()">📊 Statistik</button>
    <button onclick="hapusData()">🗑️ Reset Semua Data</button>
    <button onclick="tutupAdmin()">Tutup</button>
  `;
}

function lihatStatistik() {
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  const totalProduk = produkData.length;
  const totalCart = JSON.parse(localStorage.getItem("cart") || "[]").length;
  alert(
    `📊 Statistik:\n\nProduk: ${totalProduk}\nReview: ${reviews.length}\nItem di Keranjang: ${totalCart}`
  );
}

function hapusData() {
  if (confirm("Yakin ingin hapus semua data (cart + review)?")) {
    localStorage.removeItem("cart");
    localStorage.removeItem("reviews");
    alert("Data berhasil dihapus!");
    renderCart();
    renderReview();
  }
}

// =============================
// 🎁 Promo & Chatbot
// =============================
const promoTexts = [
  "🔥 Diskon 10% pakai kode DAFZX2025!",
  "🎣 Joki cepat & aman — 24 jam online!",
  "💸 Bayar via Dana / Gopay / QRIS!",
  "🧊 Dafzx Glass White Edition v5.1"
];
let promoIndex = 0;

function gantiPromo() {
  document.getElementById("promoText").innerText = promoTexts[promoIndex];
  promoIndex = (promoIndex + 1) % promoTexts.length;
}
setInterval(gantiPromo, 4000);
gantiPromo();

// 💬 Chatbot Mini
window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "c") {
    alert("🤖 DafzxBot: Hai! Butuh bantuan? Chat admin via tombol WhatsApp di keranjang!");
  }
});
