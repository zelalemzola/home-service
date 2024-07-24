"use client";
import React, { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Eye, FilterIcon, GraduationCap, NotebookText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const fetcher = (url) => fetch(url).then((res) => res.json());

const Workers = () => {
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

  const handleSelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    const { name, value } = event.target;
    setSelectedPriceRange((prevRange) => {
      const newRange = [...prevRange];
      if (name === "min") {
        newRange[0] = value;
      } else {
        newRange[1] = value;
      }
      return newRange;
    });
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRange([0, 100000]); // Reset to default max price
  };

  // if (maidsError || categoriesError) return <div>Failed to load data</div>;
  // if (!maidsData || !categoriesData) return <div>Loading...</div>;

  return (
    <div className="w-full mx-auto mt-[20px] flex flex-col ">
      <div className="w-full flex flex-wrap items-center justify-between fixed top-0 z-30 bg-white border-b rounded-b-2xl px-[10%] py-3 shadow-md">
        <p className="text-primary text-lg md:text-2xl font-bold">Available Workers</p>
        <Dialog className="flex-end">
          <DialogTrigger>
            <Button className="flex items-center gap-3 bg-primary hover:bg-primary">Filter <FilterIcon /></Button>
          </DialogTrigger>
          <DialogContent className="px-2 w-[96%] md:w-fit rounded-xl">
            <DialogHeader className="mx-auto">
              <DialogTitle className='text-primary text-lg'>Apply filters</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-start space-x-2 mb-4 lg:mb-0">
              <select
                value={selectedCategory}
                onChange={handleSelect}
                className="border p-2 rounded text-black bg-white"
              >
                <option value="">Select category...</option>
                {categoriesData && categoriesData.categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-col  gap-3 py-2 ">
                <label className="text-black">Filter by Price:</label>
                <div className="flex items-center space-x-2 flex-col md:flex-row  gap-y-2">
                  <input
                    type="number"
                    name="min"
                    value={selectedPriceRange[0]}
                    onChange={handlePriceRangeChange}
                    className="border p-1 rounded text-black w-fit"
                  />
                  <p className="text-center font-bold">-</p>
                  <input
                    type="number"
                    name="max"
                    value={selectedPriceRange[1]}
                    onChange={handlePriceRangeChange}
                    className="border p-1 rounded text-black"
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <Button onClick={clearFilters} variant="destructive" className="mx-auto">
                  Clear Filters
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-8 gap-y-20 pt-[20%] md:pt-[15%] z-0">
        {filteredMaids.map((maid) => (
          <Card key={maid._id} className="relative shadow-lg py-4 md:p-4 scale-[90%] md:scale-100 bg-primary text-white">
            <CardHeader>
              <div className="flex items-center justify-center">
                <Avatar className="absolute top-0 mt-[-15%]">
                  <AvatarImage src={maid.imageUrl} alt="worker photo" />
                  <AvatarFallback>worker photo</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="pt-[5%]">
                <h2 className="card-title text-primary font-bold text-[14px] md:text-[20px] text-white">{maid.name}</h2>
              </CardTitle>
              <CardDescription>
                <span className="text-primary text-[12px] first-line:md:text-[18px] text-white">Price:</span>
                <span className="ml-1 text-white">${maid.price}/Month</span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-center">
      
             
                <Drawer>
                  <DrawerTrigger>
                     <Button className="flex items-center gap-3 bg-secondary hover:bg-secondary" >View Detail <Eye /></Button>  
                  </DrawerTrigger>
                  <DrawerContent className='h-[95%] '>
                     <div className="h-[80%] overflow-y-auto px-6">
                      <DrawerHeader className='flex flex-col items-center justify-center'>
                      <DrawerTitle> <Image src={maid.imageUrl} alt={maid.name} width={80} height={80} className="rounded-full" /></DrawerTitle>
                      <DrawerDescription>
                      <h2 className="card-title text-primary font-bold text-[32px] capitalize">{`${maid.name} ${maid.fathersName}`}</h2>
                      </DrawerDescription>
                    </DrawerHeader>
                   
                    <div className="text-black font-bold text-[17px]">
     <div className="flex flex-wrap items-center gap-4 justify-center pb-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-primary text-[18px] capitalize">{`${maid.name} requires`}</span>
        <span className="ml-1">{`$${maid.price} per Month`}</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-primary text-[18px]">Can Speak:</span>
        <span className="flex flex-wrap gap-2">{maid.languages.map((lang,index)=>(
          <p className=" p-1 rounded-full bg-orange-500 text-white text-sm" key={index}>{lang}</p>
        ))
          }</span>
      </div>
      </div>
      <div className="flex flex-col md:flex-row items-center  gap-6 ">
      <div className="flex items-center flex-col  gap-3 bg-primary text-white w-[90%] md:w-1/2 rounded-2xl p-2">
        <span className=" text-[18px] flex items-center gap-2"><GraduationCap color="white"/>Experience:</span>
        <span className="ml-1 flex flex-col gap-2">
        {maid.experience.map((exp,index)=>(
    <div className="" key={index}>
       <p className="text-sm flex items-center gap-2">  <ChevronRight />{exp}</p>
    </div>
   ))}
        </span>
      </div>
      <div className="flex items-center flex-col gap-4 w-[90%] md:w-1/2 rounded-2xl p-2 text-white bg-primary">
        <span className=" text-[18px] flex items-center gap-2">  <NotebookText color="white"/>Review:</span>
        <span className="ml-1">
   <div className="flex flex-col gap-1">
   {maid.review.map((rev,index)=>(
    <div className="" key={index}>
       <p className="text-sm flex items-center gap-2">  <ChevronRight />{rev}</p>
    </div>
   ))}
  
   </div>

   </span>
      </div>
      </div>
    </div>
   

<div className="w-full mt-4 flex flex-col items-center justify-center gap-3 pb-3">
  <h3 className="text-lg md:text-xl text-primary font-bold">Add a Review:</h3>
  <textarea
    value={newReview}
    onChange={(e) => setNewReview(e.target.value)}
    className="w-[80%] md:w-1/2 p-2 border rounded"
    placeholder="Write your review here"
  />
  <Button onClick={()=>handleReviewSubmit(maid._id)} className="mt-2 hover:bg-primary">
    Submit Review
  </Button>
</div>
</div>
                    <DrawerFooter>
                     
                      <DrawerClose>
                        <Button variant="destructive">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

          
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Workers;


{/* <div className="flex flex-col items-center  mx-auto h-[80%] overflow-y-auto">
<div className="card bg-secondary shadow-md mb-4 w-full">
  
  <div className="card-body">

    
    <div className="card-actions flex justify-between mt-2">
      <Button onClick={() => router.back()} className="bg-primary text-white p-2 rounded-full hover:bg-black">
        Go Back
      </Button>
    </div>
  </div>
</div>


</div> */}