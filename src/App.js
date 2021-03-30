import history from "./components/history"
import {ChosenProductProvider} from './components/ChosenProductContext';
import "./css/app.css"
import Header from './components/Header'
import {Switch, Route} from 'react-router-dom';
import {Router} from 'react-router-dom';
import AddItemsCard from './components/AddItemsCard';
import Compose from './components/Compose';
import SummaryPdfPrint from './components/SummaryPdfPrint';
import LoginPage from './components/LoginPage';
import {UserContextProvider} from "./components/UserContext"
import Home from './components/Home';
import Footer from './components/Footer';
import SingleValuation from './components/SingleValuation';
import ValuationArchive from "./components/ValuationArchive";



function App() {

  return (
    <Router history={history}>
    <div className="app-wrapper">
    {/*Router wszystko w środku pozwala nam uzwać Route w którym podajem sciezki do komponentów randeruje jako url */}
    <UserContextProvider>
          <Header />
          <div className="wrapper">
            {/*ChosenProductProvider daje nam dostęp do wszystkiego z useContextu*/}
          <ChosenProductProvider>
            {/*Switch zatrzymuje proces routowania zawsze moesz zajrzeć do DEV Ed
              exact usuwa błąd z "/" i pozwala nie zaijąc wszystkiego w switcha*/}
            <Switch>
              <Route path= "/" exact component={Home}/>
              <Route path= "/wyceń"  component={Compose}/>
              <Route path = "/dodaj" component={AddItemsCard}/>
              <Route path ="/podsumowanie" component={SummaryPdfPrint}/>
              <Route path='/zaloguj' component={LoginPage}/>
              <Route path='/wyceny' exact component={ValuationArchive}/>
              <Route path= "/wyceny/singleValuation/:id" component={SingleValuation}/>
            </Switch>
          </ChosenProductProvider>
          </div>
    </UserContextProvider>
    </div>
        </Router>

  )
}

export default App;
