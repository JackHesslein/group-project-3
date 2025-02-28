interface AccountProps {
  username: string;
  email: string;
}

const AccountCard = (props: AccountProps) => {
  return (
    <main>
      <div className="AC">
        <h1>{props.username}</h1>
        <h2>{props.email}</h2>
      </div>
    </main>
  );
}

export default AccountCard;