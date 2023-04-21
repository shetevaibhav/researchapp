import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Dashboard from './component/Dashboard/Dashboard';
import Home from './component/Home/Home';
import StudyForm from './component/StudyForm/StudyForm';
import UpdateForm from './component/UpdateForm/UpdateForm'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/studyform" element={<StudyForm/>}/>
      <Route path="/updateform/:id" element={<UpdateForm/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
