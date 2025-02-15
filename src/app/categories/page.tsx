"use client"
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';

export interface Fetched_Data {
  _id: string;
  ca_name: string;
  ca_des: string;
  ca_image: string;
  sub_categories: string[];
}

const Page = () => {
  const [fetchedData, setFetchedData] = useState<Fetched_Data[]>([]);
  const [isDataFetched, SetisDataFetched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
      const [isDeleted , setIsDeleted] = useState(false);
  

  const pageLoadData = async () => {
    try {
      SetisDataFetched(true);
      const res = await fetch('http://localhost:3000/api/categorys');
      const resJson = await res.json();
      console.log(resJson.categorys, 'Api Res');
      SetisDataFetched(false);
      setFetchedData(resJson.categorys);
    } catch (error) {
      console.log('category data error', error);
    }
  };

  useEffect(() => {
    pageLoadData();
  }, []);
  console.log(fetchedData, 'State data');

  const dbDeleteHandler = async (id: string) => {
    try {
      setIsDeleted(true)
      const res = await fetch('http://localhost:3000/api/delete-category?id=' + id, {
        method: 'DELETE',
      });
      const jsonRes = await res.json();
      setIsDeleted(false)
      if (jsonRes.success) {
        toast(jsonRes.message);
      } else {
        toast(jsonRes.message);
      }
    } catch (error) {
      console.log('error deleting category');
    }
  };



  const filteredData = fetchedData&&fetchedData.filter((category) =>
    category.ca_name.toLowerCase().includes(searchTerm.toLowerCase()) 
    ||  category.ca_des.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DefaultLayout>
      {isDataFetched ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-270 min-h-screen p-4">
          <Breadcrumb pageName="Categories" />

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Categories</h3>
            </div>
            <div className="p-7">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full rounded-3xl border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-left dark:bg-meta-4">
                      <th className="px-4 py-2 text-black dark:text-white">Category Name</th>
                      <th className="px-4 py-2 text-black dark:text-white">Description</th>
                      <th className="px-4 py-2 text-black dark:text-white">Image</th>
                      <th className="px-4 py-2 text-black dark:text-white">Sub Categories</th>
                      <th className="px-4 py-2 text-black dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchedData&&fetchedData.map((category) => (
                      <tr key={category._id} className="border-b border-stroke dark:border-strokedark">
                        <td className="px-4 py-2 text-black dark:text-white">{category.ca_name}</td>
                        <td className="px-4 py-2 text-black dark:text-white">{category.ca_des.slice(0, 17) + '...'}</td>
                        <td className="px-4 py-2 text-blue-700 dark:text-blue-700">{category.ca_image.slice(0, 27) + ' ...'}</td>
                        <td className="px-4 py-2 text-black dark:text-white">
                          {category.sub_categories.length}
                        </td>
                        <td className="px-4 py-2 text-black dark:text-white">
                          <button
                            onClick={() => dbDeleteHandler(category._id)}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition-colors"
                          >
                            {
                              isDeleted? <Loader2 className='animate-spin'/> : 
                            <FaTrash />

                            }
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Page;