
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Pedidos } from './Pages/Pedidos';
import { Carrinho } from './Pages/Carrinho';


import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import "./styles/Global.scss"
import menuLateral from './reducers/menuLateralReducer';
import { MenuLateral } from './components/menu-lateral';

function App() {

  const allReducers = combineReducers({
    menuLateral: menuLateral
  })
  const store = createStore(allReducers)
  return (

    <div className="App">
      <BrowserRouter>

        <Provider store={store}>
          <Switch>



            <Route exact path="/Home">
              <Home />
            </Route>

            <Route path="/pedidos">
              <Pedidos />
            </Route>
            <Route path="/carrinho">
              <Carrinho />
            </Route>

            <Route path="*">
              <Home />
            </Route>
          </Switch>
          <MenuLateral></MenuLateral>
        </Provider>
        
      </BrowserRouter>

    </div>
  )
}

export default App;
