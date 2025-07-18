import './App.css';
import Header from './components/header/Header';
import Main from './components/main/main';
import Footer from './components/footer/footer';

import { useMainModal } from './features/useMainModal';

function App() {

  const { isOpen, show, hide } = useMainModal();

  return (
    <div className='wrapper'>
      <Header onClick={show} />
      <Main isOpen={isOpen} onClose={hide} onClick={show} />
      <Footer />
    </div>
  );
}

export default App;
