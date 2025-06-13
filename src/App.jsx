import './App.css'
import HeaderBox from './components/HeaderBox';
import FooterBox from './components/FooterBox';
import Background from './components/Background';
import Overlay from './components/Overlay';

function App() {

  return (
    <div>
      <Overlay /> 
      <Background />
      <HeaderBox />
      <FooterBox />
    </div>
  )
}

export default App
