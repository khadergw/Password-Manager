import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios";

// import { event } from 'cypress/types/jquery';


function App() {

//creating a state for each value we get from the form to send them to the backend
const [title, setTitle] = useState('');
const [website, setWebsite] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [passwordList, setPasswordList] = useState([]);
const [isNotClicked, setIsNotClicked] = useState(true);


//function that makes the api request
const addPassword = () => {
  Axios.post('http://localhost:3001/addpassword', {title:title, website:website, username:username, password:password});
 console.log('add password function')
};

//function to decrypt the password
const decryptPassword = (encryption) => {
  Axios.post("http://localhost:3001/decryptpassword", { password: encryption.password, iv: encryption.iv}).then((response)=> {
  setPasswordList(passwordList.map((val)=> {
    return val.id == encryption.id ? {id: val.id, password: val.password, title: response.data, iv:val.iv} : val;
  })) 
  });
};



//function that handles the click of password sections
const handleClick = (val) => {
  setIsNotClicked(!isNotClicked); 
  if(isNotClicked) {
    return val.title;
  } else {return decryptPassword({password: val.password, iv: val.iv, id: val.id})}
  };


  const handleClearClick = (event) => {
  //clear the inputs after submit
  // event.preventDefault();
  // event.target.reset();
// setTitle('');
// setWebsite("")
// setUsername("")
// setPassword("")
    };
  
    const handleSubmit = (e) => {
      console.log('handleSubmit ran');
      e.preventDefault(); // prevent page refresh
  
      //clear all input values in the form
      setTitle('new');
      setWebsite('new');
      setUsername('new');
      setPassword('new');
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
  <form onSubmit={(e) => handleSubmit(e)}>
    <p>Welcome to Your Password Manager</p>
    <input type="text" placeholder="Title" onChange={(event) => {setTitle(event.target.value);}}/><br/>
    <input type="url" placeholder="Website URL" onChange={(event) => {setWebsite(event.target.value);}}/><br/>
    <input type="text" placeholder="User Name" onChange={(event) => {setUsername(event.target.value);}}/><br/>
    <input type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value);}}/><br/>
    <input  onClick={() => {
          // handleSubmit();
          addPassword();
          // handleClearClick();
          // setUsername('');
          console.log('added value');
          
        
          
        }} type="button" value="Add Password" /><br/>
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

{/* <h3>{val.title}</h3> */}

{/* {isNotClicked ? val.title : decryptPassword({password: val.password, iv: val.iv, id: val.id})}  */}


</div>


})}


</div>


    </div>
 
    </div>
  
  );
  
}



export default App;
