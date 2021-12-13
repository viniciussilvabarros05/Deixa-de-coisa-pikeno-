
import './App.css';
import "./styles/Global.scss"
import { Route, BrowserRouter, Switch } from 'react-router-dom';
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
import { Cozinha } from './Admin/Cozinha';
import { Admin } from './Admin/Admin';
import { Login } from './Pages/Login';
import AdminReducer from './reducers/AdminReducer';
import { PrivateRouter } from './components/PrivateRouter';
import cardapio from './reducers/Cardapio';
import { Cardapio } from './Admin/CardapioAdmin';
import { PrivateCozinha } from './components/PrivateRouterCozinha';
import { RequestClients } from './reducers/RequestClientsReducer';
import { Carrinho as RequestCarrinho } from './reducers/CarrinhoReducer';
function App() {




  const allReducers = combineReducers({
    menuLateral: menuLateral,
    parsedMenuBar: ParseMenu,
    payment: payment,
    admin: AdminReducer,
    cardapio: cardapio,
    pedidos: RequestClients,
    carrinho: RequestCarrinho
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

            <PrivateRouter path="/adminpikeno">
              <Admin />
            </PrivateRouter>

            <PrivateRouter exact path="/cardapio">
              <Cardapio />
            </PrivateRouter>

            <PrivateCozinha path="/admincozinha">
              <Cozinha />
            </PrivateCozinha>
            
            <PrivateRouter path="/relatorio">
              
            </PrivateRouter>
            <PrivateRouter path="/clientes">

            </PrivateRouter>

            <Route exact path="/login">
              <Login />
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
