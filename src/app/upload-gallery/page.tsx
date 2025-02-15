import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const UploadGalleryPage = () => {
  return (
    <DefaultLayout>
      <div className="flex  justify-center min-h-[85vh]">
        <div className="mx-auto max-w-2xl w-full p-4">
          <Breadcrumb pageName="Upload Gallery" />
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Upload Gallery Image
              </h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="galleryImage"
                  >
                    Choose Image
                  </label>
                  <div className="relative inline-block w-full">
                    <input
                      type="file"
                      name="galleryImage"
                      id="galleryImage"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <label
                      htmlFor="galleryImage"
                      className="block w-full py-3 pl-4 pr-4 bg-gray-200 text-black border border-stroke rounded cursor-pointer dark:bg-meta-4 dark:text-white dark:border-strokedark focus:border-primary focus-visible:outline-none dark:focus:border-primary transition-colors"
                    >
                      Choose a file
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-500"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UploadGalleryPage;