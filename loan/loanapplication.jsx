import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const LoanApplication = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    loanAmount: '',
    purpose: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const secretKey = 'mySecretKey123'; // Ensure this matches the backend key

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.loanAmount || !form.purpose || !file) {
      setError('All fields and the document are required.');
      return;
    }

    const encryptedForm = encryptData(form);

    const formData = new FormData();
    formData.append('encryptedData', encryptedForm);
    formData.append('document', file);

    try {
      const response = await fetch('http://localhost:5001/api/apply-loan', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Loan application submitted successfully. Application ID: ${data.applicationId}`);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to submit application.');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('Error submitting form. Please try again later.');
      setSuccessMessage('');
    }
  };

  return ( <div className="min-h-screen w-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Loan Application
      </h1>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
              Loan Amount:
            </label>
            <div className="mt-1">
              <input
                id="loanAmount"
                name="loanAmount"
                type="number"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={form.loanAmount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
              Purpose:
            </label>
            <div className="mt-1">
              <input
                id="purpose"
                name="purpose"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={form.purpose}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="document" className="block text-sm font-medium text-gray-700">
              Upload Document:
            </label>
            <div className="mt-1">
              <input
                id="document"
                name="document"
                type="file"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Application
            </button>
          </div>
        </form>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {successMessage && <p className="mt-2 text-sm text-green-600">{successMessage}</p>}
      </div>
    </div>
  </div>
  );
};

export default LoanApplication;
