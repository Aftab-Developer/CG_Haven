"use client"
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Loader from '@/components/common/Loader';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';

export interface FileDetails {
  fileName: string;
  quality: string;
  uploadedUrl: string;
  extension: string;
}

export interface DocumentCollection {
  _id: string;
  doc_name: string;
  doc_des: string;
  doc_name_image: string;
  isPatreon: boolean;
  downloads: number;
  items_files: {
    _id: string;
    files: {
      [key: string]: FileDetails[];
    };
    __v: number;
  }[];
  others: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TypeModel {
  type_name: string;
  documents_collection: DocumentCollection[];
}

export interface Fetched_Data {
  type_name: string;
  documents_collection: DocumentCollection[];
}

const Page = () => {
  const [fetchedData, setFetchedData] = useState<Fetched_Data[]>([]);
  const [isDataFetched, SetisDataFetched] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const pageLoadData = async () => {
    try {
      SetisDataFetched(true);
      const res = await fetch('http://localhost:3000/api/items-all');
      const resJson = await res.json();
      SetisDataFetched(false);
      setFetchedData(resJson.type_details);
    } catch (error) {
      console.log('error fetching data', error);
    }
  };

  useEffect(() => {
    pageLoadData();
  }, []);

  const dbDeleteHandler = async (id: string) => {
    try {
      setIsDeleted(true);
      const res = await fetch('http://localhost:3000/api/delete-item?id=' + id, {
        method: 'DELETE',
      });
      const jsonRes = await res.json();
      setIsDeleted(false);
      if (jsonRes.success) {
        toast(jsonRes.message);
      } else {
        toast(jsonRes.message);
      }
    } catch (error) {
      console.log('error deleting type', error);
    }
  };

  

  const filteredData = fetchedData&&fetchedData.map(type => ({
    ...type,
    documents_collection: type.documents_collection.filter(doc =>
      doc.doc_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <DefaultLayout>
      {isDataFetched ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-270 min-h-screen p-4">
          <Breadcrumb pageName="Items Details" />

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Items Details</h3>
            </div>
            <div className="p-7">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search types..."
                  className="w-full rounded-3xl border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-left dark:bg-meta-4">
                      <th className="px-4 py-2 text-black dark:text-white">Type Name</th>
                      <th className="px-4 py-2 text-black dark:text-white">Document Name</th>
                      <th className="px-4 py-2 text-black dark:text-white">Files</th>
                      <th className="px-4 py-2 text-black dark:text-white">Other Files</th>
                      <th className="px-4 py-2 text-black dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData&&filteredData.map((type) => (
                      type.documents_collection&&type.documents_collection .map((doc) => (
                        <tr key={doc._id} className="border-b border-stroke dark:border-strokedark">
                          <td className="px-4 py-2 text-black dark:text-white">{type.type_name}</td>
                          <td className="px-4 py-2 text-black dark:text-white">{doc.doc_name}</td>
                          <td className="px-4 py-2 text-black dark:text-white">
                            <ul className="list-disc pl-5">
                              {doc.items_files&&doc.items_files.map(fileGroup => (
                                Object.entries(fileGroup.files).map(([extension, files]) => (
                                  <li key={extension}>
                                    <strong>{extension}:</strong>
                                    <ul className="list-disc pl-5">
                                      {files.map(file => (
                                        <li key={file.uploadedUrl}>
                                          <a href={file.uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-700">
                                            {file.fileName}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                ))
                              ))}
                            </ul>
                          </td>
                          <td className="px-4 py-2 text-black dark:text-white">
                            <ul className="list-disc pl-5">
                              {doc.others&&doc.others.map((url, index) => (
                                <li className='text-blue-700 dark:text-blue-700' key={index}>
                                  <a href={url} target="_blank" rel="noopener noreferrer">
                                    {url.slice(0, 17) + "..."}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-4 py-2 text-black dark:text-white">
                            <button
                              onClick={() => dbDeleteHandler(doc._id)}
                              className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition-colors"
                            >
                              {isDeleted ? <Loader2 className='animate-spin' /> : <FaTrash />}
                            </button>
                          </td>
                        </tr>
                      ))
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