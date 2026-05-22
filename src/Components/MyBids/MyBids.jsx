import { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

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

  const handleRemoveBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("now delete");
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Removed!",
                text: "Your bid has been removed.",
                icon: "success",
              });
              // remove the deleted bid from the state
              const remainingBids = bids.filter((bid) => bid._id !== _id);
              setBids(remainingBids);
            }
          });
      }
    });
  };

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
              <th>Status</th>
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
                    <td>
                      {bid.status === "success" ? (
                        <div className="badge badge-success">{bid.status}</div>
                      ) : (
                        <div className="badge badge-warning">{bid.status}</div>
                      )}
                    </td>
                    <th>
                      <button
                        onClick={() => handleRemoveBid(bid._id)}
                        className="btn btn-outline border-red-600 text-red-600 btn-xs"
                      >
                        Remove Bid
                      </button>
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
