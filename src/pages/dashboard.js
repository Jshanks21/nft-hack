import React,{Component} from "react";
import Dashboard from '../components/covalent'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Covalent() {
  return (
    <div>
        <Dashboard></Dashboard>
    </div>
  );
}

export default Dashboard;
