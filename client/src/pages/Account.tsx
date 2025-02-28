import { useQuery } from "@apollo/client";
import AccountCard from "../components/AccountCard";
import { QUERY_ME } from "../utils/queries";

const Account = () => {
    // get the information of the logged in user from the db
    const { loading, data } = useQuery(QUERY_ME);
    // pass that data as props to account card
    const favorites: any[] = [];
    return (
        <main>
            {loading ? <p>Loading</p> :
                <>
                    <div className="AC">
                        <AccountCard username={data.me.username} email={data.me.email}></AccountCard>
                    </div>
                    <div>
                        {favorites.map((favorite) => (
                            <div>{favorite}</div>
                        ))}
                    </div>
                </>
            }
        </main>
    );
}

export default Account;