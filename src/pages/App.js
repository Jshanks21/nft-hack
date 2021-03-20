import '../App.css';
import React,{Component} from "react";
import NFTCard from '../components/NFTCard'
import Header from '../components/Header'
import BuySell from '../components/BuySell'
import dashboard from './dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
        <main>
            <Switch>
                <Route path="/dashboard" component={dashboard} exact />
            </Switch>
        </main>
    </div>
  );
}

export default App;
