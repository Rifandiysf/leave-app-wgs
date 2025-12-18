'use client';

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import 'bootstrap-icons/font/bootstrap-icons.css'; 

export default function InformationPage() {
  const sections = [
    {
      title: "Dashboard Karyawan",
      icon: "bi-layout-text-sidebar-reverse",
      color: "bg-blue-500",
      content: [
        "Halaman Dashboard adalah pusat kendali Anda untuk semua aktivitas yang berkaitan dengan cuti.",
        "Remaining Leave This Year (Sisa Cuti Tahun Ini): Sisa jatah cuti tahunan Anda yang masih tersedia untuk tahun ini.",
        "Remaining Leave from Last Year (Sisa Cuti Tahun Lalu): Sisa jatah cuti dari tahun sebelumnya yang belum expired.",
        "Total Available (Total Cuti Tersedia): Jumlah total dari sisa cuti tahun ini dan tahun lalu.",
        "Days Used (Hari Terpakai): Total hari cuti yang telah Anda gunakan (status Approved).",
        "Pending Request (Pengajuan Tertunda): Jumlah pengajuan cuti Anda yang sedang menunggu persetujuan dari Admin.",
        'Tombol "Apply for Leave": Tombol utama untuk mengajukan cuti baru (Personal Leave).',
        'Menu "History": Membawa Anda ke halaman Riwayat Cuti.',
        'Menu "Mandatory": Membawa Anda ke halaman Cuti Wajib Perusahaan.',
        'Tombol "Logout": Untuk keluar dari akun Anda secara aman.'
      ]
    },
    {
      title: "Riwayat Cuti (History)",
      icon: "bi-clock-history",
      color: "bg-purple-500",
      content: [
        "Halaman ini adalah arsip semua pengajuan cuti Anda.",
        "Daftar Pengajuan: Menampilkan seluruh riwayat pengajuan dengan statusnya (Pending, Approved, Rejected, Expired).",
        'Tombol "Detail": Untuk melihat informasi lengkap mengenai sebuah pengajuan.',
        'Fitur "Filter": Untuk mencari riwayat pengajuan berdasarkan tanggal atau status.'
      ]
    },
    {
      title: "Cuti Wajib (Mandatory Leave)",
      icon: "bi-calendar-event",
      color: "bg-orange-500",
      content: [
        "Halaman untuk mengonfirmasi partisipasi Anda dalam Cuti Wajib Perusahaan (misal: Cuti Bersama).",
        'Mekanisme: Secara default, semua karyawan dianggap "Ikut (approved)". Anda harus secara manual mengubahnya menjadi "Tidak Ikut" jika tidak berpartisipasi.',
        "Konfirmasi terakhir harus dilakukan H-7 (tujuh hari) sebelum tanggal Cuti Wajib dimulai.",
        'Bagi yang statusnya "Ikut (approved)", saldo cuti akan otomatis terpotong pada H-7.'
      ]
    },
    {
      title: "Pengajuan Cuti Pribadi (Personal Leave)",
      icon: "bi-person-plus",
      color: "bg-green-500",
      content: [
        "Formulir untuk mengajukan cuti pribadi.",
        "Waktu Pengajuan: Pengajuan harus dilakukan minimal H-1. Anda tidak bisa mengajukan cuti untuk hari ini.",
        "Overlapping: Anda tidak bisa mengajukan cuti pada tanggal yang tumpang tindih dengan pengajuan lain yang masih Pending atau Approved.",
        "Validasi Saldo: Pengajuan tidak boleh melebihi Total Available Anda.",
        "Status Terkunci: Setelah tanggal mulai cuti tiba, status pengajuan tidak dapat diubah lagi oleh siapa pun."
      ]
    },
    {
      title: "Pengajuan Cuti Khusus (Special Leave)",
      icon: "bi-heart",
      color: "bg-pink-500",
      content: [
        "Formulir untuk mengajukan cuti khusus (cuti menikah, duka, melahirkan, dll).",
        "Tidak Mengurangi Saldo: Cuti Special yang disetujui TIDAK akan mengurangi jatah cuti tahunan Anda.",
        "Batas Keputusan: Keputusan dari Admin akan diberikan maksimal H-1 sebelum cuti dimulai.",
        "Status Terkunci: Saat tanggal mulai cuti tiba, status pengajuan tidak dapat diubah lagi.",
        "Validasi Gender: Opsi cuti khusus akan disesuaikan dengan gender Anda yang terdaftar di sistem."
      ]
    },
    {
      title: "Aturan Umum Cuti untuk Karyawan",
      icon: "bi-book",
      color: "bg-indigo-500",
      content: [
        "Jatah Karyawan Tetap/Admin: Mendapatkan 12 hari cuti per tahun, diberikan setiap 1 Januari.",
        "Jatah Karyawan Kontrak: Mendapatkan 1 hari cuti per bulan, diberikan setiap awal bulan.",
        "Prioritas Penggunaan Saldo: Sistem akan memprioritaskan penggunaan sisa cuti dari tahun lalu terlebih dahulu sebelum memotong saldo cuti tahun ini.",
        "Jenis Cuti yang Memotong Saldo: Hanya Personal Leave dan Mandatory Leave yang Approved yang akan mengurangi saldo cuti Anda."
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl shadow-lg mb-6">
          <i className="bi bi-book text-white text-3xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Panduan Penggunaan Aplikasi Cuti
        </h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {sections.map((section, index) => (
          <Card key={index} className="bg-white border shadow-sm hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-2xl shadow-lg mb-6" ${section.color} text-white shadow-sm`}>
                  <i className={`bi ${section.icon} justify-center text-lg`}></i>
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
