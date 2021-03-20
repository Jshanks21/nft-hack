import logo from './logo.svg';
import './App.css';
import NFTCard from './components/NFTCard'
import Header from './components/Header'
import BuySell from './components/BuySell'

function App() {
  return (
    <div>
        <Header></Header>
        <NFTCard></NFTCard>
        <BuySell></BuySell>
    </div>
  );
}

export default App;
