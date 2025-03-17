import './App.css';
import Gallery from './collections/Gallery.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollectionDetail from './collections/CollectionDetail.jsx';

function App() {
  return (
    <div className="App">
            welcome 
      <Router>
            <Routes>
                <Route path="/" element={ <Gallery />} />
                <Route path="/collection/:title" element={<CollectionDetail />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
