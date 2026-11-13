// ## Mengambil komponen halaman login
import Login from './page/login'

// ## Mengambil komponen registrasi dari folder page
import Register from './page/registrasi'

import './App.css'

import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'


function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka)
}

function App() {

  // ## Menentukan halaman yang sedang ditampilkan
const [halaman, setHalaman] = useState('beranda')
  
const [layananDatabase, setLayananDatabase] = useState([])
const [produkDatabase, setProdukDatabase] = useState([])

// ## Menyimpan akun yang berhasil login
const [user, setUser] = useState(null)

// ## Menyimpan informasi profil dan role pengguna
const [profil, setProfil] = useState(null)


  // ## Memeriksa akun yang sudah login saat website dibuka
  useEffect(() => {
    let aktif = true

    // ## Mengambil sesi login dari Supabase
    supabase.auth.getSession().then(({ data, error }) => {
      if (!aktif) return

      if (error) {
        console.error('Gagal memeriksa sesi:', error.message)
        return
      }

      // ## Menyimpan pengguna jika sesi masih tersedia
      setUser(data.session?.user ?? null)
    })

    // ## Mendengarkan perubahan login dan logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    // ## Membersihkan listener ketika komponen dihentikan
    return () => {
      aktif = false
      listener.subscription.unsubscribe()
    }
  }, [])


  // ## Membaca profil ketika pengguna login atau sesi dipulihkan
useEffect(() => {

  // ## Jika tidak ada pengguna, kosongkan profil
  if (!user?.id) {
    setProfil(null)
    return
  }

  // ## Mengambil profil pengguna dari Supabase
  ambilProfil(user.id)

}, [user?.id])


useEffect(() => {
  async function ambilProduk() {
    const { data, error } = await supabase
      .from('products')
      .select('id, nama, harga, stok, foto_url')
      .eq('aktif', true)
      .order('id', { ascending: true })

    if (error) {
      console.error('Gagal mengambil produk:', error.message)
      return
    }

    setProdukDatabase(data || [])
    console.log('Data produk dari Supabase:', data)
  }

  ambilProduk()
}, [])


useEffect(() => {
  async function ambilLayanan() {
    const { data, error } = await supabase
      .from('services')
      .select('id, nama, harga, durasi_menit')
      .eq('aktif', true)

    if (error) {
      console.error('Gagal mengambil layanan:', error.message)
      return
    }

    setLayananDatabase(data || [])
    console.log('Data layanan dari Supabase:', data)
  }

 
  // ## Menjalankan fungsi untuk mengambil layanan dari Supabase
  ambilLayanan()
}, [])


// ## Fungsi untuk mengeluarkan pengguna dari akun
async function handleLogout() {

  // ## Meminta Supabase mengakhiri sesi login
  const { error } = await supabase.auth.signOut()

  // ## Menangani kegagalan Logout
  if (error) {
    console.error('Logout gagal:', error.message)
    return
  }

  // ## Mengosongkan informasi pengguna
  setUser(null)
  setProfil(null)
  setHalaman('beranda')
}
   
  // ## Fungsi untuk mengambil profil pengguna dari Supabase
  async function ambilProfil(userId) {

    // ## Mengambil data pengguna dari tabel profiles
    const { data, error } = await supabase
      .from('profiles')
      .select('id, nama, email, role')
      .eq('id', userId)
      .single()

    // ## Memeriksa apabila data profil gagal diambil
    if (error) {
      console.error('Gagal mengambil profil:', error.message)
      setProfil(null)
      return
    }

    // ## Menyimpan profil pengguna di React
    setProfil(data)

    // ## Menampilkan role pengguna untuk pengujian
    console.log('Role pengguna:', data.role)
  }



// ========================================
// ## MENAMPILKAN HALAMAN LOGIN
// ========================================
if (halaman === 'login') {
  return (
    <Login
      onBack={() => setHalaman('beranda')}
      onLoginSuccess={(userLogin) => {
        // ## Menyimpan pengguna yang berhasil login
        setUser(userLogin)

        // ## Mengembalikan pengguna ke beranda
        setHalaman('beranda')
      }}
    />
  )
}

// ========================================
// ## MENAMPILKAN HALAMAN REGISTRASI
// ========================================
if (halaman === 'register') {
  return (
    <Register
      // ## Mengembalikan pengguna ke beranda
      onBack={() => setHalaman('beranda')}
    />
  )
}


// ========================================
// ## MENAMPILKAN HALAMAN BERANDA
// ========================================
return (
  <div className="website">
   
{/* ## NAVBAR: Menampilkan menu utama website */}
<header className="navbar">
  <a href="#beranda" className="logo">
    KITING'S <span>BARBERSHOP</span>
  </a>

  {/* ## Menu navigasi menuju bagian halaman */}
  <nav className="menu">
    <a href="#beranda">Beranda</a>
    <a href="#layanan">Layanan</a>
    <a href="#produk">Produk</a>
    <a href="#jam-operasional">Jam Operasional</a>
    <a href="#kontak">Kontak</a>
  </nav>

  {/* ## Tombol Login dan Daftar */}

<div className="auth-buttons">

  {/* ## Jika pengguna sudah login */}
  {user ? (
    <>
      {/* ## Menampilkan email akun yang sedang login */}
      <span className="user-email">
        {user.email}
      </span>

      {/* ## Tombol untuk keluar dari akun */}
      <button
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      {/* ## Tombol Login untuk pengguna yang belum masuk */}
      <button
        type="button"
        onClick={() => setHalaman('login')}
      >
        Login
      </button>

      {/* ## Tombol untuk membuka registrasi */}
      <button
        type="button"
        className="btn-primary"
        onClick={() => setHalaman('register')}
      >
        Daftar
      </button>
    </>
  )}
</div>

  {/* ## Penutup navbar */}
</header>

<main>
  {/* ## HERO: Tampilan pembuka beranda */}
  <section id="beranda" className="hero">
    <div className="hero-content">
      <p className="eyebrow">
        WELCOME TO KITING'S BARBERSHOP
      </p>

      <h1>Potong Rambut Rapi, Booking Tanpa Antre.</h1>

      <p>
        Pilih layanan favoritmu, tentukan tanggal dan
        slot waktu, lalu nikmati pelayanan terbaik kami.
      </p>

      <a href="#layanan" className="btn-booking">
        Lihat Layanan
      </a>
    </div>

    <div className="hero-image">
      <span>✂</span>
      <h2>KITING'S BARBERSHOP</h2>
      <p>YOUR STYLE, OUR PRIORITY</p>
    </div>
  </section>

  {/* ## SERVICES: Mengambil layanan dari Supabase */}
  <section id="layanan" className="section">
    <div className="section-heading">
      <p>OUR SERVICES</p>
      <h2>Layanan Kami</h2>
    </div>

    <div className="card-grid">
      {layananDatabase.map((item) => (
        <article className="card" key={item.id}>
          <div className="card-icon">✂</div>
          <h3>{item.nama}</h3>
          <p>Durasi: {item.durasi_menit} menit</p>

          {/* ## Mengubah harga menjadi format rupiah */}
          <h4>{formatRupiah(item.harga)}</h4>

          <button type="button" disabled>
            Pesan
          </button>
        </article>
      ))}
    </div>
  </section>

  {/* ## PRODUCTS: Mengambil produk dari Supabase */}
  <section id="produk" className="section products-section">
    <div className="section-heading">
      <p>OUR PRODUCTS</p>
      <h2>Produk Unggulan</h2>
    </div>

    <div className="card-grid">
      {produkDatabase.map((item) => (
        <article className="card" key={item.id}>
          <div className="product-icon">★</div>
          <h3>{item.nama}</h3>
          <h4>{formatRupiah(item.harga)}</h4>

          {/* ## Menampilkan stok produk */}
          <p>
            {item.stok > 0
              ? `Stok tersedia: ${item.stok}`
              : 'Stok habis'}
          </p>
        </article>
      ))}
    </div>
  </section>

  {/* ## INFO: Jam operasional dan kontak barbershop */}
  <section id="jam-operasional" className="info-section">
    <div>
      <h2>Jam Operasional</h2>
      <p>Informasi jam buka akan ditampilkan di sini.</p>
    </div>

    <div id="kontak">
      <h2>Kontak Kami</h2>
      <p>Informasi alamat dan nomor kontak barbershop.</p>
    </div>
  </section>
</main>

{/* ## FOOTER: Bagian bawah website */}
<footer className="footer">
  © {new Date().getFullYear()} Kiting's Barbershop.
</footer>

  </div>
)




// ## Jika bukan halaman registrasi, tampilkan halaman beranda
return (
  <div className="website">

      <header className="navbar">
        <a href="#beranda" className="logo">
          KITING'S <span>BARBERSHOP</span>
        </a>

        <nav className="menu">
          <a href="#beranda">Beranda</a>
          <a href="#layanan">Layanan</a>
          <a href="#produk">Produk</a>
          <a href="#jam-operasional">Jam Operasional</a>
          <a href="#kontak">Kontak</a>
        </nav>

        <div className="auth-buttons">
          <button type="button" disabled>Login</button>
          
{/* ## Tombol untuk membuka halaman registrasi pelanggan */}
<button
  type="button"
  className="btn-primary"
  onClick={() => setHalaman('register')}
>
  Daftar
</button>

        </div>
      </header>

      <main>
        <section id="beranda" className="hero">
          <div className="hero-content">
            <p className="eyebrow">WELCOME TO KITING'S BARBERSHOP</p>
            <h1>Potong Rambut Rapi, Booking Tanpa Antre.</h1>
            <p>
              Pilih layanan favoritmu, tentukan tanggal dan
              slot waktu, lalu nikmati pelayanan terbaik kami.
            </p>
            <a href="#layanan" className="btn-booking">
              Lihat Layanan
            </a>
          </div>

          <div className="hero-image">
            <span>✂</span>
            <h2>KITING'S BARBERSHOP</h2>
            <p>YOUR STYLE, OUR PRIORITY</p>
          </div>
        </section>

        <section id="layanan" className="section">
          <div className="section-heading">
            <p>OUR SERVICES</p>
            <h2>Layanan Kami</h2>
          </div>

          <div className="card-grid">
            {layananDatabase.map((item) => (
              <article className="card" key={item.id}>
                <div className="card-icon">✂</div>
                <h3>{item.nama}</h3>
                <p>Durasi: {item.durasi_menit} menit</p>
                <h4>{formatRupiah(item.harga)}</h4>
                <button type="button" disabled>
                  Pesan
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="produk" className="section products-section">
          <div className="section-heading">
            <p>OUR PRODUCTS</p>
            <h2>Produk Unggulan</h2>
          </div>

          <div className="card-grid">
            {produkDatabase.map((item) => (
              <article className="card" key={item.id}>
                <div className="product-icon">★</div>
                <h3>{item.nama}</h3>
                <h4>{formatRupiah(item.harga)}</h4>
                <p>
  {item.stok > 0
    ? `Stok tersedia: ${item.stok}`
    : 'Stok habis'}
</p>
              </article>
            ))}
          </div>
        </section>

        <section id="jam-operasional" className="info-section">
          <div>
            <h2>Jam Operasional</h2>
            <p>Informasi jam buka akan ditampilkan di sini.</p>
          </div>
          <div id="kontak">
            <h2>Kontak Kami</h2>
            <p>Informasi alamat dan nomor kontak barbershop.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Kiting's Barbershop.
      </footer>
    </div>
  )
}

export default App
