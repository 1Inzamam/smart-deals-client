import { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const newBids = [...bids, ...data];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        });
    }
  }, [user?.email]);
  console.log(user);
  return (
    <div>
      <h1 className="text-5xl font-bold">
        MyBids <span className="gradient-text">{bids.length}</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Bid Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bids.map(
              (bid, index) => (
                console.log(bid),
                (
                  <tr key={bid._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={bid.buyer_image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid.buyer_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{bid.buyer_email}</td>
                    <td>{bid.bid_price}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">Actions</button>
                    </th>
                  </tr>
                )
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
