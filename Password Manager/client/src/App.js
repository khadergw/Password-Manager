import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios";


function App() {

//creating a state for each value we get from the form to send them to the backend
const [title, setTitle] = useState('');
const [website, setWebsite] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [passwordList, setPasswordList] = useState([]);
const [isDivClicked, setIsDivClicked] = useState(false);

//function that makes the api request
const addPassword = () => {
  Axios.post('http://localhost:3001/addpassword', {title:title, website:website, username:username, password:password})
;};

//function to decrypt the password
const decryptPassword = (encryption) => {
  Axios.post("http://localhost:3001/decryptpassword", { password: encryption.password, iv: encryption.iv}).then((response)=> {
  setPasswordList(passwordList.map((val)=> {
    return val.id == encryption.id ? {id: val.id, password: val.password, title: response.data, iv:val.iv} : val;
  })) 
  });
};

//function that handles the click of password sections
const handleClick = () => {
  setIsDivClicked(!isDivClicked); 
  };


//call api once the page renders
useEffect(() => {
  Axios.get('http://localhost:3001/showpasswords').then((response) => {
    setPasswordList(response.data);
  });
}, []);




  return (
    <div className="App">
      
    <div className="container"> 
  <form >
    <p>Welcome to Your Password Manager</p>
    <input type="text" placeholder="Title" onChange={(event) => {setTitle(event.target.value);}}/><br/>
    <input type="url" placeholder="Website URL" onChange={(event) => {setWebsite(event.target.value);}}/><br/>
    <input type="text" placeholder="User Name" onChange={(event) => {setUsername(event.target.value);}}/><br/>
    <input type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value);}}/><br/>
    <input onClick={addPassword} type="button" value="Add Password" /><br/>
  </form> 

  <div className="circles">
    <div className="circle circle-1"></div>
    <div className="circle circle-2"></div>
    <div className="circle circle-3"></div>
    <div className="circle circle-4"></div>
    <div className="circle circle-5"></div>
  </div>

   
  


    <div className='Passwords'>
      
{passwordList.map((val, key)=> {
 
return <div
className='password' 
onClick={handleClick}

key={key}
>

{isDivClicked ? val.title : decryptPassword({password: val.password, iv: val.iv, id: val.id})}
</div>
})}
</div>

    </div>

    </div>
  );
}


export default App;
