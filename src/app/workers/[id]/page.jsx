"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";

const fetchMaidDetails = async (id) => {
  const response = await fetch(`/api/maids/${id}`);
  const data = await response.json();
  return data.maid;
};

const MaidDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [maid, setMaid] = useState(null);

  useEffect(() => {
    fetchMaidDetails(id).then(data => setMaid(data));
  }, [id]);

  if (!maid) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center w-[95%] sm:w-[80%] lg:w-[70%] mx-auto mb-[30px]">
      <div className="card bg-secondary shadow-md mb-4 w-full">
        <figure className="px-4 pt-4">
          <Image src={maid.imageUrl} alt={maid.name} width={200} height={200} className="rounded-xl" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-primary font-bold text-[32px]">{maid.name}</h2>
          <div className="text-black font-bold text-[17px]">
            <div className="flex items-center">
              <span className="text-primary text-[18px]">Price:</span>
              <span className="ml-1">${maid.price}</span>
            </div>
            <div className="flex items-center">
              <span className="text-primary text-[18px]">Experience:</span>
              <span className="ml-1">{maid.experience.join(", ")}</span>
            </div>
            <div className="flex items-center">
              <span className="text-primary text-[18px]">Review:</span>
              <span className="ml-1">{maid.review.join(", ")}</span>
            </div>
            {maid.documentUrl && (
              <div className="flex items-center">
                <span className="text-primary text-[18px]">Document:</span>
                <a href={maid.documentUrl} className="ml-1 text-blue-500" target="_blank" rel="noopener noreferrer">
                  {maid.documentName}
                </a>
              </div>
            )}
          </div>
          <div className="card-actions flex justify-between mt-2">
            <Button onClick={() => router.back()} className="bg-primary text-white p-2 rounded-full hover:bg-black">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaidDetails;
