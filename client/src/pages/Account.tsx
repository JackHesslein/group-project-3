import AccountCard from "../components/AccountCard";

const Account = () => {
    const favorites: any[] = [];
    return (
      <main>
        <div className="AC">
            <AccountCard></AccountCard>
        </div>
        <div>
            {favorites.map((favorite) => (
            <div>{favorite}</div>
            ))} 
        </div>
      </main>
    );
  }
  
  export default Account;