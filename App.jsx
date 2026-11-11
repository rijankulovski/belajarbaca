import React, { useEffect, useState } from 'react'
import { VOKAL, KONSONAN, CONTOH_HURUF, KATA, KALIMAT } from './data.js'

/* ---------- Suara (Text-to-Speech bahasa Indonesia) ---------- */
const NAMA_HURUF = {
  a: 'a', i: 'i', u: 'u', e: 'e', o: 'o', b: 'be', c: 'ce', d: 'de', f: 'ef', g: 'ge', h: 'ha',
  j: 'je', k: 'ka', l: 'el', m: 'em', n: 'en', p: 'pe', r: 'er', s: 'es', t: 'te', w: 'we', y: 'ye',
}
let suaraID = null
function muatSuara() {
  if (!('speechSynthesis' in window)) return
  const v = window.speechSynthesis.getVoices()
  suaraID = v.find((x) => x.lang === 'id-ID') || v.find((x) => x.lang?.startsWith('id')) || null
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  muatSuara()
  window.speechSynthesis.onvoiceschanged = muatSuara
}
function ucap(teks, rate = 0.8) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(teks)
  u.lang = 'id-ID'
  if (suaraID) u.voice = suaraID
  u.rate = rate
  u.pitch = 1.1
  window.speechSynthesis.speak(u)
}

/* ---------- Bintang (disimpan di perangkat) ---------- */
function bacaBintang() {
  try { return Number(localStorage.getItem('bintang') || 0) } catch { return 0 }
}
function simpanBintang(n) {
  try { localStorage.setItem('bintang', String(n)) } catch { /* abaikan */ }
}

const acak = (arr) => [...arr].sort(() => Math.random() - 0.5)
const ambil = (arr) => arr[Math.floor(Math.random() * arr.length)]

const MENU = [
  { id: 'vokal', judul: 'Huruf Vokal', ikon: 'AIUEO', warna: '#ff6b6b', ket: 'a i u e o' },
  { id: 'huruf', judul: 'Huruf Konsonan', ikon: 'Bb', warna: '#4dabf7', ket: 'b c d …' },
  { id: 'suku', judul: 'Suku Kata', ikon: 'ba', warna: '#51cf66', ket: 'ba bi bu be bo' },
  { id: 'kata', judul: 'Membaca Kata', ikon: '📖', warna: '#fcc419', ket: 'bo-la, bu-ku' },
  { id: 'kalimat', judul: 'Kalimat Pendek', ikon: '💬', warna: '#cc5de8', ket: 'ini bola' },
  { id: 'main-huruf', judul: 'Tebak Huruf Awal', ikon: '🎯', warna: '#ff922b', ket: 'Permainan' },
  { id: 'main-kata', judul: 'Tebak Gambar', ikon: '🧩', warna: '#20c997', ket: 'Permainan' },
]

export default function App() {
  const [layar, setLayar] = useState('beranda')
  const [bintang, setBintang] = useState(bacaBintang)
  const tambahBintang = () => setBintang((b) => { simpanBintang(b + 1); return b + 1 })
  const menu = MENU.find((m) => m.id === layar)

  return (
    <div className="app">
      <header className="atas">
        {layar !== 'beranda' ? (
          <button className="kembali" onClick={() => { window.speechSynthesis?.cancel(); setLayar('beranda') }} aria-label="Kembali">⬅</button>
        ) : <span className="logo">Aa</span>}
        <h1>{menu ? menu.judul : 'Ayo Membaca!'}</h1>
        <div className="bintang" aria-label={`${bintang} bintang`}>⭐ {bintang}</div>
      </header>

      <main className="isi">
        {layar === 'beranda' && <Beranda onPilih={setLayar} />}
        {layar === 'vokal' && <KartuHuruf daftar={VOKAL} warna="#ff6b6b" />}
        {layar === 'huruf' && <KartuHuruf daftar={KONSONAN} warna="#4dabf7" />}
        {layar === 'suku' && <SukuKata />}
        {layar === 'kata' && <BacaKata />}
        {layar === 'kalimat' && <BacaKalimat />}
        {layar === 'main-huruf' && <MainHurufAwal onBenar={tambahBintang} />}
        {layar === 'main-kata' && <MainTebakGambar onBenar={tambahBintang} />}
      </main>
    </div>
  )
}

function Beranda({ onPilih }) {
  return (
    <>
      <p className="sapa">Halo! Mau belajar apa hari ini? 👋</p>
      <div className="grid-menu">
        {MENU.map((m) => (
          <button key={m.id} className="kartu-menu" style={{ '--w': m.warna }}
            onClick={() => { ucap(m.judul); onPilih(m.id) }}>
            <span className="ikon">{m.ikon}</span>
            <span className="judul">{m.judul}</span>
            <span className="ket">{m.ket}</span>
          </button>
        ))}
      </div>
      <p className="catatan">Ketuk huruf atau gambar untuk mendengar suaranya 🔊</p>
    </>
  )
}

/* ---------- Kartu huruf: vokal & konsonan ---------- */
function KartuHuruf({ daftar, warna }) {
  const [i, setI] = useState(0)
  const h = daftar[i]
  const [kata, gambar] = CONTOH_HURUF[h]
  useEffect(() => { ucap(NAMA_HURUF[h]) }, [h])
  return (
    <div className="pelajaran">
      <button className="huruf-besar" style={{ background: warna }} onClick={() => ucap(NAMA_HURUF[h])}>
        {h.toUpperCase()}<span className="kecil">{h}</span>
      </button>
      <button className="contoh" onClick={() => ucap(`${NAMA_HURUF[h]}, ${kata}`)}>
        <span className="emoji">{gambar}</span>
        <span><b style={{ color: warna }}>{h}</b>{kata.slice(1)}</span>
      </button>
      <div className="deret">
        {daftar.map((x, idx) => (
          <button key={x} className={'chip' + (idx === i ? ' aktif' : '')} style={{ '--w': warna }}
            onClick={() => setI(idx)}>{x}</button>
        ))}
      </div>
      <Navigasi i={i} n={daftar.length} setI={setI} />
    </div>
  )
}

/* ---------- Suku kata: ba bi bu be bo ---------- */
function SukuKata() {
  const [k, setK] = useState('b')
  return (
    <div className="pelajaran">
      <p className="petunjuk">Pilih huruf, lalu ketuk suku katanya</p>
      <div className="deret">
        {KONSONAN.map((x) => (
          <button key={x} className={'chip' + (x === k ? ' aktif' : '')} style={{ '--w': '#51cf66' }}
            onClick={() => { setK(x); ucap(NAMA_HURUF[x]) }}>{x}</button>
        ))}
      </div>
      <div className="rumus">
        <span className="kotak hijau">{k}</span> + <span className="kotak merah">a i u e o</span>
      </div>
      <div className="grid-suku">
        {VOKAL.map((v) => (
          <button key={v} className="suku" onClick={() => ucap(k + v, 0.7)}>
            <span className="kons">{k}</span><span className="vok">{v}</span>
          </button>
        ))}
      </div>
      <button className="tombol" onClick={() => ucap(VOKAL.map((v) => k + v).join(', '), 0.7)}>🔊 Baca semua</button>
    </div>
  )
}

/* ---------- Membaca kata per suku ---------- */
function BacaKata() {
  const [i, setI] = useState(0)
  const [nyala, setNyala] = useState(-1)
  const k = KATA[i]
  useEffect(() => { setNyala(-1) }, [i])

  const ejaSemua = async () => {
    for (let s = 0; s < k.suku.length; s++) {
      setNyala(s); ucap(k.suku[s], 0.7)
      await new Promise((r) => setTimeout(r, 900))
    }
    setNyala(k.suku.length); ucap(k.kata, 0.8)
  }

  return (
    <div className="pelajaran">
      <div className="emoji-besar">{k.gambar}</div>
      <div className="baris-suku">
        {k.suku.map((s, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="strip">-</span>}
            <button className={'suku-kata' + (nyala === idx ? ' nyala' : '')}
              onClick={() => { setNyala(idx); ucap(s, 0.7) }}>{s}</button>
          </React.Fragment>
        ))}
      </div>
      <button className={'kata-utuh' + (nyala === k.suku.length ? ' nyala' : '')}
        onClick={() => { setNyala(k.suku.length); ucap(k.kata) }}>{k.kata}</button>
      <button className="tombol" onClick={ejaSemua}>🔊 Eja bersama</button>
      <Navigasi i={i} n={KATA.length} setI={setI} />
    </div>
  )
}

/* ---------- Kalimat pendek ---------- */
function BacaKalimat() {
  const [i, setI] = useState(0)
  const [nyala, setNyala] = useState(-1)
  const k = KALIMAT[i]
  const kata = k.teks.split(' ')
  useEffect(() => { setNyala(-1) }, [i])

  const bacaPelan = async () => {
    for (let w = 0; w < kata.length; w++) {
      setNyala(w); ucap(kata[w], 0.75)
      await new Promise((r) => setTimeout(r, 1000))
    }
    setNyala(-1); ucap(k.teks, 0.85)
  }

  return (
    <div className="pelajaran">
      <div className="emoji-besar">{k.gambar}</div>
      <div className="kalimat">
        {kata.map((w, idx) => (
          <button key={idx} className={'kata-kalimat' + (nyala === idx ? ' nyala' : '')}
            onClick={() => { setNyala(idx); ucap(w) }}>{w}</button>
        ))}
      </div>
      <button className="tombol" onClick={bacaPelan}>🔊 Baca bersama</button>
      <Navigasi i={i} n={KALIMAT.length} setI={setI} />
    </div>
  )
}

function Navigasi({ i, n, setI }) {
  return (
    <div className="nav">
      <button className="panah" disabled={i === 0} onClick={() => setI(i - 1)} aria-label="Sebelumnya">◀</button>
      <span className="hal">{i + 1} / {n}</span>
      <button className="panah" disabled={i === n - 1} onClick={() => setI(i + 1)} aria-label="Berikutnya">▶</button>
    </div>
  )
}

/* ---------- Permainan ---------- */
function useSoal(buat) {
  const [soal, setSoal] = useState(buat)
  const [hasil, setHasil] = useState(null) // 'benar' | 'salah' | null
  const [salah, setSalah] = useState([])
  const baru = () => { setSoal(buat()); setHasil(null); setSalah([]) }
  return { soal, hasil, setHasil, salah, setSalah, baru }
}

function Permainan({ soal, hasil, salah, onJawab, baru, children, tampilan }) {
  return (
    <div className="pelajaran">
      {children}
      <div className="pilihan">
        {soal.pilihan.map((p) => (
          <button key={p}
            className={'opsi' + (hasil === 'benar' && p === soal.jawaban ? ' benar' : '') + (salah.includes(p) ? ' salah' : '')}
            onClick={() => onJawab(p)} disabled={hasil === 'benar'}>
            {tampilan ? tampilan(p) : p}
          </button>
        ))}
      </div>
      {hasil === 'benar' && (
        <div className="pujian">
          <div className="hore">🎉 Hebat! +1 ⭐</div>
          <button className="tombol" onClick={baru}>Lanjut ▶</button>
        </div>
      )}
      {hasil === 'salah' && <div className="coba">Hampir! Coba lagi ya 💪</div>}
    </div>
  )
}

const PUJIAN = ['Hebat!', 'Pintar!', 'Bagus sekali!', 'Benar!', 'Keren!']

function MainHurufAwal({ onBenar }) {
  const huruf = Object.keys(CONTOH_HURUF)
  const buat = () => {
    const jawaban = ambil(huruf)
    const lain = acak(huruf.filter((h) => h !== jawaban)).slice(0, 2)
    return { jawaban, pilihan: acak([jawaban, ...lain]) }
  }
  const s = useSoal(buat)
  const [kata, gambar] = CONTOH_HURUF[s.soal.jawaban]
  useEffect(() => { ucap(`${kata}. Huruf awalnya apa?`) }, [s.soal])

  const jawab = (p) => {
    if (p === s.soal.jawaban) { s.setHasil('benar'); ucap(`${ambil(PUJIAN)} ${kata}, huruf ${NAMA_HURUF[p]}`); onBenar() }
    else { s.setHasil('salah'); s.setSalah([...s.salah, p]); ucap('Coba lagi') }
  }

  return (
    <Permainan {...s} onJawab={jawab} tampilan={(p) => p}>
      <p className="petunjuk">Huruf awalnya apa?</p>
      <button className="emoji-besar" onClick={() => ucap(kata)}>{gambar}</button>
      <div className="kata-kosong">_ {kata.slice(1)}</div>
    </Permainan>
  )
}

function MainTebakGambar({ onBenar }) {
  const buat = () => {
    const benar = ambil(KATA)
    const lain = acak(KATA.filter((k) => k.kata !== benar.kata)).slice(0, 2)
    return { jawaban: benar.kata, gambar: benar.gambar, pilihan: acak([benar.kata, ...lain.map((l) => l.kata)]) }
  }
  const s = useSoal(buat)
  useEffect(() => { ucap('Gambar apa ini?') }, [s.soal])

  const jawab = (p) => {
    ucap(p)
    if (p === s.soal.jawaban) { s.setHasil('benar'); setTimeout(() => ucap(`${ambil(PUJIAN)} ${p}`), 700); onBenar() }
    else { s.setHasil('salah'); s.setSalah([...s.salah, p]) }
  }

  return (
    <Permainan {...s} onJawab={jawab}>
      <p className="petunjuk">Gambar apa ini? Pilih katanya!</p>
      <div className="emoji-besar">{s.soal.gambar}</div>
    </Permainan>
  )
}
