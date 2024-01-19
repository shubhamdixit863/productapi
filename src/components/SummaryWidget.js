import axios from 'axios';
import React, { useState,useEffect } from 'react'
const api = "http://localhost:8080/invoicesAll";

const SummaryWidget = () => {
  const [transactions,setTransactions] = useState([]);
  const [totalInvoice,setTotalInvoice]=useState(0);


  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        console.log(res.data);
        setTransactions(res.data.invoices);
        setTotalInvoice(res.data.totalItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const calculateTotal = (transactions) => {
    return transactions.reduce((acc, transaction) => acc + Number(transaction.amount), 0);
};

const total = calculateTotal(transactions);
  return (
    <div className="container mx-auto my-8 p-5 bg-white shadow-lg rounded">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Summary</h2>
    <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
            <thead>
                <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Transaction Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Description
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Reference Number
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                    </th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {transaction.transactionDate}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {transaction.description}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {transaction.transactionId}
                        </td>
                        <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${Number(transaction.amount) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ${transaction.amount}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <div className="mt-4">
        <p className={`text-xl font-bold ${total >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            Total Amount: ${total}
        </p>
    </div>
</div>
  )
}

export default SummaryWidget