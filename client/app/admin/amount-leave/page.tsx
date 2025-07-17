'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AmountLeavePage() {
  const [showModal, setShowModal] = useState(true)
  const router = useRouter()

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
            <h2 className="text-lg font-bold mb-4 text-center">Add Amount Leave</h2>

            {/* Form Content */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Search NIK</label>
                <input type="text" className="w-full border px-3 py-2 rounded-lg" placeholder="Search..." />
              </div>

              <div>
                <label className="block text-sm font-medium">Current Leave Allowance</label>
                <input type="text" className="w-full border px-3 py-2 rounded-lg" readOnly value="5" />
              </div>

              <div>
                <label className="block text-sm font-medium">Add How Much</label>
                <select className="w-full border px-3 py-2 rounded-lg">
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Total</label>
                <input type="text" className="w-full border px-3 py-2 rounded-lg" value="5" readOnly />
              </div>

              <div>
                <label className="block text-sm font-medium">Information</label>
                <input type="text" className="w-full border px-3 py-2 rounded-lg" placeholder="Information" />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="flex items-center gap-1 px-4 py-2 text-gray-600 hover:text-red-600"
                  onClick={() => router.push('/admin/dashboard')}
                >
                  <i className="bi bi-arrow-left" /> Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
