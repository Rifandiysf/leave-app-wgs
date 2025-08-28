'use client';

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function AdminInformationPage() {
  const sections = [
    {
      title: "Dashboard Admin",
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
        'Menu "Employee List": Masuk ke halaman daftar semua karyawan.',
        'Menu "List of Leave": Menu utama yang berisi sub-menu Request Leave dan History Leave.',
        'Sub-Menu "Request Leave": Halaman manajemen untuk semua permintaan cuti yang sedang berjalan.',
        'Sub-Menu "History Leave": Halaman riwayat untuk semua permintaan cuti yang sudah selesai.',
        'Menu "Special Leave": Halaman manajemen untuk master data Cuti Khusus.',
        'Menu "Mandatory Leave": Halaman manajemen untuk master data Cuti Wajib.',
        'Menu "Amount Leave": Fitur untuk menambah saldo cuti karyawan secara manual.',
        'Menu "Setting": Untuk mengubah tema warna tampilan website Anda pribadi.',
      ],
    },
    {
      title: "Employee List",
      icon: "bi-people",
      color: "bg-green-500",
      content: [
        "Halaman ini menampilkan daftar seluruh karyawan beserta informasi statistik kunci per individu, seperti total cuti yang diajukan dan total yang disetujui.",
      ],
    },
    {
      title: "List of Leave - Request Leave (Manajemen Permintaan)",
      icon: "bi-clipboard-check",
      color: "bg-purple-500",
      content: [
        "Ini adalah halaman kerja utama Anda untuk memproses permintaan cuti.",
        "Status Pengajuan:",
        "Pending: Status awal, menunggu tindakan Anda.",
        "Approved: disetujui.",
        "Rejected: ditolak.",
        "Expired: Permintaan yang dibiarkan Pending hingga hari-H akan otomatis berubah menjadi Expired dan tidak dapat diproses.",
        "Antisipasi Overlapping: Sistem akan memberikan notifikasi jika permintaan yang Anda proses berpotensi tumpang tindih dengan jadwal tim.",
        "Filter: Gunakan filter untuk mencari permintaan berdasarkan nama, departemen, atau tanggal.",
        "Aturan Penting: Seorang Admin tidak dapat menyetujui (Approve) atau menolak (Reject) permintaan cuti yang diajukan oleh dirinya sendiri. Ini harus diproses oleh Admin lain.",
      ],
    },
    {
      title: "List of Leave - History Leave (Riwayat Cuti)",
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
      icon: "bi-book",
      color: "bg-pink-500",
      content: [
        "Special Leave Management: Di sini Anda dapat menambah, mengubah (edit), atau menonaktifkan (soft delete) jenis-jenis Cuti Khusus yang tersedia bagi karyawan.",
        "Mandatory Leave Management: Di sini Anda dapat menambah, mengubah (edit), atau menonaktifkan (soft delete) jadwal Cuti Wajib untuk perusahaan. Mandatory dibuat maksimal h-14 dari hari mulainya mandatory.",
        "Amount Leave (Penambahan Saldo Manual): Fitur untuk menambah saldo cuti ke karyawan tertentu. Anda bisa memilih karyawan, jumlah hari, dan menentukan apakah saldo ditambahkan ke jatah tahun ini atau tahun lalu. Saldo tambahan ini akan mengikuti aturan kedaluwarsa dari kategorinya.",
        "Adjust History (Riwayat Penambahan Jatah Cuti): Riwayat penambahan semua karyawan dari hasil Amount Leave.",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl shadow-lg mb-6">
          <i className="bi bi-book text-white text-3xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Panduan Penggunaan Website Cuti - Admin
        </h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {sections.map((section, index) => (
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
                {section.content.map((point, i) => (
                  <div key={i} className="flex items-start space-x-3 group">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 group-hover:bg-slate-600 transition-colors" />
                    <p className="text-foreground leading-relaxed text-sm">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}