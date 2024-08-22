import { useEffect } from "react";
import api from "./api/coutriesApi";
import { useDispatch } from "react-redux";
import { render } from "./store/slices/coutriesSlice";
import CountryList from "./components/coutryList/CountryList";
import { Route, Routes } from "react-router-dom";
import SingleCountry from "./components/singleCountry/SingleCountry";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCoutries = async () => {
      try {
        const response = await api.get("/all");
        dispatch(render(response.data));
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.log("An unknown error occurred");
        }
      }
    };
    fetchCoutries();
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/:cca2" element={<SingleCountry />} />
      </Routes>
    </>
  );
}

export default App;
