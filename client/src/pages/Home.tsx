import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Navbar';
import '../components/Footer';
import { SEARCH } from '../utils/queries';
import { useLazyQuery } from "@apollo/client";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searchParks, { loading, data }] = useLazyQuery(SEARCH);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const inputPark = (e.target as HTMLFormElement).park.value.trim();
    if (inputPark) {
      //add in API call to back end data (api object), return an object with park name, location, and frog species
       await searchParks({ variables: { name: inputPark } });
       setResults(data?.getParksByName || []);
    }
  };


  return (
    <main>
      {loading ? <p>Loading</p> :
        <div>
          <h1 className='Frog Finderz'> </h1>
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
          <h2>Search Results</h2>
          {results.map((result, idx: number ) => (
            <div key={idx} >
              <h3>{result.name}</h3>
              <p>{result._id}</p>
              <p>{result.species}</p>
                
              </div>
          ))}

        </div>
      }
    </main>
  );
};

export default Home;

