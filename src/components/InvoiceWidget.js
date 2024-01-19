import axios from "axios";
import React, { useState, useEffect } from "react";

const api = "http://localhost:8080/invoices";
const InvoiceWidget = () => {
  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [invoices, setInvoices] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // or any number you choose
  const [total, setTotal] = useState(0);
const [update,setUpdate]=useState(0);
  useEffect(() => {
    axios
      .get(`${api}?page=${currentPage}&limit=${itemsPerPage}`)
      .then((res) => {
        console.log(res.data);
        setInvoices(res.data.invoices);
        setTotal(res.data.totalItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage,update]);

  const [showPopup, setShowPopup] = useState(false);

  const [showEditPopup, setShowEditPopup] = useState(false);

  const [editInvoiceData,setEditInvoiceData]=useState({})


  const editInvoice=(invoice)=>{
    setShowEditPopup(true);
    setEditInvoiceData(invoice);

  }

  const editFieldsInvoice=(event)=>{
    setEditInvoiceData({...editInvoiceData,[event.target.name]:event.target.value})
  }

  const finalEdit=()=>{
    // call api for  edit

    axios.put(`${api}/${editInvoiceData.id}`, editInvoiceData)
      .then((res) => {
        console.log(res.data);
        setShowEditPopup(false);
        setUpdate(!update)

      })
      .catch((err) => {
        console.log(err);
      });


  }

  const handleAddClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  const handlePopupCloseEdit=()=>{
    setShowEditPopup(false);
  }
  const DeleteItem=(id)=>{
    axios
    .delete(`${api}/${id}`)
    .then((res) => {
      console.log(res.data);
      setShowPopup(false);
      setUpdate(!update)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [creationDate, setCreationDate] = useState("");
  const [type, setType] = useState("AR");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const invoiceData = { name, amount, creationDate, type, description };

    axios
      .post(api, invoiceData)
      .then((res) => {
        console.log(res.data);
        setShowPopup(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Invoice Items</h2>
      <table className="min-w-full table-auto">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2 border-r">Transaction ID</th>
            <th className="px-4 py-2 border-r">Invoice ID</th>
            <th className="px-4 py-2 border-r">Type</th>
            <th className="px-4 py-2 border-r">Transaction Date</th>
            <th className="px-4 py-2 border-r">Description</th>
            <th className="px-4 py-2 border-r">Amount</th>
            <th className="px-4 py-2 border-r">Creation Date</th>
            <th className="px-4 py-2 border-r">Name</th>
            <th className="px-4 py-2 border-r">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2 border-r">{invoice.transactionId}</td>
              <td className="px-4 py-2 border-r">{invoice.id}</td>
              <td className="px-4 py-2 border-r">{invoice.type}</td>
              <td className="px-4 py-2 border-r">{invoice.transactionDate}</td>
              <td className="px-4 py-2 border-r">{invoice.description}</td>
              <td className="px-4 py-2 border-r">{invoice.amount}</td>
              <td className="px-4 py-2 border-r">{invoice.creationDate}</td>
              <td className="px-4 py-2 border-r">{invoice.name}</td>
              <td className="px-4 py-2 border-r">
                {/* Replace with actual icons */}
                <button className="text-blue-500 hover:text-blue-700" onClick={()=>editInvoice(invoice)}>
                  <i className="fas fa-edit"></i>
                </button>{" "}
                <button className="text-red-500 hover:text-red-700" onClick={()=>DeleteItem(invoice.id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAddClick}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Invoice
      </button>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-5 rounded w-1/2">
            {" "}
            {/* Adjusted width here */}
            <h3 className="text-lg mb-4">Add New Invoice</h3>
            <form onSubmit={handleSubmit}>
              {/* Name field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Amount field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Creation Date field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Creation Date
                </label>
                <input
                  type="date"
                  value={creationDate}
                  onChange={(e) => setCreationDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Type field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="AR">AR</option>
                  <option value="AP">AP</option>
                </select>
              </div>

              {/* Description field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  rows="4"
                ></textarea>
              </div>

              {/* Submit and Cancel buttons */}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handlePopupClose}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

{showEditPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-5 rounded w-1/2">
            {" "}
            {/* Adjusted width here */}
            <h3 className="text-lg mb-4">Edit Invoice</h3>
            <form >
              {/* Name field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editInvoiceData.name}
                  name="name"
                  onChange={editFieldsInvoice}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Amount field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={editInvoiceData.amount}
                  name="amount"
                  onChange={editFieldsInvoice}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Creation Date field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Creation Date
                </label>
                <input
                  type="date"
                  value={editInvoiceData.creationDate}
                  name="creationDate"
                  onChange={editFieldsInvoice}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              {/* Type field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Type
                </label>
                <select
                  value={editInvoiceData.type}
                  onChange={editFieldsInvoice}
                  name="type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="AR">AR</option>
                  <option value="AP">AP</option>
                </select>
              </div>

              {/* Description field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  value={editInvoiceData.description}
                  onChange={editFieldsInvoice}
                  name="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  rows="4"
                ></textarea>
              </div>

              {/* Submit and Cancel buttons */}
              <button
              type="button"
              onClick={finalEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handlePopupCloseEdit}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        {/* Pagination Buttons */}
        {Array.from(
          { length: Math.ceil(total / itemsPerPage) },
          (_, i) => i + 1
        ).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className="mx-1 px-3 py-1 border rounded"
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InvoiceWidget;
