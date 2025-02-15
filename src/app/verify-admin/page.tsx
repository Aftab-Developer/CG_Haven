"use client"
import { signIn } from 'next-auth/react';
import React, { useState, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { OtpSchema } from '@/validatorModels/OTPValidatorSchema';
interface OTPInputProps {
  length: number;
  onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onChange }) => { 
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(''));

    if (value && element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !otp[index] && event.currentTarget.previousSibling) {
      (event.currentTarget.previousSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div className="flex space-x-4">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={data}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
          className="w-16 h-16 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      ))}
    </div>
  );
};

const Page: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string>('');
  const Queryparams = useSearchParams(); 
  const data = Queryparams.get("email") ; 
  const decodeEmail = decodeURIComponent(data as string) ;
  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { 
    try {     
      event.preventDefault() ; 
      const validator = OtpSchema.safeParse({otp}); 
      if(!validator.success){
        toast.error(validator.error.errors[0].message); 
        return
      }
      setLoading(true) ;
      event.preventDefault(); 
      const res = await fetch("http://localhost:3000/api/verify-admin", {  
        method: "POST",
        body: JSON.stringify({ otp}), 
        headers: {
          "Content-Type": "application/json",
        },
      });   
      const jsonRes = await res.json();  
      if(jsonRes.success){
        await signIn(
          "credentials",
          {
            email: decodeEmail
          }); 
      setLoading(false) ;
        window.location.href = "/";
        toast.info("Admin verified successfully") ;
      } else { 
      setLoading(false) ;
        toast.error(jsonRes.message);
      }
    } catch (error) {
      console.error("error");
    }
  
     
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
<h1 className="mb-6 text-2xl font-semibold">An 06 digit OTP was send please verify in 1 hour</h1>

      <h1 className="mb-6 text-2xl font-semibold">Enter OTP</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <OTPInput length={6} onChange={handleOtpChange} />
        <button
          
          className="mt-6 px-6 py-3 bg-blue-500 text-white text-xl rounded hover:bg-blue-700 transition-colors"
        >
          {
            loading ? <span className='text-white flex justify-end items-center gap-2'>please wait<Loader2 className='animate-spin '/></span> : "process"
          }
        </button>
      </form>
    </div>
  );
};

export default Page;