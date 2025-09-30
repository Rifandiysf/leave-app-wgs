'use client';

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import 'bootstrap-icons/font/bootstrap-icons.css';

// Data khusus untuk Super Admin
const superAdminSections = [
  {
    title: "Bagian 1: Peran dan Kapabilitas Super Admin",
    icon: "bi-person-vcard",
    color: "bg-red-500",
    content: [
      "Peran Super Admin memiliki semua kapabilitas yang dimiliki oleh Admin. Semua fitur yang dijelaskan dalam Panduan Admin juga berlaku untuk Anda.",
      "Perbedaan utamanya adalah hak akses tambahan untuk melakukan Pengaturan Global yang akan berdampak pada seluruh pengguna di website."
    ],
  },
  {
    title: "Bagian 2: Pengaturan Global",
    icon: "bi-sliders",
    color: "bg-red-500",
    content: [
      "Menu \"Setting\" untuk Super Admin memiliki opsi tambahan yang tidak dimiliki oleh Admin biasa.",
      "1. Pengaturan Logo Perusahaan:",
      "  Anda dapat mengunggah dan mengubah logo perusahaan yang ditampilkan di seluruh halaman website untuk semua pengguna.",
      "2. Pengaturan Tema Umum (General Theme):",
      "  Anda dapat menetapkan skema warna dan tema default untuk seluruh website.",
      "  Pengaturan ini akan menjadi tampilan awal bagi semua karyawan dan admin. Namun, setiap pengguna tetap dapat mengubah tema untuk tampilan pribadinya melalui menu \"Setting\" masing-masing.",
    ],
  },
];

// Data untuk Admin (yang juga akan dilihat Super Admin)
const adminSections = [
    {
        title: " Dashboard Admin",
        icon: "bi-speedometer2",
        color: "bg-blue-500",
        content: [
          "Dashboard utama yang memberikan pandangan menyeluruh terhadap aktivitas cuti di perusahaan.",
          "Total Karyawan: Jumlah karyawan aktif (Tetap & Kontrak).",
          "Cuti 6 Bulan: Agregat jumlah permintaan cuti dalam 6 bulan terakhir.",
          "Karyawan Cuti Mingguan: Jumlah karyawan yang sedang cuti pada minggu berjalan.",
          "Cuti Pending: Total permintaan cuti yang masih menunggu persetujuan.",
          "Karyawan Cuti Pending: Shortcut untuk langsung melihat daftar karyawan yang pengajuannya masih Pending.",
          "Trend Cuti Bulanan: Grafik tren pengajuan cuti dari Januari hingga Desember.",
          "User dengan Sisa Cuti Terbanyak: Leaderboard karyawan dengan saldo cuti tertinggi.",
          "User dengan Sisa Cuti Terendah: Leaderboard karyawan dengan saldo cuti terendah.",
          "Menu Employee List: Masuk ke halaman daftar semua karyawan.",
          "Menu List of Leave: Menu utama yang berisi sub-menu Request Leave dan History Leave.",
          "Sub-Menu Request Leave: Halaman manajemen untuk semua permintaan cuti yang sedang berjalan.",
          "Sub-Menu History Leave: Halaman riwayat untuk semua permintaan cuti yang sudah selesai.",
          "Menu Special Leave: Halaman manajemen untuk master data Cuti Khusus.",
          "Menu Mandatory Leave: Halaman manajemen untuk master data Cuti Wajib.",
          "Menu Amount Leave: Fitur untuk menambah saldo cuti karyawan secara manual.",
          "Menu Setting: Untuk mengubah tema warna tampilan website Anda pribadi.",
        ],
    },
    {
        title: " Employee List",
        icon: "bi-people",
        color: "bg-green-500",
        content: [
          "Halaman ini menampilkan daftar seluruh karyawan beserta informasi statistik kunci per individu, seperti total cuti yang diajukan dan total yang disetujui.",
        ],
    },
    {
        title: " Request Leave (Manajemen Permintaan)",
        icon: "bi-clipboard-check",
        color: "bg-purple-500",
        content: [
          "Ini adalah halaman kerja utama Anda untuk memproses permintaan cuti.",
          "Status Pengajuan:",
          "  Pending: Status awal, menunggu tindakan Anda.",
          "  Approved: disetujui.",
          "  Rejected: ditolak.",
          "  Expired: Permintaan yang dibiarkan Pending hingga hari-H akan otomatis kedaluwarsa dan tidak dapat diproses.",
          "Antisipasi Overlapping: Sistem akan memberikan notifikasi jika permintaan yang Anda proses berpotensi tumpang tindih dengan jadwal tim.",
          "Filter: Gunakan filter untuk mencari permintaan berdasarkan nama, departemen, atau tanggal.",
          "Aturan Penting: Seorang Admin tidak dapat menyetujui (Approve) atau menolak (Reject) permintaan cuti yang diajukan oleh dirinya sendiri. Ini harus diproses oleh Admin lain.",
        ],
    },
    {
        title: " History Leave (Riwayat Cuti)",
        icon: "bi-list-ul",
        color: "bg-orange-500",
        content: [
          "Halaman ini berisi arsip semua permintaan cuti di perusahaan.",
          "Mengubah Status: Anda dapat mengubah status dari Approved ke Rejected atau sebaliknya, namun ini hanya bisa dilakukan maksimal H-1 sebelum tanggal cuti dimulai. Pada hari-H, status terkunci.",
          "Informasi Saldo: Di halaman detail, Anda dapat melihat apakah karyawan menggunakan jatah cuti tahun ini atau tahun lalu.",
          "Aturan Penting: Admin tidak dapat mengubah status (Approved/Rejected) untuk permintaan yang diajukannya sendiri.",
        ],
    },
    {
        title: "Manajemen Master Data",
        icon: "bi-database-gear",
        color: "bg-pink-500",
        content: [
          " Special Leave Management: Di sini Anda dapat menambah, mengubah (edit), atau menonaktifkan (soft delete) jenis-jenis Cuti Khusus yang tersedia bagi karyawan.",
          " Mandatory Leave Management: Di sini Anda dapat menambah, mengubah (edit), atau menonaktifkan (soft delete) jadwal Cuti Wajib untuk perusahaan, Mandatory dibuat maksimal h-3 dari hari mulainya mandatory.",
          " Adjust Balance (Penyesuaian Saldo Cuti Manual): Fitur ini memungkinkan Anda untuk menyesuaikan saldo cuti karyawan secara manual. Anda dapat memilih karyawan, menentukan jumlah hari yang akan ditambahkan atau dikurangi, serta memilih apakah penyesuaian berlaku untuk jatah cuti tahun ini atau tahun sebelumnya. Saldo yang disesuaikan akan mengikuti aturan kedaluwarsa berdasarkan kategori cutinya.",
          " Adjust History (Riwaya Penambahan Jatah Cuti): Riwaya penambahan semua karyawan dari hasil Amount Leave.",
        ],
    },
];


// --- PERUBAHAN UTAMA DI SINI ---

// 1. Definisikan tipe untuk props
interface AdminInformationPageProps {
  userRole: 'admin' | 'super_admin' | string; // Tipe spesifik untuk role
}

// 2. Terapkan interface ke props komponen
export default function AdminInformationPage({ userRole }: AdminInformationPageProps) {
  // Secara default, tampilkan informasi admin
  let displayedSections = adminSections;
  
  // Jika role adalah super_admin, gabungkan informasinya (info super admin ditaruh di atas)
  if (userRole === 'super_admin') {
    displayedSections = [...superAdminSections, ...adminSections];
  }

  // Judul halaman juga bisa dibuat dinamis
  const pageTitle = userRole === 'super_admin' 
    ? "Panduan Penggunaan - Super Admin" 
    : "Panduan Penggunaan - Admin";
  
  const pageIcon = userRole === 'super_admin' ? 'bi-person-badge' : 'bi-shield-lock';

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl shadow-lg mb-6">
          <i className={`bi ${pageIcon} text-white text-3xl`}></i>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          {pageTitle}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Gunakan 'displayedSections' yang sudah dinamis */}
        {displayedSections.map((section, index) => (
          <Card
            key={index}
            className="bg-white border-1 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl shadow-lg ${section.color} text-white shadow-sm`}>
                  <i className={`bi ${section.icon} text-lg`}></i>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {section.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {section.content.map((point, i) => {
                  let marginLeft = '0px';
                  // Perbaikan: Gunakan spasi standar untuk pengecekan
                  if (point.startsWith('    ')) { // Level 2 indent
                    marginLeft = '40px';
                  } else if (point.startsWith('  ')) { // Level 1 indent
                    marginLeft = '20px';
                  }

                  return (
                    <div
                      key={i}
                      className="flex items-start space-x-3 group"
                      style={{ marginLeft: marginLeft }}
                    >
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 group-hover:bg-slate-600 transition-colors flex-shrink-0" />
                      <p className="text-foreground leading-relaxed text-sm">
                        {point.trim()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}