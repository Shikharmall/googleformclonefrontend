
import Creator from "./components/Creator";
import User from "./components/User";

import { BrowserRouter , Route , Routes } from 'react-router-dom';

function App() {
  

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='' element={<Creator/>}/>
          <Route path='responder' element={<User/>}/>
          <Route path='*' element={<Creator/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
