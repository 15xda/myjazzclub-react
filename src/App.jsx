import './App.css'
import HeaderBox from './components/HeaderBox';
import FooterBox from './components/FooterBox';
import Background from './components/Background';
import Overlay from './components/Overlay';
import Loader from './components/Loader';
import useLoading from './hooks/useLoading';

function App() {

  const {loading} = useLoading();

  return (
    
    <>
        <Overlay /> 
        {loading ? <Loader /> : (
          <>
            <Background />
            <HeaderBox />
            <FooterBox />
          </>
        )}
    </>
    
  )
}

export default App
