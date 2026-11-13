
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// ## Komponen untuk menampilkan formulir registrasi
function Register({ onBack }) {

  // ## Menyimpan input yang diketik pelanggan
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [noHp, setNoHp] = useState('')
  const [password, setPassword] = useState('')

  // ## Menyimpan pesan hasil registrasi
  const [pesan, setPesan] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // ## Fungsi untuk memproses registrasi pelanggan
  async function handleRegister(e) {
    e.preventDefault()

    // ## Menghapus pesan lama
    setPesan('')
    setError('')

    // ## Memastikan password cukup panjang
    if (password.length < 8) {
      setError('Password minimal 8 karakter.')
      return
    }

    setLoading(true)

    // ## Mendaftarkan akun ke Supabase Auth
    const { data, error: authError } =
      await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          // ## Data tambahan untuk trigger profiles
          data: {
            nama: nama.trim(),
            no_hp: noHp.trim(),
          },
        },
      })

    // ## Menangani kesalahan registrasi
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // ## Menampilkan petunjuk sesuai status sesi
    if (data.session) {
      setPesan('Registrasi berhasil! Akun sudah masuk.')
    } else {
      setPesan(
        'Permintaan registrasi diterima. Periksa email untuk verifikasi akun jika diminta.'
      )
    }

    // ## Mengosongkan kolom password setelah berhasil
    setPassword('')
    setLoading(false)
  }

    return (
        // ## Pembungkus halaman registrasi
     <div className="register-page">

        {/* ## Kotak utama formulir pelanggan */}
        <div className="register-box">

        {/* ## Tombol kembali ke halaman beranda */}
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Kembali ke Beranda
        </button>

        <h1>Daftar Pelanggan</h1>
        <p>Buat akun Kiting's Barbershop</p>

        {/* ## Menampilkan pesan kesalahan */}
        {error && (
          <p className="register-error">{error}</p>
        )}

        {/* ## Menampilkan pesan keberhasilan */}
        {pesan && (
          <p className="register-success">{pesan}</p>
        )}

        {/* ## Formulir registrasi pelanggan */}
        <form onSubmit={handleRegister}>

          <label>Nama Lengkap</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan nama lengkap"
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            required
          />

          <label>Nomor HP</label>
          <input
            type="tel"
            value={noHp}
            onChange={(e) => setNoHp(e.target.value)}
            placeholder="08xxxxxxxxxx"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            minLength={8}
            required
          />

          {/* ## Tombol untuk mengirim data registrasi */}
          <button type="submit" disabled={loading}>
            {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
