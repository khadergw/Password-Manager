import './App.css';

function App() {
  return (
    <div className="App">
    <div class="container"> 
  <form >
    <p>Welcome to Your Password Manager</p>
    <input type="text" placeholder="Title" /><br/>
    <input type="url" placeholder="Website url" /><br/>
    <input type="text" placeholder="User Name" /><br/>
    <input type="password" placeholder="Password" /><br/>
    <input type="button" value="Add Password" /><br/>
  </form>

  <div class="drops">
    <div class="drop drop-1"></div>
    <div class="drop drop-2"></div>
    <div class="drop drop-3"></div>
    <div class="drop drop-4"></div>
    <div class="drop drop-5"></div>
  </div>

    </div>
    </div>
  );
}

export default App;
