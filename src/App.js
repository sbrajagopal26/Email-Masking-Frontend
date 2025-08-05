import React from 'react';
import EmailMasker from './components/EmailMasker';
import LandingPage from "./LandingPage";

function App() {
  return (
    <div className="App">
      <h1>Email Privacy Masker</h1>
      <EmailMasker />
      <LandingPage />
    </div>
  );
}

export default App;
