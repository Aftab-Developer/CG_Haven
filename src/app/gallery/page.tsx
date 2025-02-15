"use client"
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FaTrash } from "react-icons/fa";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const images = [
  // Add your image URLs here
  "https://plus.unsplash.com/premium_photo-1673263586782-8fa0713158e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1733690577845-4f4641a456b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
  "https://plus.unsplash.com/premium_photo-1673624400092-0e8fd6910570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1720048171098-dba33b2c4806?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1736267740362-0c10963c8047?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1734887347857-28ac3b7f2dfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1736230940320-b0cb61660dfb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1736231166624-7dffe85dd8ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721332154191-ba5f1534266e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1735969702749-dbe9a8d568d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0OXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1735216228027-fe31c23474ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
  "https://media.istockphoto.com/id/2149237608/photo/van-with-empty-side-space-for-design-transport-car-mock-up-delivery-van-isolated-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=bdEJEOFqPGg6Uqpv0fsFHDsOoINyk8u0Qw15AonL2Es=",
  "https://media.istockphoto.com/id/1894710238/photo/magazine-right-hand-page-mockup-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=G_9ABa8LRMFKOmOID4yrG8AfjETfi3AR2VuezWVY9bc=",
  "https://plus.unsplash.com/premium_photo-1708110921398-1fc68e98eacc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWxzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1575653932700-fcc34df03761?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWxzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1511892549826-a48122d9b258?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZWxzfGVufDB8fDB8fHww",  
];

const GalleryPage = () => {
  const [visibleImages, setVisibleImages] = useState(8);

  const showMoreImages = () => {
    setVisibleImages((prev) => prev + 4);
  };

  const deleteImage = (index:number) => {
    // Implement your delete logic here
    console.log(`Delete image at index: ${index}`);
  };

  return (
    <DefaultLayout>
        <Breadcrumb pageName="All Gallerys" />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.slice(0, visibleImages).map((image, index) => (
            <div key={index} className="relative h-48">
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover rounded shadow"
              />
              <button
                onClick={() => deleteImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        {visibleImages < images.length && (
          <div className="text-center mt-4">
            <button
              onClick={showMoreImages}
              className="px-10 py-3 bg-blue-500 text-white rounded-full mr-10 hover:bg-blue-700 transition-colors"
            >
              More
            </button>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default GalleryPage;