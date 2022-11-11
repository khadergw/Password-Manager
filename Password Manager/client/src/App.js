import './App.css';
import {useState} from "react";


function App() {

//creating a state for each value we get from the form 
const {title, setTitle} = useState('')
const {website, setWebsite} = useState('')
const {username, setUsername} = useState('')
const {password, setPassword} = useState('')


  return (
    <div className="App">
    <div className="container"> 
  <form >
    <p>Welcome to Your Password Manager</p>
    <input type="text" placeholder="Title" /><br/>
    <input type="url" placeholder="Website URL" /><br/>
    <input type="text" placeholder="User Name" /><br/>
    <input type="password" placeholder="Password" /><br/>
    <input type="button" value="Add Password" /><br/>
  </form>

  <div className="circles">
    <div className="circle circle-1"></div>
    <div className="circle circle-2"></div>
    <div className="circle circle-3"></div>
    <div className="circle circle-4"></div>
    <div className="circle circle-5"></div>
  </div>

    </div>
    </div>
  );
}

export default App;
