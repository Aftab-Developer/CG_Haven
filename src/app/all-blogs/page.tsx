"use client"
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const dummyData = [
  { 
    id: 1,
     blog_title: 'Blog Post 1',
      blog_description: 'Lorem ipsum dolor sit amet.',
       blog_image: 'https://media.istockphoto.com/id/1477183258/photo/woman-holding-ai-icons-with-laptop.webp?a=1&b=1&s=612x612&w=0&k=20&c=RTy3cj2HXeN3LBwpCvFtTvv2G8DIDh5S6-U-iCkEXSc=' },

  { id: 2, blog_title: 'Blog Post 2', blog_description: 'Consectetur adipiscing elit.', blog_image: 'https://media.istockphoto.com/id/1488919446/photo/working-from-home-in-downtown-los-angeles.webp?a=1&b=1&s=612x612&w=0&k=20&c=AcGE64i6FDIXxIfQsxdY2D8Ahv5lHFy93zF6MSo7a7I=' },


  { id: 3, blog_title: 'Blog Post 3', blog_description: 'Sed do eiusmod tempor incididunt.', blog_image: 'https://media.istockphoto.com/id/1924137135/photo/online-blog-search-learning-work-internet-freelance-business-post-website-online-homepage.webp?a=1&b=1&s=612x612&w=0&k=20&c=YUwT30LGjjflugUwWCseBxdXs8mvwuRvzNNnN-W5gNQ=' },

  { id: 4, blog_title: 'Blog Post 4', blog_description: 'Ut labore et dolore magna aliqua.', blog_image: 'https://plus.unsplash.com/premium_photo-1682434403587-1313db01ed02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmxvZ3N8ZW58MHx8MHx8fDA%3D' },

  { id: 5, blog_title: 'Blog Post 5', blog_description: 'Ut enim ad minim veniam.', blog_image: 'https://images.unsplash.com/photo-1657638323016-b9b802f1756b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QmxvZ3N8ZW58MHx8MHx8fDA%3D' },

  { id: 6, blog_title: 'Blog Post 6', blog_description: 'Quis nostrud exercitation ullamco.', blog_image: 'https://plus.unsplash.com/premium_photo-1676998930828-cabd06cb61c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8QmxvZ3N8ZW58MHx8MHx8fDA%3D' },

  { id: 7, blog_title: 'Blog Post 7', blog_description: 'Laboris nisi ut aliquip ex ea commodo.', blog_image: 'https://plus.unsplash.com/premium_photo-1681755915233-9acafb348a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEJsb2dzfGVufDB8fDB8fHww' },

  { id: 8, blog_title: 'Blog Post 8', blog_description: 'Duis aute irure dolor in reprehenderit.', blog_image: 'https://images.unsplash.com/photo-1524006231331-78f794ebbbac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const Page = () => {
  const [visibleEntries, setVisibleEntries] = useState(4);

  const showMoreEntries = () => {
    setVisibleEntries((prev) => prev + 4);
  };

  const deleteBlog = (id: number) => {
    console.log(`Delete blog with id: ${id}`);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="All Blogs" />

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">All Blogs</h3>
          </div>
          <div className="p-7">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-left dark:bg-meta-4">
                    <th className="px-4 py-2 text-black dark:text-white">Blog Title</th>
                    <th className="px-4 py-2 text-black dark:text-white">Blog Description</th>
                    <th className="px-4 py-2 text-black dark:text-white">Blog Image</th>
                    <th className="px-4 py-2 text-black dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.slice(0, visibleEntries).map((blog) => (
                    <tr key={blog.id} className="border-b border-stroke dark:border-strokedark">
                      <td className="px-4 py-2 text-black dark:text-white">{blog.blog_title}</td>
                      <td className="px-4 py-2 text-black dark:text-white">{blog.blog_description}</td>
                      <td className="px-4 py-2 text-black dark:text-white">
                        <img src={blog.blog_image} alt={blog.blog_title} className="w-16 h-16 object-cover rounded" />
                      </td>
                      <td className="px-4 py-2 text-black dark:text-white">
                        <button
                          onClick={() => deleteBlog(blog.id)}
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