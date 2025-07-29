'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import withAuth from "@/lib/auth/withAuth"
import Modal from '@/app/components/Modal/Modal';
import axiosInstance from "@/lib/api/axiosInstance";

type UserSearchResult = {
  nik: string;
  name: string;
  leave_total?: number;
};

const AmountLeavePage = () => {
  const router = useRouter()

  const [nik, setNik] = useState("")
  const [currentBalance, setCurrentBalance] = useState(0)
  const [amountToAdd, setAmountToAdd] = useState<number>(0)
  const [total, setTotal] = useState(0)
  const [information, setInformation] = useState("")

  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedUserName, setSelectedUserName] = useState("")
  const [userWasSelected, setUserWasSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(nik)
    }, 500)
    return () => clearTimeout(handler)
  }, [nik])

  useEffect(() => {
    if (userWasSelected) return

    if (debouncedSearch.trim() === "") {
      setSearchResults([])
      return
    }

    const searchUsers = async () => {
      setIsSearching(true)
      try {
        const response = await axiosInstance.get(`/users?search=${debouncedSearch}&limit=50&page=1`)
        const allUsers: UserSearchResult[] = response.data?.data?.data || response.data?.data || []
        const filteredUsers = allUsers.filter(user => user.nik.includes(debouncedSearch))
        setSearchResults(filteredUsers)
      } catch (error) {
        console.error("Failed to search users:", error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    searchUsers()
  }, [debouncedSearch, userWasSelected])

  useEffect(() => {
    const newTotal = Number(currentBalance) + Number(amountToAdd)
    setTotal(newTotal)
  }, [currentBalance, amountToAdd])

  const handleUserSelect = (user: UserSearchResult) => {
    setUserWasSelected(true)
    setNik(user.nik)
    setSelectedUserName(user.name)
    setCurrentBalance(user.leave_total || 0)
    setSearchResults([])
  }

  const handleConfirmSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true)

    const payload = {
      adjustment_value: Number(amountToAdd),
      notes: information.trim()
    };

    try {
      await axiosInstance.patch(`/users/${nik}/balance`, payload)
      router.push('/admin/employee-list?success=true');

    } catch (error: any) {
      console.error("Gagal memperbarui sisa cuti:", error)
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan. Silakan coba lagi.";
      alert(`Gagal: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = nik && selectedUserName && amountToAdd > 0 && information.trim() !== '';
  
  // Flag untuk mendeteksi apakah form sudah diisi atau belum
  const isDirty = nik.trim() !== '' || amountToAdd > 0 || information.trim() !== '';

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold inline-block px-4 py-1 rounded">
              Add Amount Leave
            </h2>
          </div>

          <div className="space-y-5">
            {/* Search NIK */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search NIK</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg pl-10"
                  placeholder="Ketik NIK untuk mencari..."
                  value={nik}
                  onChange={(e) => {
                    setUserWasSelected(false)
                    setNik(e.target.value)
                    if (e.target.value !== nik) {
                      setSelectedUserName("")
                      setCurrentBalance(0)
                    }
                  }}
                  autoComplete="off"
                />
                {debouncedSearch && !userWasSelected && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-3 text-center text-gray-500">Mencari...</div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((user) => (
                        <div key={user.nik} className="p-3 hover:bg-gray-100 cursor-pointer" onClick={() => handleUserSelect(user)}>
                          {user.nik} - {user.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-500">Pengguna tidak ditemukan.</div>
                    )}
                  </div>
                )}
              </div>
              {selectedUserName && (
                <p className="text-sm text-gray-600 mt-2">
                  Nama: <span className="font-semibold">{selectedUserName}</span>
                </p>
              )}
            </div>

            {/* Add How Much & Current Balance */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Add How Much</label>
                <input
                  type="number"
                  min="0"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                  value={amountToAdd}
                  onChange={(e) => {
                    const val = e.target.value;
                    const numVal = Number(val);
                    setAmountToAdd(!isNaN(numVal) && numVal >= 0 ? numVal : 0);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Balance</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-100"
                  readOnly
                  value={currentBalance}
                />
              </div>
            </div>

            {/* Total */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-gray-100"
                readOnly
                value={total}
              />
            </div>

            {/* Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Information</label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                placeholder="Information..."
                value={information}
                onChange={(e) => setInformation(e.target.value)}
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8">
              {isDirty ? (
                <Modal
                  mode="confirm"
                  title="Do you want to discard the changes?"
                  onConfirm={() => router.back()}
                  triggerLabel={
                    <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold cursor-pointer">
                      <i className="bi bi-box-arrow-in-left text-xl"></i>
                      Back
                    </div>
                  }
                />
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold"
                  onClick={() => router.back()}
                >
                  <i className="bi bi-box-arrow-in-left text-xl"></i>
                  Back
                </button>
              )}

              {isFormValid ? (
                <Modal
                  mode="confirm"
                  title={`Are you sure you want to add ${amountToAdd} leaves for ${nik} - ${selectedUserName}?`}
                  triggerLabel={isSubmitting ? 'Submitting...' : 'Confirm'}
                  onConfirm={handleConfirmSubmit}
                  variant="default"
                  triggerClassName="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold shadow-md"
                />
              ) : (
                <button
                  type="button"
                  className="bg-blue-300 text-white px-6 py-2 rounded-lg font-semibold shadow-md cursor-not-allowed"
                  disabled
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(AmountLeavePage)