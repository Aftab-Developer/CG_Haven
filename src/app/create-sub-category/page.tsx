"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { sub_cat_schme_validator } from "@/validatorModels/sub_cat_validator";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SubCategoryState {
  ca_name: string;
  sub_ca_name: string;
  sub_ca_des: string;
  sub_ca_image: File | null;
}

const Page = () => {
  const [sub_ca_details, set_sub_ca_details] = useState<SubCategoryState>({
    ca_name: "",
    sub_ca_name: "",
    sub_ca_des: "",
    sub_ca_image: null,
  });

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  const submitHandler = async () => {
    try {
      const validator = sub_cat_schme_validator.safeParse(sub_ca_details);
      if (!validator.success) {
        const errorMessages = validator.error.errors.map((err) => err.message).join("\n");
        toast.error(errorMessages);
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append("ca_name", sub_ca_details.ca_name);
      formData.append("sub_ca_name", sub_ca_details.sub_ca_name);
      formData.append("sub_ca_des", sub_ca_details.sub_ca_des);
      if (sub_ca_details.sub_ca_image) {
        formData.append("sub_ca_image", sub_ca_details.sub_ca_image);
      }
 
      const res = await fetch("/api/sub", {
        method: "POST",
        body: formData,
      });

      const resJson = await res.json();
      setIsLoading(false);
       console.log(resJson) ;
      if (resJson.success) {
        toast.success(resJson.message);
        set_sub_ca_details({ ca_name: "", sub_ca_name: "", sub_ca_des: "", sub_ca_image: null });
        setSelectedFileName(null);
      } else {
        toast.error(resJson.message);
      }
    } catch (error) {
      console.error("Error in subcat-form:", error);
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Create Sub Category" />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-xl-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Sub Category Information</h3>
              </div>
              <div className="p-7">
                <div>
                  {/* Category Name Input */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Category Name
                      </label>
                      <input
                        className="w-full rounded-xl border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        placeholder="Category Name"
                        value={sub_ca_details.ca_name}
                        onChange={(e) => set_sub_ca_details({ ...sub_ca_details, ca_name: e.target.value })}
                      />
                    </div>

                    {/* File Input */}
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Sub Category Image
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => {
                            if (e.target.files) {
                              set_sub_ca_details({ ...sub_ca_details, sub_ca_image: e.target.files[0] });
                              setSelectedFileName(e.target.files[0].name);
                            }
                          }}
                        />
                        <label className="block w-full py-3 px-4 bg-gray text-black border border-stroke rounded-xl cursor-pointer dark:bg-meta-4 dark:text-white dark:border-strokedark focus:border-primary dark:focus:border-primary transition-colors">
                          Choose a file
                        </label>
                        {selectedFileName && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Selected: {selectedFileName}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Sub Category Name Input */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Sub Category Name</label>
                    <input
                      className="w-full rounded-xl border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      placeholder="Sub Category Name"
                      value={sub_ca_details.sub_ca_name}
                      onChange={(e) => set_sub_ca_details({ ...sub_ca_details, sub_ca_name: e.target.value })}
                    />
                  </div>

                  {/* Sub Category Description */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Sub Category Description</label>
                    <textarea
                      className="w-full rounded-xl border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      rows={4}
                      placeholder="Your Category Description"
                      value={sub_ca_details.sub_ca_des}
                      onChange={(e) => set_sub_ca_details({ ...sub_ca_details, sub_ca_des: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="rounded-xl border border-stroke px-6 py-2 text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      onClick={() => {
                        set_sub_ca_details({ ca_name: "", sub_ca_name: "", sub_ca_des: "", sub_ca_image: null });
                        setSelectedFileName(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button className="rounded-3xl bg-primary px-6 py-2 text-gray hover:bg-opacity-90" onClick={submitHandler}>
                      {loading ? <span className="flex gap-2">Please wait <Loader2 className="animate-spin" /></span> : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
