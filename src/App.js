
import './App.css';
import { MenuLateral } from './components/menu-lateral';

import { Home } from './Pages/Home';

import "./styles/Global.scss"
function App() {
  return (
    <div className="App">
    <Home></Home>
    <MenuLateral></MenuLateral>
    </div>
  );
}

export default App;
