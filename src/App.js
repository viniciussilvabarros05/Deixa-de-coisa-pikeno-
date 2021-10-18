
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Home } from './Pages/Home';
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import "./styles/Global.scss"
import menuLateral from './reducers/menuLateralReducer';
function App() {

  const allReducers = combineReducers({menuLateral: menuLateral
                                        })
  const store = createStore(allReducers)
  return (

    <div className="App">
      <BrowserRouter>
        <Switch>
          <Provider store={store}>
            <Route exact Path="/" component={Home} />
          </Provider>
        </Switch>
      </BrowserRouter>

    </div>
  )
}

export default App;
