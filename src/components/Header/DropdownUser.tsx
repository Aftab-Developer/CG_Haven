"use client"
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import { useEffect, useState } from "react";
import { Admin } from "@/models/admin/adminModel";

const DropdownUser = () => {  
  const [adminData , setAdminData] = useState<Admin>() ;
  const getDetails = async () => {
    try {
       const res = await fetch("http://localhost:3000/api/admin-details") ; 
       const resJson = await res.json() ; 
       if(resJson.success) {
         setAdminData(resJson.adminDetails[0]); 
       }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDetails(); 
    console.log(adminData)
  },[])
  return (
    <ClickOutside onClick={() => ""} className="relative">
      <Link
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {adminData?.ad_name}
          </span>

          <span className="block text-xs">{adminData?.ad_email}</span>
        </span>

        <span className="h-12 w-12 ">
          <Image 
          className="rounded-full"
            width={112}
            height={112}
            src={"/images/user/ammarbhai.png"}
           
            alt="User"
          />
        </span>

      
      </Link>

      
    </ClickOutside>
  );
};

export default DropdownUser;
