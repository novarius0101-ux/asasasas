
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// ## Komponen halaman Login Pelanggan
function Login({ onBack, onLoginSuccess }) {

  // ## Menyimpan email dan password pengguna
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // ## Menyimpan pesan kesalahan dan status proses
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // ## Fungsi yang berjalan saat tombol Login diklik
  async function handleLogin(e) {
    e.preventDefault()

    // ## Membersihkan pesan error sebelumnya
    setError('')
    setLoading(true)

    try {
      // ## Meminta Supabase memeriksa email dan password
      const { data, error: authError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

      // ## Menghentikan proses jika login gagal
      if (authError) {
        setError(authError.message)
        return
      }

      // ## Memastikan sesi pengguna berhasil dibuat
      if (!data.user || !data.session) {
        setError('Login belum berhasil. Coba kembali.')
        return
      }

      // ## Mengirim data pengguna ke komponen App
      onLoginSuccess(data.user)

    } catch {
      // ## Menangani masalah jaringan atau kesalahan lain
      setError('Terjadi masalah saat login. Coba lagi.')
    } finally {
      // ## Mengakhiri indikator loading
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-box">

        {/* ## Tombol kembali ke halaman beranda */}
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Kembali ke Beranda
        </button>

        <h1>Login Pelanggan</h1>
        <p>Masuk ke akun Kiting's Barbershop</p>

        {/* ## Menampilkan pesan jika login gagal */}
        {error && (
          <p className="register-error">{error}</p>
        )}

        {/* ## Formulir email dan password */}
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            required
          />

          {/* ## Mengirim formulir ke Supabase Auth */}
          <button type="submit" disabled={loading}>
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
