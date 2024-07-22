import { Button } from '@/components/ui/button'
import { GroupIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className=' flex items-center justify-center h-screen w-full'>
     <Button className='bg-cyan-800 hover:bg-cyan-900'>
      <Link href='/workers' className=' flex items-center flex-row gap-3 text-lg'>
       Go to Workers Page <GroupIcon/>
       </Link>
     </Button>
    </div>
  )
}

export default page