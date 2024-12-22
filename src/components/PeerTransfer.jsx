import React from 'react';
import { Users, Search, Clock, ArrowRight } from 'lucide-react';

function PeerTransfer() {
  const recentContacts = [
    { name: 'Jane Smith', email: 'jane.smith@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { name: 'John Doe', email: 'john.doe@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    { name: 'Sarah Johnson', email: 'sarah.j@email.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
  ];

  return (
    <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Send Money</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Transfer Money</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Recipient</label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    placeholder="Email or phone number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">USD</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Note (optional)</label>
                <input
                  type="text"
                  placeholder="What's this for?"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                Send Money
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Contacts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentContacts.map((contact, index) => (
                <div key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.email}</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transfers</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">To: Jane Smith</span>
                <span className="text-red-600">-$50.00</span>
              </div>
              <p className="text-sm text-gray-500">Dinner last night</p>
              <p className="text-xs text-gray-400 mt-1">Mar 15, 2024</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">From: John Doe</span>
                <span className="text-green-600">+$25.00</span>
              </div>
              <p className="text-sm text-gray-500">Movie tickets</p>
              <p className="text-xs text-gray-400 mt-1">Mar 14, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeerTransfer;