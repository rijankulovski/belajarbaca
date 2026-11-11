export const VOKAL = ['a', 'i', 'u', 'e', 'o']

export const KONSONAN = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'w', 'y']

// Contoh kata untuk tiap huruf (huruf awal)
export const CONTOH_HURUF = {
  a: ['apel', '🍎'], i: ['ikan', '🐟'], u: ['ular', '🐍'], e: ['elang', '🦅'], o: ['obat', '💊'],
  b: ['bola', '⚽'], c: ['cabai', '🌶️'], d: ['dadu', '🎲'], f: ['foto', '📷'], g: ['gigi', '🦷'],
  h: ['hati', '❤️'], j: ['jeruk', '🍊'], k: ['kuda', '🐴'], l: ['lampu', '💡'], m: ['mata', '👁️'],
  n: ['nasi', '🍚'], p: ['pisang', '🍌'], r: ['roti', '🍞'], s: ['sapi', '🐄'], t: ['topi', '🎩'],
  w: ['wortel', '🥕'], y: ['yoyo', '🪀'],
}

// Kata sederhana dengan pemenggalan suku kata
export const KATA = [
  { kata: 'bola', suku: ['bo', 'la'], gambar: '⚽' },
  { kata: 'buku', suku: ['bu', 'ku'], gambar: '📖' },
  { kata: 'kuda', suku: ['ku', 'da'], gambar: '🐴' },
  { kata: 'sapi', suku: ['sa', 'pi'], gambar: '🐄' },
  { kata: 'topi', suku: ['to', 'pi'], gambar: '🎩' },
  { kata: 'roti', suku: ['ro', 'ti'], gambar: '🍞' },
  { kata: 'susu', suku: ['su', 'su'], gambar: '🥛' },
  { kata: 'gigi', suku: ['gi', 'gi'], gambar: '🦷' },
  { kata: 'kaki', suku: ['ka', 'ki'], gambar: '🦶' },
  { kata: 'nasi', suku: ['na', 'si'], gambar: '🍚' },
  { kata: 'mata', suku: ['ma', 'ta'], gambar: '👁️' },
  { kata: 'dadu', suku: ['da', 'du'], gambar: '🎲' },
  { kata: 'mata', suku: ['ma', 'ta'], gambar: '👀' },
  { kata: 'ikan', suku: ['i', 'kan'], gambar: '🐟' },
  { kata: 'ibu', suku: ['i', 'bu'], gambar: '👩' },
  { kata: 'mobil', suku: ['mo', 'bil'], gambar: '🚗' },
  { kata: 'rumah', suku: ['ru', 'mah'], gambar: '🏠' },
  { kata: 'kucing', suku: ['ku', 'cing'], gambar: '🐱' },
  { kata: 'pisang', suku: ['pi', 'sang'], gambar: '🍌' },
  { kata: 'bulan', suku: ['bu', 'lan'], gambar: '🌙' },
].filter((k, i, arr) => arr.findIndex((x) => x.kata === k.kata) === i)

// Kalimat pendek
export const KALIMAT = [
  { teks: 'ini bola', gambar: '⚽' },
  { teks: 'ini ibu', gambar: '👩' },
  { teks: 'ibu beli roti', gambar: '🍞' },
  { teks: 'adik minum susu', gambar: '🥛' },
  { teks: 'kuda makan rumput', gambar: '🐴' },
  { teks: 'kucing tidur', gambar: '🐱' },
  { teks: 'ayah naik mobil', gambar: '🚗' },
  { teks: 'bulan di langit', gambar: '🌙' },
]
