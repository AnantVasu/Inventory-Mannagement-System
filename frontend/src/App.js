import Header from "./components/common/header";
import Home from "./components/home";
import {Routes, Route} from 'react-router-dom';
import Products from "./components/products";
import AddProduct from "./components/addProduct";
import Locations from "./components/locations";
import AddLocation from "./components/addLocation";

function App() {
  return (
    <div className="App">
      <div className="leftside">
      <Header/>
      </div>

      <div className="rightside">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/locations" element={<Locations/>} />
          <Route path="/addProduct" element={<AddProduct/>} />
          <Route path="/addLocation" element={<AddLocation/>} />
        </Routes>
        
      </div>      
    </div>
  );
}

export default App;
