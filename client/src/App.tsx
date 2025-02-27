import './App.css'
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
 

  return (
    <ApolloProvider client={client}>
    <div className="flex-column justify-flex-start min-100-vh">
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  </ApolloProvider>
  )
}

export default App
