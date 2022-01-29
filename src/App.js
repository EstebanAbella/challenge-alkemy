import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage';
import MenuPage from './Pages/MenuPage';
import SearchResultPage from './Pages/SearchResultPage'

//Redux
import {Provider} from 'react-redux'
import GenerateStore from './Redux/store'
//Fin Redux


function App() {

  const store = GenerateStore()

  return(

          <BrowserRouter>
            <Provider store={store}>
              <Routes>
                <Route path="/login" exact element={<LoginPage />} />
                <Route path="/menu" exact element={<MenuPage />} />
                <Route path="/search" exact element={<SearchResultPage />} />
                <Route path="/" exact element={<HomePage />} />
                <Route path="*" exact element={<HomePage />} />
              </Routes>
            </Provider>
          </BrowserRouter>

  )
}

export default App;


//API Key: 9ebe3278eec8417ba79b991ac91fb048
//gmail : ea709468f5744e56a112f5351bda64fe

