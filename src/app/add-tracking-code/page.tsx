"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { trackingCodeSchema } from '@/validatorModels/trackingSchemaValidator';

const Page = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [defaultTrackingCodes, setDefaultTrackingCodes] = useState("");

  const getCode = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/get-tracking-code");
      const resJson = await res.json();
      if (resJson.success) {
        setDefaultTrackingCodes(resJson.code);
      }
      return resJson;
    } catch (error) {
      console.error("Error fetching tracking code:", error);
    }
  };

  useEffect(() => {
    getCode();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (defaultTrackingCodes && !trackingCode) {
      setTrackingCode(defaultTrackingCodes);
    }

    setDefaultTrackingCodes("");
    const validator = trackingCodeSchema.safeParse({ trackingCode });
    if (!validator.success) {
      toast(validator.error.errors[0].message);
      return;
    }
    try {
      setLoading(true);
      const fetchCode = await fetch("http://localhost:3000/api/set-tracking-code", {
        method: "POST",
        body: JSON.stringify({ trackingCode }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const resJson = await fetchCode.json();
      setLoading(false);
      if (resJson.success) {
        toast.success(resJson.message);
      } else {
        toast.error(resJson.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in upload code:", error);
    }
  };

  const updateTrackingCode = async () => {
    if (defaultTrackingCodes && !trackingCode) {
      setTrackingCode(defaultTrackingCodes);
    }
    setDefaultTrackingCodes("");
    const validator = trackingCodeSchema.safeParse({ trackingCode });
    if (!validator.success) {
      toast(validator.error.errors[0].message);
      return;
    }
    try {
      setUpdateLoading(true);
      const res = await fetch("http://localhost:3000/api/update-tracking-code", {
        method: "POST",
        body: JSON.stringify({ trackingCode }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const resJson = await res.json();
      setUpdateLoading(false);
      if (resJson.success) {
        toast.success(resJson.message);
      } else {
        toast.error(resJson.message);
      }
    } catch (error) {
      setUpdateLoading(false);
      console.error("Error updating tracking code:", error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Tracking Code" />
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 bg-gray-100 dark:bg-boxdark-2">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md dark:bg-meta-4">
          <h1 className="mb-6 text-2xl font-semibold text-center text-black dark:text-white sm:text-xl">
            Add Conversion Tracking Code
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-black dark:text-white sm:text-xs" htmlFor="trackingCode">
                Conversion Tracking Code
              </label>
              <textarea
                id="trackingCode"
                value={trackingCode}
                defaultValue={defaultTrackingCodes ? defaultTrackingCodes : ""}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-gray-50 py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary sm:text-sm"
                rows={10}
                placeholder="Paste your tracking code(s) here..."
              />
            </div>
            <div className="flex justify-end gap-4.5 mt-4">
              <button
                type="button"
                onClick={updateTrackingCode}
                className="flex justify-center rounded-3xl bg-slate-300 px-6 py-2 font-medium text-black hover:bg-opacity-90"
                disabled={updateLoading}
              >
                {updateLoading ? <span className='flex gap-2'>Please wait <Loader2 className='animate-spin' /></span> : "Update"}
              </button>
              <button
                type="submit"
                className="flex justify-center rounded-3xl bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                disabled={loading}
              >
                {loading ? <span className='flex gap-2'>Please wait <Loader2 className='animate-spin' /></span> : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;