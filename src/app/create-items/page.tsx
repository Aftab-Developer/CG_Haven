'use client'

import { useState } from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { File, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { ItemDetailSchema } from '@/validatorModels/ItemValidatorSchema'

export interface Item_Detail {
  type_name: string,
  item_name: string,
  item_des: string,
  item_image: File | null,
  item_files: FileList | null,
  others: FileList | null,
  isPatreon: boolean
}

export default function CreateItem() {
  const [ItemDetails, setItemDetails] = useState<Item_Detail>({
    type_name: "",
    item_name: '',
    item_des: '',
    item_image: null,
    item_files: null,
    others: null,
    isPatreon: false
  })

  const [selectedImage, setSelectedImage] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [setPatreon, setSetPatreon] = useState(false)

  const submitHandler = async () => {
    console.log(ItemDetails)
    console.log(ItemDetails);
      const validator = ItemDetailSchema.safeParse(
        {     
      type_name: ItemDetails.type_name ,
      item_name: ItemDetails.item_name,
      item_des: ItemDetails. item_des,
      isPatreon:ItemDetails .isPatreon
    }   
      ) ;
      if(!validator.success) {
        toast.error(validator.error.errors[0].message) ;
        return ;
      }
      setLoading(true) ; 
       
      try {
        const formData = new FormData() ;
        formData.append("type_name",ItemDetails.type_name) ;
        formData.append("item_name",ItemDetails.item_name) ;
        formData.append("item_des",ItemDetails.item_des) ; 
        formData.append("isPatreon",ItemDetails.isPatreon?"true":"false") ; 
        if(ItemDetails.item_image && ItemDetails.item_files ){
        formData.append("item_image",ItemDetails.item_image) ;
         Array.from(ItemDetails.item_files).forEach((files) => {
        formData.append("files",files) ;    
         }) ;
        } 
        if(ItemDetails.others) {
           Array.from(ItemDetails.others).forEach((file) => {
            formData.append("others",file) ;    
           })
        }
        setItemDetails({
          type_name: "",
          item_name: '',
          item_des: '',
          item_image: null,
          item_files: null,
          others: null,
          isPatreon: false
        })
        const res = await fetch("http://localhost:3000/api/create-document",{
          method:"POST" ,
          body: formData
        }) ; 
        const jsonRes = await res.json() ;  
        console.log(ItemDetails,"State Data") ;
        console.log(jsonRes,"Api Data") ;
        setLoading(false) ;
        if(jsonRes.success) {
          toast.success(jsonRes.message) ;
        } else {
          toast.error(jsonRes.message) ;
        }
  
  
      } catch (error) {
        console.log("error,creating document") ;
        toast.error("un expected error occured !") ;
  
      }
    }
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Create Item" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-3xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Item Information</h3>
              </div>
              <div className="p-7">

                {/* Type Name */}
                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Type Name
                  </label>
                  <input
                    className="w-full rounded-3xl border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="type_name"
                    id="type_name"
                    value={ItemDetails.type_name}
                    onChange={(e) =>
                      setItemDetails({ ...ItemDetails, type_name: e.target.value })
                    }
                    placeholder="Type Name"
                  />
                </div>

                {/* Item Name */}
                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Item Name
                  </label>
                  <input
                    className="w-full rounded-3xl border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="item_name"
                    id="item_name"
                    value={ItemDetails.item_name}
                    onChange={(e) =>
                      setItemDetails({ ...ItemDetails, item_name: e.target.value })
                    }
                    placeholder="Item Name"
                  />
                </div>

                {/* Item Image Upload */}
                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Item Image
                  </label>
                  <label
                    htmlFor="doc_image"
                    className="flex items-center justify-center gap-2 cursor-pointer rounded-3xl border border-stroke bg-gray py-3 px-4.5 text-black text-center focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  >
                    <File size={18} /> Upload Doc Image
                  </label>
                  <input
                    type="file"
                    name="doc_image"
                    id="doc_image"
                    accept="image/*"
                    required
                    onChange={(e) => {
                      if (e.target.files) {
                        setItemDetails({ ...ItemDetails, item_image: e.target.files[0] })
                        setSelectedImage(e.target.files[0].name)
                      }
                    }}
                    className="hidden"
                  />
                  {selectedImage && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {selectedImage}
                    </p>
                  )}
                </div>

                {/* Set Patreon Checkbox */}
                <div className="mb-5.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-black dark:text-white">
                    Set Patreon
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={ItemDetails.isPatreon}
                      required
                      onChange={() => setItemDetails({ ...ItemDetails, isPatreon: !ItemDetails.isPatreon })}
                    />
                    <div
                      className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-primary dark:bg-gray-700 rounded-full peer dark:border-gray-600 peer-checked:bg-primary transition-colors duration-300"
                    ></div>
                    <span
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        ItemDetails.isPatreon ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></span>
                  </label>
                </div>

                {/* Item Description */}
                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Item Description
                  </label>
                  <textarea
                    className="w-full rounded-3xl border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="item_des"
                    id="item_des"
                    rows={4}
                    value={ItemDetails.item_des}
                    onChange={(e) =>
                      setItemDetails({ ...ItemDetails, item_des: e.target.value })
                    }
                    placeholder="Item Description"
                  ></textarea>
                </div>

                {/* Item Files Upload */}
                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Item Files
                  </label>
                  <label
                    htmlFor="doc_files"
                    className="flex items-center justify-center w-full gap-2 cursor-pointer rounded-3xl border border-stroke bg-gray py-3 px-4.5 text-black text-center focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  >
                    <File size={18} /> Upload Doc Files
                  </label>
                  <input
                    type="file"
                    name="doc_files"
                    id="doc_files"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setItemDetails({ ...ItemDetails, item_files: e.target.files })
                      }
                    }}
                    className="hidden"
                  />
                  {ItemDetails.item_files && (
                    <div className="mt-2 text-sm text-green-600">
                      <p>Selected Files:</p>
                      <ul className="list-disc pl-5">
                        {Array.from(ItemDetails.item_files).map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Others Files Upload */}
                <div className="mb-5.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Others Files
                  </label>
                  <label
                    htmlFor="others_files"
                    className="flex items-center justify-center w-full gap-2 cursor-pointer rounded-3xl border border-stroke bg-gray py-3 px-4.5 text-black text-center focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  >
                    <File size={18} /> Upload Other Files
                  </label>
                  <input
                    type="file"
                    name="others_files"
                    id="others_files"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setItemDetails({ ...ItemDetails, others: e.target.files })
                      }
                    }}
                    className="hidden"
                  />
                  {ItemDetails.others && (
                    <div className="mt-2 text-sm text-green-600">
                      <p>Selected Others Files:</p>
                      <ul className="list-disc pl-5">
                        {Array.from(ItemDetails.others).map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded-3xl border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                    onClick={() => {
                      setItemDetails({
                        type_name: "",
                        item_name: '',
                        item_des: '',
                        item_image: null,
                        item_files: null,
                        others: null,
                        isPatreon: false
                      })
                      setSelectedImage("")
                      setSetPatreon(false)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded-3xl bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    onClick={submitHandler}
                  >
                    {loading ? (
                      <span className="flex gap-2">
                        Please wait <Loader2 className="animate-spin" />
                      </span>
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
