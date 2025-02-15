"use client"
import React, { useEffect } from 'react';

const ManualAds: React.FC<{dataAdSlot:string}> = ({dataAdSlot}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9207602027320125';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
  
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  }, []);

  return (
    <div>
      
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.GOOGLE_ADS_PUB_ID!}
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default ManualAds;