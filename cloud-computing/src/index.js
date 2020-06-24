import React from 'react';
import ReactDOM from 'react-dom';
import '../src/css/index.css';
import Login from "./js/components/login";
import Dashboard from "./js/components/dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      proxy: '',
      showRoute:false
    }
  }


  renderRedirect = (proxy) => {
    this.setState({ proxy: proxy,showRoute:true });
    this.getRoute();
  }

  getRoute = () => {
    return <Redirect to='/dashboard' />;
  }

  render() {
    let {proxy,showRoute}=this.state;
    return (
      <div >
        <Router>
        {
         showRoute && this.getRoute()
        }
          <Switch>
            <Route exact path="/" render={(props) => <Login {...props} passValue={this.renderRedirect} />} />
            <Route exact path="/login" render={(props) => <Login {...props} passValue={this.renderRedirect} />} />
            <Route exact path="/dashboard" render={(props) => <Dashboard {...props} proxy={proxy} />} />
            <Route >
              <div>Invalid URL</div>
            </Route>
          </Switch>
        </Router>
      </div >
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
