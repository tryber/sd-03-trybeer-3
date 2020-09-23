import React from 'react';
import { useHistory } from 'react-router-dom';

const registerButton = (history) => (
  <div>
    <button
      type="button"
      className="no-account-btn"
      data-testid="no-account-btn"
      onClick={() => history.push('/register')}
    >
      Ainda não tenho conta
    </button>
  </div>
);

function Home() {
  const history = useHistory();

  return (
    <div>
      <h1>Home</h1>
      {registerButton(history)}
    </div>
  );
}

export default Home;
