// App.js
import React from 'react';
import './App.css'; // Import your CSS file for styling
import FormBuilder from './components/FormBuilder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Form Generator</h1>
        <div class = "para"><p>Create a form using Add Field button</p>
        <p>You can save & load the last saved configuration</p>
        <p>Click submit Form but make sure labels aren't empty</p>
        </div>
      </header>
      <main>
        <FormBuilder />
      </main>
    </div>
  );
}

export default App;
