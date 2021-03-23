import {ChosenProductProvider} from './components/ChosenProductContext';
import "./css/app.css"
import Header from './components/Header'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AddItemsCard from './components/AddItemsCard';
import Compose from './components/Compose';
import SummaryPdfPrint from './components/SummaryPdfPrint';
import LoginPage from './components/LoginPage';
import {UserContextProvider} from "./components/UserContext"


function App() {

  return (
    <div className="app-wrapper">
    {/*Router wszystko w środku pozwala nam uzwać Route w którym podajem sciezki do komponentów randeruje jako url */}
    <UserContextProvider>
        <Router>
          <Header />
          <div className="wrapper">
            {/*ChosenProductProvider daje nam dostęp do wszystkiego z useContextu*/}
          <ChosenProductProvider>
            {/*Switch zatrzymuje proces routowania zawsze moesz zajrzeć do DEV Ed
              exact usuwa błąd z "/" i pozwala nie zaijąc wszystkiego w switcha*/}
            <Switch>
              <Route path= "/" exact component = {Compose}/>
              <Route path = "/dodaj" component={AddItemsCard}/>
              <Route path ="/podsumowanie" component={SummaryPdfPrint}/>
              <Route path='/zaloguj' exact component={LoginPage}/>
            </Switch>
          </ChosenProductProvider>
          </div>
        </Router>
    </UserContextProvider>
    </div>

  )
}

export default App;
