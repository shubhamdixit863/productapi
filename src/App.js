import logo from './logo.svg';
import './App.css';
import { useNavigate } from 'react-router-dom';


function App() {
    const navigate=useNavigate();

    const routeIt=(path)=>{
        navigate(path)
    }
  return (

      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-10">Income Tracker</h1>
            <div className="grid grid-cols-2 gap-4">
                <div onClick={()=>routeIt("/summary")} style={{cursor:"pointer"}} className="flex items-center justify-center w-64 h-64 bg-blue-500 text-white text-2xl font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                    Summary
                </div>
                <div onClick={()=>routeIt("/invoice")} style={{cursor:"pointer"}} className="flex items-center justify-center w-64 h-64 bg-green-500 text-white text-2xl font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors">
                    Invoice
                </div>
            </div>
        </div>
 
  );
}

export default App;
