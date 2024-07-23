"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";

const fetchMaidDetails = async (id) => {
  const response = await fetch(`/api/maids/${id}`);
  const data = await response.json();
  return data.maid;
};

const MaidDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [maid, setMaid] = useState(null);
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (id) {
      fetchMaidDetails(id).then(data => {
        setMaid(data);
        setReviews(data.review || []);
      });
    }
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!newReview) return;

    const response = await fetch(`/api/maids/${id}/reviews`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ review: newReview }),
    });

    const updatedMaid = await response.json();
    setReviews(updatedMaid.maid.review);
    setNewReview("");
  };

  if (!maid) {
    return <div className="flex items-center justify-center">Loading...</div>;
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
            <div className="flex items-center">
              <span className="text-primary text-[18px]">Languages:</span>
              <span className="ml-1">{maid.languages.join(", ")}</span>
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

      <div className="w-full mt-4">
        <h3 className="text-xl font-bold">Reviews:</h3>
        {reviews.length > 0 ? (
          <ul className="list-disc pl-5">
            {reviews.map((review, index) => (
              <li key={index} className="text-black">{review}</li>
            ))}
          </ul>
        ) : (
          <p className="text-black">No reviews yet.</p>
        )}
      </div>

      <div className="w-full mt-4">
        <h3 className="text-xl font-bold">Add a Review:</h3>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write your review here"
        />
        <Button onClick={handleReviewSubmit} className="mt-2">
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default MaidDetails;
