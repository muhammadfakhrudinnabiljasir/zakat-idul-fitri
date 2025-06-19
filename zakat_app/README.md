# Aplikasi Manajemen Zakat Idul Fitri

Aplikasi web sederhana yang dibuat dengan Python dan Flask untuk mengelola data pembayar zakat (CRUD).

## Fitur
- Tambah, lihat, ubah, dan hapus data pembayar zakat.
- Antarmuka pengguna yang bersih dan responsif dengan modal interaktif.
- Validasi data di sisi klien (JavaScript) dan sisi server (Python).
- Notifikasi untuk setiap aksi yang berhasil atau gagal.
- Data disimpan secara persisten dalam database SQLite.

## Struktur Proyek
```
zakat_app/
├── app.py             # Logika utama aplikasi Flask (rute, view)
├── database.py        # Definisi model data dan inisialisasi database
├── requirements.txt   # Dependensi Python
├── static/
│   ├── css/
│   │   └── style.css  # Styling kustom
│   └── js/
│       └── script.js  # Logika interaktivitas frontend
├── templates/
│   ├── base.html      # Template dasar (header, footer)
│   └── index.html     # Halaman utama dan semua modal
└── zakat.db           # File database SQLite (dibuat otomatis)
```

## Cara Menjalankan Aplikasi

### 1. Prasyarat
- Python 3.8 atau lebih tinggi terinstal.
- `pip` (package installer for Python).

### 2. Setup Lingkungan
Buka terminal atau command prompt, navigasi ke direktori `zakat_app`, dan ikuti langkah-langkah berikut:

**a. Buat dan Aktifkan Virtual Environment**

*   **Untuk Windows (Command Prompt):**
    ```sh
    python -m venv venv
    venv\\Scripts\\activate
    ```

*   **Untuk macOS/Linux:**
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```
    
**b. Instal Dependensi**

Pastikan virtual environment Anda aktif, lalu jalankan perintah berikut untuk menginstal semua pustaka yang diperlukan:
```sh
pip install -r requirements.txt
```

### 3. Inisialisasi Database
Setelah dependensi terinstal, jalankan perintah berikut untuk membuat file database `zakat.db` dan tabel di dalamnya. Perintah ini hanya perlu dijalankan sekali saat pertama kali menyiapkan aplikasi.

```sh
flask init-db
```
Anda akan melihat pesan "Initialized the database." jika berhasil.

### 4. Jalankan Aplikasi
Sekarang, jalankan server pengembangan Flask:
```sh
flask run
```

Aplikasi Anda sekarang berjalan dan dapat diakses. Buka browser web dan kunjungi:
[http://127.0.0.1:5000](http://127.0.0.1:5000)

Anda akan melihat antarmuka aplikasi dan dapat mulai menambahkan data pembayar zakat. Untuk menghentikan server, tekan `Ctrl+C` di terminal. 