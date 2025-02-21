import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-title">
        <Link to='/'>
          <h1>Frog Finderz</h1>
        </Link>
      </div>
        <div className="nav-links">
            <Link to='/'>Search</Link>
            <Link to='/account'>Account</Link>
    </div>
    </div>
  );
}

export default Navbar;