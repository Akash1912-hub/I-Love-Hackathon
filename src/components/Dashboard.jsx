import React from 'react';
import { CreditCard, Wallet, Shield, Bitcoin } from 'lucide-react';
import BalanceCard from './BalanceCard';
import TransactionList from './Transaction';
import { Link } from 'react-router-dom';



function Dashboard() {
  const quickActions = [
    { icon: CreditCard, label: 'Pay Bills', Link: '/payments' },
    { icon: Wallet, label: 'Send Money', link: '/transfer' },
    { icon: Shield, label: 'Insurance', link: '/insurance' },
    { icon: Bitcoin, label: 'Crypto', link: '/crypto' },
  ];

  return (
    <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, John</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
       <BalanceCard/>
        <a href="/insurance">insurance</a>
        <a href="/loan">loan</a>
        <a href="/payment">payment</a>
        <a href="/support">support</a>
        <a href="/wallet">wallet</a>
        <a href="/peer">peer</a>
        <a href="/transaction">transaction</a>
        {quickActions.map((action, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            <action.icon className="h-8 w-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">{action.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <TransactionList/>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Bills</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">Electricity Bill</p>
                <p className="text-sm text-gray-500">Due in 5 days</p>
              </div>
              <span className="font-medium text-red-600">$124.50</span>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">Internet Bill</p>
                <p className="text-sm text-gray-500">Due in 12 days</p>
              </div>
              <span className="font-medium text-red-600">$79.99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;