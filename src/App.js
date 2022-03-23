import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import AddUser from './components/AddUser';
import AllUser from './components/AllUser';
import NotFound from './components/NotFound';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import EditUser from './components/EditUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/allUser" component={AllUser} />
          <Route exact path="/addUser" component={AddUser} />
          <Route exact path="/edit/:id" component={EditUser} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
