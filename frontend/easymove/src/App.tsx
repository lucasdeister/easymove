import style from "./App.module.scss"

import Header from "./components/Header/Header"
import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer"
import { ModalProvider } from './context/ModalContext';

function App() {

  return (
    <div className={style.grid_container}>
    <Header />
    <ModalProvider>
      <Main />
    </ModalProvider>
    <Footer />
  </div>
  )
}

export default App
