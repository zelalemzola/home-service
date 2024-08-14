
import { Button } from '@/components/ui/button';
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr';
import './globals.css'
import Image from 'next/image';
import Profiles from '../../public/profiles.png';
import Filter from '../../public/filter.png';
import Detail from '../../public/det.png';
import { MousePointerClick, Phone, Search } from 'lucide-react';
import HeroButton from '@/components/HeroButton';




const Home = () => {
  
  return (
    <div className="relative  w-full">
  {/* <div className='flex items-center justify-end gap-60 px-6 fixed top-0 border-b py-2 w-full text-primary text-lg font-semibold font-sans'>
    <Link href='/workers'>Find Workers</Link>
  </div> */}
  <div className='md:h-screen md:w-full md:px-4 pt-[35%] pb-10 md:py-[20%] place-content-center'>
   <div className='flex flex-col md:flex-row items-center   md:gap-5 justify-between px-10'>
    <div className='flex flex-col items-start  gap-4 flex-2'>
      <h1 className='text-4xl text-primary font-bold '>Find the Right Person to Aid You at Home</h1>
      <p className='text-gray-500 text-lg'>Choose, Filter, and Hire Tailored to Your Needs</p>
      <HeroButton/> 
    </div>
    <div className='scale-[60%] md:scale-[100%] flex flex-col items-center gap-4 px-[100px] md:px-20 rounded-full bg-secondary py-6 md:py-6 '>
    <div className="flex  gap-4">
      <Image src='/baby.svg' alt='taking care' width={100} height={100} />
      <Image src='/clean.svg' alt='taking care' width={170} height={170}/>
      </div>
      <Image src='/cooking.svg' alt='taking care' width={170} height={170}/>
    </div>
   </div>
  </div>
  <div className="md:h-screen md:w-full flex flex-col items-center gap-10 md:px-20 md:py-8 ">
    <h1 className='text-primary text-4xl  font-extrabold'>Who We Are</h1>
    <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20">
    <p className='md:w-[60%] font-semibold text-lg md:text-2xl text-secondary'>We are dedicated to connect you with professional, trustworthy, and skilled Workers who understand your unique home requirements. With our easy-to-use platform, finding the right help has never been simpler.</p>
    <Image src='/about.svg' alt='connect' width={370} height={370} className='scale-[60%] md:scale-[100%]  '/>
    </div>

  </div>

  <div className='md:h-screen md:w-full '>
    <h1  className='text-4xl text-primary font-bold text-center py-5 lg:py-10'>How It Works</h1>
    <div className="flex flex-col md:flex-row items-center  gap-20 justify-center w-full md:px-10  py-5 lg:py-10">
      <div className="flex flex-col  items-center justify-center gap-5 md:w-1/2">
      <p className='text-2xl text-secondary font-bold'>Browse Among Profiles</p>
      <p className='text-lg text-gray-500 text-center'>Discover thousands of skilled professionals, which have gone under serious background review by our company</p>
      </div>
      <Image src={Profiles} alt='how' className='w-[90%] md:w-1/2  object-contain'/>
    </div>
  </div>

  <div className='md:h-screen md:w-full '>
    <div className="flex flex-col md:flex-row-reverse items-center  gap-20 justify-center w-full md:px-10 pt-20 ">
      <div className="flex flex-col items-center justify-center gap-5 md:w-1/2">
      <p className='text-2xl text-secondary font-bold'>Filter Workers</p>
      <p className='text-lg text-gray-500 text-center'>Customize your feed by Filtering Workers by their working category, and price </p>
      </div>
      <Image src={Filter} alt='how' className='w-[90%] md:w-1/2 object-contain rounded-2xl'/>
    </div>
  </div>
  
  <div className='md:h-screen md:w-full py-20 lg:py-0'>
    <div className="flex flex-col md:flex-row items-center  gap-20 justify-center w-full md:px-10 pt-20 ">
      <div className="flex flex-col items-center justify-center gap-5 md:w-[40%]">
      <p className='text-2xl text-secondary font-bold'>Hire With Confidence</p>
      <p className='text-lg text-gray-500 text-center'>After choosing the right worker for you. Get full detail about the worker and even read reviews the worker has from other clients. </p>
      </div>
      <Image src={Detail} alt='how' className='w-[70%] md:w-[60%] object-contain '/>
    </div>
  </div>
  <div className='md:h-[50%] md:w-full bg-secondary py-10 px-3 lg:px-10'>
    <div className="flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between">
      <div className="flex flex-col gap-6 lg:gap-4 items-center md:w-1/2">
   <h1 className='text-white text-2xl md:text-3xl font-extrabold mx-auto'>What Makes Us A Better Choice</h1>
   <p className='text-white text-md text-center'>We believe in empowering individuals to find the best solutions for their home needs.Even after offering multiple Proffessionals in one platform where clients can filter and choose after Hiring a worker client will be provided with a full background of the worker in a document format which will provide more safety for the client and also gain more knowledge about the Worker</p>
   </div>
      <div className="flex flex-col  items-center gap-4 lg:gap-8 md:w-1/2">
   <h1 className='text-white text-3xl font-extrabold text-center'>Give Us Call</h1>
      <Button className='bg-[#a88905] px-5 p-3 text-xl font-bold gap-4'><Phone/> 9080</Button>
   </div>
   </div>
  </div>
   <div className='bg-secondary hover:bg-secondary p-2 px-2 text-white text-md font-bold w-fit fixed top-0 right-0 mt-[10%] rounded-l-full animate-bounce shadow-lg'>
    <Link href='/workers' className='flex items-center gap-2 bg-secondary '><Search color='white'  size={22} /> Search Workers</Link>
   </div>
  </div>
  )
}

export default Home;