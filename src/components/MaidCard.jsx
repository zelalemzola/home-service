// components/MaidCard.js

import Image from 'next/image';
import Link from 'next/link';

const MaidCard = ({ maid }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg m-4 p-4 max-w-sm">
      <Image src={maid.imageUrl} alt={maid.name} width={200} height={200} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{maid.name}</h3>
        <p className="text-gray-700 mb-4">Price: ${maid.price}</p>
        <Link href={`/workers/${maid._id}`}>
          <a className="text-indigo-500 hover:underline">View Details</a>
        </Link>
      </div>
    </div>
  );
};

export default MaidCard;
