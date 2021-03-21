import React,{Component} from "react";
import Metadata from '../components/MetaData'
import Transactions from '../components/Transactions'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Covalent() {
  return (
    <div>
        <Metadata></Metadata>
    </div>
  );
}

export default Covalent
