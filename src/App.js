
import './App.css';
import "./styles/Global.scss"
import { Route, BrowserRouter, Switch,useHistory } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Pedidos } from './Pages/Pedidos';
import { Carrinho } from './Pages/Carrinho';
import { Sobre } from './Pages/Sobre';
import { Contatos } from './Pages/Contatos';
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"


import menuLateral from './reducers/menuLateralReducer';
import { MenuLateral } from './components/menu-lateral';
import ParseMenu from './reducers/menuBar';
import payment from './reducers/ReducerPay';

function App() {
  const history = useHistory();
 


  const allReducers = combineReducers({
    menuLateral: menuLateral,
    parsedMenuBar: ParseMenu,
    payment: payment
  })

  
  const store = createStore(allReducers)
  return (

    <div className="App">


      <Provider store={store}>
        <BrowserRouter>
          <Switch>

            <Route path="/pedidos">
              <Pedidos />
            </Route>
            <Route path="/carrinho">
              <Carrinho />
            </Route>

            <Route path="/sobre">
              <Sobre></Sobre>
            </Route>

            <Route path="/contatos">
              <Contatos></Contatos>
            </Route>

            <Route exact path="/">
              <Home />
            </Route>

            <Route path="*">
              <Home />
            </Route>


          </Switch>
          <MenuLateral></MenuLateral>

        </BrowserRouter>
     
      </Provider>



    </div>
  )
}

export default App;
