"use client"
import React, { useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {  toast } from 'sonner';
import {Loader2 } from 'lucide-react';
import { TypeDetailsSchema } from '@/validatorModels/typeSchemaValidator';

export interface TypeDetails { 
    sub_ca_name : string ,
    type_name: string , 
    type_des : string ,
    type_image : File |null,
}
const page = () => {
    const [typeDetails,setTypeDetails]=useState<TypeDetails>({
        sub_ca_name: "" ,
        type_name: "" , 
        type_des : "" ,
        type_image : null,
    }); 
    const [loading,setLoading] = useState<boolean>(false) ;
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);



  const submitHandler = async () => {
    try {  
      const res = TypeDetailsSchema.safeParse({sub_ca_name: typeDetails.sub_ca_name,
        type_name: typeDetails.type_name ,type_des: typeDetails.type_des,});
      if (!res.success) {
        toast.error(res.error.errors[0].message);
        return;
      }
       setLoading(true) ;
      const fromData = new FormData(); 
       fromData.append('sub_ca_name',typeDetails.sub_ca_name) ;
       fromData.append('type_name',typeDetails.type_name ) ; 
       fromData.append('type_des',typeDetails.type_des) ;
       if(typeDetails.type_image){
         fromData.append('type_image',typeDetails.type_image) ;
       } 
       setTypeDetails({
        sub_ca_name: "" ,
        type_name: "" , 
        type_des : "" ,
        type_image : null,
    }) 
       setSelectedFileName("") ;
      const fetchData = await fetch('http://localhost:3000/api/create-type',{
        method:"POST",
        body:fromData
      }); 
const jsonData = await fetchData.json();  
setLoading(false) ;
  if(jsonData.success) {
    toast.success(jsonData.message) ;
  } else {
    toast.error(jsonData.message) ;
  }
    } catch (error) {
      console.log("error",error)
    }
  }

  return ( 
    <DefaultLayout>
    <div className="mx-auto max-w-270">
    <Breadcrumb pageName="Create Type" />

    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-3xl-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Type Information
            </h3> 
           
          </div>
          <div className="p-7">  

            {/* Form one */} 

            <div>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Sub Category Name
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
                      name="fullName"
                      id="fullName" 
                      value={typeDetails.sub_ca_name}
                      placeholder="Sub Category Name"
                      onChange={(e)=> setTypeDetails({...typeDetails,sub_ca_name : e.target.value})}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Type Image
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                    
                    </span>
                    <div>
  
 
  <div className="relative inline-block w-full">
    <input
      type="file"
      name="profilePic"
      id="profilePic" 
      accept={"image/*"} 
      required
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      onChange={(e)=>{ setTypeDetails({...typeDetails ,type_image : e.target.files? e.target.files[0] : null}); setSelectedFileName(e.target.files? e.target.files[0].name : null)}}

    /> 
    
    <label
      htmlFor="profilePic"
      className="block w-full py-3 pl-11.5 pr-4.5 bg-gray text-black border border-stroke rounded-3xl cursor-pointer dark:bg-meta-4 dark:text-white dark:border-strokedark focus:border-primary focus-visible:outline-none dark:focus:border-primary transition-colors"
    >
      Choose a file
    </label> 
    {selectedFileName && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Selected file: {selectedFileName}
            </p>
          )}
  </div>
  {/* ...existing code... */}
</div>
                  </div>
                </div>

               
              </div>
              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="Username"
                >
                  Type Name
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_88_10224">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  <input
                    className="w-full rounded-3xl border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="Type-Name"
                    id="Type-Name"
                    placeholder="Your Type Name"
                    value={typeDetails.type_name}
                    onChange={(e)=> setTypeDetails({...typeDetails,type_name : e.target.value})}

                  ></input>  
                  
                  
                
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="Username"
                >
                  Type Description
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_88_10224">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  <textarea
                    className="w-full rounded-3xl border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="bio"
                    id="bio"
                    rows={6}
                    placeholder="Your Type Description"
                    value={typeDetails.type_des}

                    onChange={(e)=> setTypeDetails({...typeDetails,type_des:e.target.value})}

                  ></textarea>  
                  
                  
                
                </div>
              </div> 



              

              <div className="flex justify-end gap-4.5">



                <button
                  className="flex justify-center rounded-3xl  border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="button" 
                  onClick={() =>{ setTypeDetails({
                   sub_ca_name : "" ,
                   type_name : "" ,
                   type_des: "" ,
                   type_image : null
            
                  }); setSelectedFileName("")}}
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded-3xl bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  onClick={() => submitHandler()}
                >
                 {
                   loading ? <span className='flex gap-2'>please wait <Loader2 className='animate-spin'/></span> : "save"
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