import {ChosenProductProvider} from './components/ChosenProductContext';
import "./css/app.css"
import Header from './components/Header'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AddItemsCard from './components/AddItemsCard';
import Compose from './components/Compose';
import Footer from './components/Footer';
// import Summary from './components/Summary';
import SummaryPdfPrint from './components/SummaryPdfPrint';

function App() {

  return (
    <div className="app-wrapper">
    {/*Router wszystko w środku pozwala nam uzwać Route w którym podajem sciezki do komponentów randeruje jako url */}
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
        </Switch>
      </ChosenProductProvider>
      </div>
    </Router>
    <Footer/>
    </div>

  )
}

export default App;
