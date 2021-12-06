import React, { useState, useEffect } from "react";
import axios from "axios";

function AddressCollection() {
  const [userAddress, setUserAddress] = useState([]);
  const [count, setCount] = useState([0]);
  const [state, setState] = useState(true);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const token = window.localStorage.getItem("token");
  async function getDetails() {
    let response = await axios.get("http://localhost:4000/user/showAddress", {
      headers: { Authorization: token },
    });
    setUserAddress(response.data.message);
  }

  const handleEdit = async (e, id) => {
    e.preventDefault();
    let data = {
      addressId: id,
      address: address,
      city: city,
      postalCode: postalCode,
      country: country,
      phoneNumber: phoneNumber,
    };
    let response = await axios.post(
      "http://localhost:4000/user/updateAddress",
      data,
      {
        headers: { Authorization: token },
      }
    );
    window.location.reload(false);
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    let data = {
      addressId: id,
    };
    let response = await axios.post(
      "http://localhost:4000/user/deleteAddress",
      data,
      {
        headers: { Authorization: token },
      }
    );
    window.location.reload(false);
  };
  const handleNewAddress = async (e) => {
    e.preventDefault();
    let data = {
      address: address,
      city: city,
      postalCode: postalCode,
      country: country,
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(
      "http://localhost:4000/user/addAddress",
      data,
      {
        headers: { Authorization: token },
      }
    );
    window.location.reload(false);
  };
  useEffect(() => {
    getDetails();
    setCount(1);
  }, []);
  return (
    <div>
      <div className="entries-wrapper">
        {userAddress.map(function (d) {
          return (
            <div className="row" key={d._id}>
              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                <div className="entries-info text-center">
                  <textarea
                    placeholder={d.address}
                    id={"address"+d._id}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder={d.city}
                    id ={"city"+d.city}
                    name=""
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder={d.postalCode}
                    id ={"postal"+d.postalCode}
                    name=""
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder={d.country}
                    id ={"country"+d.country}
                    name=""
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder={d.phoneNumber}
                    id ={"phone"+d.phoneNumber}
                    name=""
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                <div className="entries-edit-delete text-center">
                  <button
                    className="edit"
                    onClick={(e) => handleEdit(e, d._id)}
                  >
                    Edit
                  </button>
                  <button onClick={(e) => handleDelete(e, d._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="entries-wrapper">
        <div className="row">
          <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
            <div className="entries-info text-center">
              <textarea
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="PostalCode"
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <input
                type="text"
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                type="text"
                placeholder="PhoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
            <div className="entries-edit-delete text-center">
              <button className="add" onClick={(e) => handleNewAddress(e)}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressCollection;
