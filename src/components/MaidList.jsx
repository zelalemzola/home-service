// components/MaidList.js
import Link from 'next/link';

const MaidList = ({ maids }) => {
  return (
    <div>
      {maids.map((maid) => (
        <div key={maid._id}>
          <h2>{maid.name}</h2>
          <p>{maid.category.name}</p>
          <Link href={`/workers/${maid._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default MaidList;
