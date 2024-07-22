"use client";
import React, { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, FilterIcon } from "lucide-react";
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

  if (maidsError || categoriesError) return <div>Failed to load data</div>;
  if (!maidsData || !categoriesData) return <div>Loading...</div>;

  return (
    <div className="w-full mx-auto mt-[20px] flex flex-col ">
      <div className="w-full flex flex-wrap items-center justify-between fixed top-0 z-30 bg-white border-b rounded-2xl px-[10%] py-3 shadow-md">
        <p className="text-primary text-lg md:text-2xl font-bold">Available Workers</p>
        <Dialog className="flex-end">
          <DialogTrigger>
            <Button className="flex items-center gap-3">Filter <FilterIcon /></Button>
          </DialogTrigger>
          <DialogContent className="px-2">
            <DialogHeader className="mx-auto">
              <DialogTitle>Apply filters</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-start space-x-2 mb-4 lg:mb-0">
              <select
                value={selectedCategory}
                onChange={handleSelect}
                className="border p-2 rounded text-black bg-white"
              >
                <option value="">Select category...</option>
                {categoriesData.categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-col gap-3 py-2">
                <label className="text-black">Filter by Price:</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="min"
                    value={selectedPriceRange[0]}
                    onChange={handlePriceRangeChange}
                    className="border p-1 rounded text-black w-fit"
                  />
                  <span>-</span>
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
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-20 pt-[20%] md:pt-[15%] z-0">
        {filteredMaids.map((maid) => (
          <Card key={maid._id} className="relative shadow-md py-4 md:p-4">
            <CardHeader>
              <div className="flex items-center justify-center">
                <Avatar className="absolute top-0 mt-[-15%]">
                  <AvatarImage src={maid.imageUrl} alt="worker photo" />
                  <AvatarFallback>worker photo</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="pt-[5%]">
                <h2 className="card-title text-primary font-bold text-[20px]">{maid.name}</h2>
              </CardTitle>
              <CardDescription>
                <span className="text-primary text-[18px]">Price:</span>
                <span className="ml-1">${maid.price}/Month</span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-center">
              <Link href={`/workers/${maid._id}`} passHref>
                <Button className="flex items-center gap-3">View Detail <Eye /></Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Workers;
