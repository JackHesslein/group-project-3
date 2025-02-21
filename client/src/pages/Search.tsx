import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCard from '../components/AccountCard';
import '../components/Navbar';
import '../components/Footer';

const Home: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const inputPark = (e.target as HTMLFormElement).park.value.trim();
    if (inputPark) {
      //add in API call to back end data (api object), return an object with park name, location, and frog species
      setResults([1, 2, 3, 4, 5]);
    }
  };


  return (
    <div>
      <h1 className= 'Frog Finderz'> </h1>
      <form onSubmit={handleSearch} className="mb-6 flex">
        <input
          type="text"
          name="park"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter park name..."
        />
        <button type="submit"
        className="p-2 bg-blue-700 rounded-r-lg hover:bg-blue-800"
        >
        Search</button>
      </form>
      {results.map((result) => (
        <div>{result}</div>
      ))} 
    </div>
  );
};
function setPark(_inputPark: any) {
    throw new Error('Function not implemented.');
}
export default Home;

