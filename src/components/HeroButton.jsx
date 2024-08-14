"use client";
import React, { useState, useEffect, useCallback } from "react";
import useSWR from "swr";

import { Button } from './ui/button'
import Link from 'next/link'
const fetcher = (url) => fetch(url).then((res) => res.json());
const HeroButton = () => {
     const { data: maidsData, error: maidsError } = useSWR("/api/maids", fetcher, {
    refreshInterval: 5000, // Re-fetch every 5 seconds
  });
  const { data: categoriesData, error: categoriesError } = useSWR("/api/categories", fetcher, {
    refreshInterval: 60000, // Re-fetch every 60 seconds
  });

  const [filteredMaids, setFilteredMaids] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100000]); // Default max price is 100,000
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const handleReviewSubmit = async (id) => {
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
  const filterMaids = useCallback(() => {
    if (!maidsData || !maidsData.maids) return;

    let filtered = maidsData.maids.filter((maid) => maid.isAvailable); // Only show available maids
    if (selectedCategory) {
      filtered = filtered.filter((maid) => maid.category._id === selectedCategory);
    }
    filtered = filtered.filter(
      (maid) => maid.price >= selectedPriceRange[0] && maid.price <= selectedPriceRange[1]
    );
    setFilteredMaids(filtered);
  }, [maidsData, selectedCategory, selectedPriceRange]);

  useEffect(() => {
    filterMaids();
  }, [maidsData, selectedCategory, selectedPriceRange, filterMaids]);

  return (
     <Button className='rounded-full bg-secondary hover:bg-primary animate-bounce shadow-md' asChild>
      <Link href='/wk'>
        Search Workers
          </Link>
        </Button>
  )
}

export default HeroButton