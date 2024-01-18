import { HashRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import Attempt from "./pages/Attempt"
import Subtest from "./pages/Subtest"
import Dashboard from "./pages/Dashboard";
import TryoutList from './pages/TryoutList';
import Login from './pages/LoginPage'
import Prolink from './components/Prolink';
import TestAttempt from "./pages/Attempt/index2"

function App() {
  return (
    <div>
      <HashRouter>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Prolink path="/dashboard" component={Dashboard} />
            <Prolink path="/tryout" exact component={TryoutList} />
            <Prolink path="/tryout/:tryoutId" exact component={Subtest} />
            <Prolink path="/tryout/:tryoutId/attempt/:attemptId" component={Attempt} />
            <Prolink path="/test" component={TestAttempt} />
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
