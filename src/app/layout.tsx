"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader"; 
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  const getCode = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/get-tracking-code") ; 
      const resJson = await res.json();  
      return resJson ;
    } catch (error) {
      
    }
  } 
  const fetchAndSetScripts =  (code:string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, 'text/html');
    const scripts = doc.querySelectorAll('script');

    scripts.forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
      } else  {
        newScript.innerHTML = script.innerHTML;
      }
      document.head.appendChild(newScript);
    });
  }; 
  useEffect(() => { 
    const checkIsCode = async () => {
      const josnData = await getCode();  
      if(josnData.success) {
        fetchAndSetScripts(josnData.code) ;
      } else {
      }
    }
   checkIsCode()
    setTimeout(() => setLoading(false), 1000);
    
  }, []); 


  return (
    <html lang="en"> 
     <head>
       
      </head>
      <body > 
       
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <Toaster position="top-right" />
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}



