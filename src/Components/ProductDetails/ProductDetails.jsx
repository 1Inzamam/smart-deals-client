import { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const [bids, setBids] = useState([]);
  const { user } = use(AuthContext);
  const { _id } = useLoaderData();
  const bidModalRef = useRef(null);
  console.log(_id);

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this product", data);
        setBids(data);
      });
  }, [_id]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    // const bid = parseInt(form.bid.value);
    const bid = Number(form.bid.value);
    console.log(_id, name, email, bid);
    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed.",
            showConfirmButton: false,
            timer: 1500,
          });
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };

  return (
    <div>
      {/* product info */}
      <div>
        <div></div>
        <div>
          <button
            onClick={handleBidModalOpen}
            className="btn btn-primary-gradient"
          >
            I want to buy this product
          </button>

          <dialog
            ref={bidModalRef}
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Give a Bid!</h3>
              <p className="py-4">
                Offer something sellers will like and you may get a better deal!
              </p>
              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="input"
                    name="name"
                    defaultValue={user.displayName}
                    readOnly
                  />
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    defaultValue={user.email}
                    readOnly
                  />
                  <label className="label">Your Bid</label>
                  <input
                    type="number"
                    className="input"
                    name="bid"
                    placeholder="Enter your bid"
                  />

                  <button className="btn btn-neutral mt-4">
                    Place your Bid
                  </button>
                </fieldset>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/* bids for this product */}
      <div>
        <h3 className="text-5xl font-bold">
          Bids for this product:{" "}
          <span className="gradient-text">{bids.length}</span>
        </h3>
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
              {bids.map((bid, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                       
                      </div>
                    </div>
                  </td>
                  <td>
                    {bid.buyer_email}
                   
                  </td>
                  <td>TK  {bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
