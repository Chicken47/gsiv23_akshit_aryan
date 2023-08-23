import { RecoilRoot } from "recoil";
import MovieDescription from "./pages/MovieDescription";
import MovieList from "./pages/MovieList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App w-screen">
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/details/:movieId" element={<MovieDescription />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
