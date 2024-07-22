// components/MaidDetails.js
const MaidDetails = ({ maid }) => {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 rounded-lg shadow-lg bg-white">
        <img className="w-full h-64 object-cover rounded-t-lg" src={maid.imageUrl} alt={maid.name} />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{maid.name}</h1>
          <p className="text-lg mb-2"><strong>Father&apos;s Name:</strong> {maid.fathersName}</p>
          <p className="text-lg mb-2"><strong>Grandfather&apos;s Name:</strong> {maid.grandFathersName}</p>
          <p className="text-lg mb-2"><strong>Price:</strong> ${maid.price}</p>
          <p className="text-lg mb-2"><strong>Category:</strong> {maid.category.name}</p>
          <p className="text-lg mb-2"><strong>Available:</strong> {maid.isAvailable ? 'Yes' : 'No'}</p>
          
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Experience</h2>
            <ul className="list-disc list-inside">
              {maid.experience.map((exp, index) => (
                <li key={index}>{exp}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Reviews</h2>
            <ul className="list-disc list-inside">
              {maid.review.map((rev, index) => (
                <li key={index}>{rev}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default MaidDetails;
  