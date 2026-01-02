## 🧠 PETA BACKEND EXPRESS

> Backend bukan soal framework,  
> tapi soal **alur data, batas tanggung jawab, dan konsistensi**.

---

### Struktur yang sehat (inti arsitektur)

    `Route
     ↓
    Middleware
     ↓
    Controller
     ↓
    Service
     ↓
    Repository
     ↓
    Database`

### Tanggung jawab tiap layer:

- **Route**  
  Menentukan _siapa ke mana_ (tidak ada logika bisnis)
- **Middleware**  
  Penjaga pintu (auth, validation, authorization)
- **Controller**  
  Pengatur lalu lintas  
  Ambil input → panggil service → kirim response
- **Service**  
  Otak bisnis  
  Menentukan _boleh / tidak_, _berhasil / gagal_
- **Repository**  
  Interaksi database (query, atomic update)
- **Database**  
  Sumber kebenaran terakhir (race condition diselesaikan di sini)

> **If you understand this deeply, Express becomes predictable.**

---

### Bayangkan Express seperti resepsionis kantor 🏢:

- ada tamu datang (request)
- resepsionis lihat tujuan (URL + method)
- dicek aturan (middleware)
- diarahkan ke ruangan (route handler)
- dikasih jawaban (response)

---

### Prinsip async yang HARUS nempel

- `async` → selalu return Promise
- Panggil async → **harus `await`**
- Error async → **harus lewat `next(err)`**
- `next()` ≠ stop
- `return` = stop function

---

### Error handling yang benar

- Service → `throw error` atau return status bisnis
- Controller → `try/catch` + `next(err)`
- Error middleware → **satu pintu response error**

❌ Jangan `res.status()` di service  
❌ Jangan return `null` dari service

---

### Auth & Authorization (lock konsep)

- **Auth** = siapa kamu (JWT)
- **Authorization** = boleh apa (role)

JWT:

- dibuat di **service**
- payload **minimal** (`userId`, `role`)
- bukan tempat simpan data sensitif

Middleware:

- `authMiddleware` → attach `req.user`
- `authorize()` → cek role
- selalu **kiri → kanan**

---

### Security minimum (wajib)

- Password **selalu di-hash** (bcrypt)
- Tidak pernah simpan password plain
- Tidak log password / token
- Role **tidak boleh** ditentukan client (kecuali fase belajar)

---

### Database & race condition

- Atomic update (`findOneAndUpdate + $gte + $inc`)
- Database mengunci, bukan Express

---

### Anti-pattern yang HARUS dihindari

- Logic bisnis di controller
- Response HTTP di service
- Middleware tanpa `return`
- Service return `null`
- Belajar topik baru sebelum fondasi dipakai

---

run

    node src/server.js
