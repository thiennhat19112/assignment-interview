import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainBoard from "./pages/MainBoard";
import Detail from "./pages/Detail";

function App() {
  return (
    <>
      <div className="bg w-full h-96">
        <div className="w-4/5 p-6 m-auto  ">
          <BrowserRouter>
            <Routes>
              <Route element={<MainBoard />} path="/" />
              <Route element={<Detail />} path="/detail/:id" />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
