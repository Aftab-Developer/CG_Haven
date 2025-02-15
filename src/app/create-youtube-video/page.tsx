"use client"
import React, { useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { tutorialSchema } from '@/validatorModels/create-YoutubeVideoValidator';

export interface TutorialDetails {
  tu_name: string,
  tu_des: string,
  tu_links: string[],
  tu_duration: string,
  video_link: string,
  software_type: string[],
  tu_type: string[],
  isBeginner: boolean,
  isInterMediate: boolean,
  isAdvanced: boolean,
  isPatreon: boolean
}

const page = () => {
  const [tutorialDetails, setTutorialDetails] = useState<TutorialDetails>({
    tu_name: "",
    tu_des: "",
    tu_links: [],
    tu_duration: "",
    video_link: "",
    software_type: [],
    tu_type: [],
    isBeginner: false,
    isInterMediate: false,
    isAdvanced: false,
    isPatreon: false
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleRadioChange = (level: string) => {
    setTutorialDetails({
      ...tutorialDetails,
      isBeginner: level === "Beginner",
      isInterMediate: level === "Intermediate",
      isAdvanced: level === "Advanced"
    });
  };

  const submitHandler = async () => {
    try { 
        if(!tutorialDetails.isBeginner && !tutorialDetails.isAdvanced && !tutorialDetails.isInterMediate){
            toast.error("one difficulty is required"); 
            return
        }
      const res = tutorialSchema.safeParse({
        tu_name: tutorialDetails.tu_name,
        tu_des: tutorialDetails.tu_des,
        tu_links: tutorialDetails.tu_links,
        tu_duration: tutorialDetails.tu_duration,
        video_link: tutorialDetails.video_link,
        software_type: tutorialDetails.software_type,
        tu_type: tutorialDetails.tu_type
      });

      if (!res.success) {
        toast.error(res.error.errors[0].message);
        return;
      }

      setLoading(true);

      const body = {
        tu_name: tutorialDetails.tu_name,
        tu_des: tutorialDetails.tu_des,
        tu_duration: tutorialDetails.tu_duration,
        video_link: tutorialDetails.video_link,
        software_type: tutorialDetails.software_type,
        tu_type: tutorialDetails.tu_type,
        isBeginner: tutorialDetails.isBeginner,
        isInterMediate: tutorialDetails.isInterMediate,
        isAdvanced: tutorialDetails.isAdvanced,
        isPatreon: tutorialDetails.isPatreon,
        tu_links: tutorialDetails.tu_links
      };

      const fetchData = await fetch('http://localhost:3000/api/create-youtube-video', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const jsonData = await fetchData.json();
      setLoading(false);
      if (jsonData.success) {
        toast.success(jsonData.message);
      } else {
        toast.error(jsonData.message);
      }
    } catch (error) {
      console.log("error", error)
      setLoading(false);
    }
  }

  return (
    <DefaultLayout>
      <div className="mx-auto min-h-screen max-w-270">
        <Breadcrumb pageName="Create Tutorial" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-3xl-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Tutorial Information
                </h3>
              </div>
              <div className="p-7">

                {/* Form one */}

                <div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="tuName"
                      >
                        Tutorial Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" stroke="gray" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L20 10L12 18L4 10L12 2Z" />
                            <path d="M12 8V16" />
                          </svg>
                        </span>
                        <input
                          className="w-full rounded-3xl border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="tuName"
                          id="tuName"
                          value={tutorialDetails.tu_name}
                          placeholder="Tutorial Name"
                          onChange={(e) => setTutorialDetails({ ...tutorialDetails, tu_name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="tuLinks"
                      >
                        Related Links
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded-3xl border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="tuLinks"
                          id="tuLinks"
                          placeholder="Add links separated by commas"
                          value={tutorialDetails.tu_links.join(', ')}
                          onChange={(e) => setTutorialDetails({ ...tutorialDetails, tu_links: e.target.value.split(',').map(link => link.trim()) })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="tuDuration"
                      >
                        Duration
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded-3xl border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="tuDuration"
                          id="tuDuration"
                          value={tutorialDetails.tu_duration}
                          placeholder="Duration (e.g., 2 hours)"
                          onChange={(e) => setTutorialDetails({ ...tutorialDetails, tu_duration: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="videoLink"
                      >
                        Video Link
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded-3xl border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="videoLink"
                          id="videoLink"
                          value={tutorialDetails.video_link}
                          placeholder="Video Link"
                          onChange={(e) => setTutorialDetails({ ...tutorialDetails, video_link: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="tuDescription"
                    >
                      Tutorial Description
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full rounded-3xl border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="tuDescription"
                        id="tuDescription"
                        rows={6}
                        placeholder="Your Tutorial Description"
                        value={tutorialDetails.tu_des}
                        onChange={(e) => setTutorialDetails({ ...tutorialDetails, tu_des: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="softwareType"
                    >
                      Software Type
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-3xl border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="softwareType"
                        id="softwareType"
                        placeholder="Add software types separated by commas"
                        value={tutorialDetails.software_type.join(', ')}
                        onChange={(e) => setTutorialDetails({ ...tutorialDetails, software_type: e.target.value.split(',').map(type => type.trim()) })}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="tuType"
                    >
                      Tutorial Type
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-3xl border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="tuType"
                        id="tuType"
                        placeholder="Add tutorial types separated by commas"
                        value={tutorialDetails.tu_type.join(', ')}
                        onChange={(e) => setTutorialDetails({ ...tutorialDetails, tu_type: e.target.value.split(',').map(type => type.trim()) })}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="level"
                    >
                      Level
                    </label>
                    <div className="relative flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="level"
                          value="Beginner"
                          checked={tutorialDetails.isBeginner}
                          onChange={() => handleRadioChange("Beginner")}
                        />
                        Beginner
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="level"
                          value="Intermediate"
                          checked={tutorialDetails.isInterMediate}
                          onChange={() => handleRadioChange("Intermediate")}
                        />
                        Intermediate
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="level"
                          value="Advanced"
                          checked={tutorialDetails.isAdvanced}
                          onChange={() => handleRadioChange("Advanced")}
                        />
                        Advanced
                      </label>
                    </div>
                  </div>

                

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded-3xl border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={() => {
                        setTutorialDetails({
                          tu_name: "",
                          tu_des: "",
                          tu_links: [],
                          tu_duration: "",
                          video_link: "",
                          software_type: [],
                          tu_type: [],
                          isBeginner: false,
                          isInterMediate: false,
                          isAdvanced: false,
                          isPatreon: false
                        });
                       
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded-3xl bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      onClick={() => submitHandler()}
                    >
                      {
                        loading ? <span className='flex gap-2'>please wait <Loader2 className='animate-spin' /></span> : "save"
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">

          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default page