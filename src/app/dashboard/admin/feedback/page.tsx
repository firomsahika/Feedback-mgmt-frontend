// FeedbackPage.tsx
import React from 'react';
import {Eye, Mail} from "lucide-react"



const FeedbackPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Manage Feedback</h1>
        <div className="flex items-center">
          <label htmlFor="showEntries" className="mr-2">
            Show
          </label>
          <select
            id="showEntries"
            className="border rounded px-2 py-1"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span className="ml-2">entries</span>
        </div>
        <div>
          <label htmlFor="search" className="mr-2">
            Search:
          </label>
          <input
            type="text"
            id="search"
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Classes</th>
              <th className="px-4 py-2 text-left">View</th>
              <th className="px-4 py-2 text-left">Clear Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">IT-6-Sem</td>
              <td className="px-4 py-2 flex items-center gap-x-2">
                <a href="#" className="flex items-center justify-center text-cyan-400 hover:underline mr-2">
                    <Eye className="w-5 h-5  mr-1" />
                  View
                </a>
                <a href="#" className="flex items-center justify-center text-cyan-400 hover:underline">
                    <Mail className="w-4 h-4  mr-1" />
                  Message
                </a>
              </td>
              <td className="px-4 py-2">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Clear
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>Showing 1 to 1 of 1 entries</div>
        <div>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded mr-2">
            Previous
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;