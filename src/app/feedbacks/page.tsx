"use client"
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const dummyData = [
  { id: 1, username: 'john_doe', email: 'john@example.com', description: 'Lorem ipsum dolor sit amet.' },
  { id: 2, username: 'jane_doe', email: 'jane@example.com', description: 'Consectetur adipiscing elit.' },
  { id: 3, username: 'sam_smith', email: 'sam@example.com', description: 'Sed do eiusmod tempor incididunt.' },
  { id: 4, username: 'lisa_jones', email: 'lisa@example.com', description: 'Ut labore et dolore magna aliqua.' },
  { id: 5, username: 'mike_brown', email: 'mike@example.com', description: 'Ut enim ad minim veniam.' },
  { id: 6, username: 'susan_white', email: 'susan@example.com', description: 'Quis nostrud exercitation ullamco.' },
  { id: 7, username: 'tom_green', email: 'tom@example.com', description: 'Laboris nisi ut aliquip ex ea commodo.' },
  { id: 8, username: 'anna_black', email: 'anna@example.com', description: 'Duis aute irure dolor in reprehenderit.' },
];

const Page = () => {
  const [visibleEntries, setVisibleEntries] = useState(4);

  const showMoreEntries = () => {
    setVisibleEntries((prev) => prev + 4);
  };

  const deleteUser = (id: number) => {
    console.log(`Delete user with id: ${id}`);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270 min-h-full p-4">
        <Breadcrumb pageName="Feedbacks" />

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Feedbacks</h3>
          </div>
          <div className="p-7">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-left dark:bg-meta-4">
                    <th className="px-4 py-2 text-black dark:text-white">Username</th>
                    <th className="px-4 py-2 text-black dark:text-white">Email</th>
                    <th className="px-4 py-2 text-black dark:text-white">Description</th>
                    <th className="px-4 py-2 text-black dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.slice(0, visibleEntries).map((user) => (
                    <tr key={user.id} className="border-b border-stroke dark:border-strokedark">
                      <td className="px-4 py-2 text-black dark:text-white">{user.username}</td>
                      <td className="px-4 py-2 text-black dark:text-white">{user.email}</td>
                      <td className="px-4 py-2 text-black dark:text-white">{user.description}</td>
                      <td className="px-4 py-2 text-black dark:text-white">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {visibleEntries < dummyData.length && (
              <div className="text-center mt-4">
                <button
                  onClick={showMoreEntries}
                  className="px-10 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-500"
                >
                  More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;