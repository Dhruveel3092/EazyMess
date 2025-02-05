import React from 'react'

function RightSideBar() {
  return (
      <aside className="w-1/5 bg-gradient-to-b from-yellow-200 to-red-200 p-4 flex flex-col">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-center">Updates</h2>
          {[
            "Advanced Engineering Maths.pdf",
            "Dire l’heure, Avoir et Être-1.pdf",
            "TPO Invigilation Guidelines.pdf"
          ].map((doc, index) => (
            <div key={index} className="mt-2 p-2 bg-gray-100 rounded-md">
              <p className="text-sm font-semibold">{doc}</p>
              <p className="text-xs text-gray-500">Time: 7/19/2024, 10:07:06 PM</p>
              <button className="text-blue-500 underline">Download</button>
            </div>
          ))}
        </div>

        {/* Meal Rating */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-4 text-center">
          <h2 className="text-lg font-bold">Rate Today's Meal</h2>
          <div className="flex justify-center my-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="text-yellow-500 text-2xl">★</span>
            ))}
          </div>
          <p className="text-gray-700">0</p>
          <div className="flex justify-between mt-2">
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md">Submit</button>
            <button className="bg-gray-500 text-white px-4 py-1 rounded-md">Graph</button>
          </div>
        </div>
      </aside>
  )
}

export default RightSideBar
