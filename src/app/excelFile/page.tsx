"use client"
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const Page = () => {
  const [dataState, setDataState] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com' },
    { id: 6, name: 'David Evans', email: 'david@example.com' },
    { id: 7, name: 'Ella Foster', email: 'ella@example.com' },
    { id: 8, name: 'Frank Green', email: 'frank@example.com' },
    { id: 9, name: 'Grace Harris', email: 'grace@example.com' },
    { id: 10, name: 'Henry Irving', email: 'henry@example.com' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const exportToExcel = (data: typeof dataState, fileName = "Data.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

    saveAs(blob, fileName);
  };

  const filteredData = dataState.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMoreData = () => {
    const newId = dataState.length + 1;
    const newUser = { id: newId, name: `New User ${newId}`, email: `newuser${newId}@example.com` };
    setDataState([...dataState, newUser]);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Search Analysis" />
      <div className="min-h-screen pb-[50px] bg-white dark:bg-boxdark text-black dark:text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded">
          <div className="flex justify-between items-center mb-4 p-4 border-b border-stroke dark:border-strokedark">
            <h1 className="text-3xl font-bold">User Data</h1>
            <div className="relative">
              <button
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
                onClick={() => exportToExcel(dataState)}
              >
                Export to Excel
              </button>
              <button
                className="ml-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
                onClick={addMoreData}
              >
                Add More Data
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search by name or email"
            className="w-full p-2 mb-4 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="w-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center">ID</th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center">Name</th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center">{user.id}</td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center">{user.name}</td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;