
# Menjalankan Server

1. Langkah pertama (Install package)
    run command: npm i

2. Langkah kedua (generate ORM)
    run command: npx prisma generate

3. Langkah ketiga (konfigurasi environment)
    Isi .env.example dan ubah nama file ke .env 

4. Langkah keempat (menjalankan server)
    run command: npm run dev
    
# Migrate database dan seed data (Untuk local database)

1. Buat database baru pada postgreSQL atau pgAdmin

2. Sesuaikan database URL pada .env file dengan database yang telah dibuat

3. Jalankan command:
    npx prisma db push

4. Setelah itu seed data dengan menjalankan command:
    npx prisma db seed