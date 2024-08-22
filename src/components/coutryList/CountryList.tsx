import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { add } from "../../store/slices/likedCountriesSlice";
import { remove } from "../../store/slices/likedCountriesSlice";
import { remove as removeCountry } from "../../store/slices/coutriesSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

const CountryList = () => {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const selectedCountries = useSelector(
    (state: RootState) => state.liked.liked
  );

  const isLiked = (cca2: string | number) => {
    return selectedCountries.some((s) => s.cca2 === cca2);
  };

  const dispatch = useDispatch();

  const [showLiked, setShowLiked] = useState(false);

  const filteredCountries = showLiked
    ? countries.filter((c) => isLiked(c.cca2))
    : countries;

  return (
    <div>
      <div className={`flex justify-end px-10 mt-10 mb-5  `}>
        <button
          onClick={() => setShowLiked(!showLiked)}
          className={`border-2 px-4 py-2 font-bold border-black rounded-xl ${
            showLiked ? "bg-blue-500 text-white" : ""
          }`}
        >
          liked countries
        </button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4 px-10">
        {filteredCountries.map((c) => (
          <li
            key={c.cca2}
            className="flex flex-col justify-between py-2  bg-white shadow-md rounded-lg overflow-hidden transform "
          >
            <Link to={`/${c.cca2}`}>
              <div>
                <img
                  src={c.flags.png}
                  alt={`${c.name.common} flag`}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center text-lg font-semibold mt-2 p-2">
                {c.name.common}
              </p>
              <p className="text-center mb-2 mt-2">
                {c.flags && c.flags.alt
                  ? c.flags.alt.slice(0, 30) + "...."
                  : "No data available"}
              </p>
            </Link>

            <div>
              <div>
                <div
                  onClick={
                    isLiked(c.cca2)
                      ? () => dispatch(remove(c.cca2))
                      : () => dispatch(add(c))
                  }
                  className={`border-2 text-center mb-2 py-1 cursor-pointer hover:scale-105 transition-transform duration-300 ${
                    isLiked(c.cca2)
                      ? "bg-red-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <span className={`material-symbols-outline  `}>favorite</span>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeCountry(c.cca2))}
                className="bg-black  w-full text-center py-3 text-white font-bold hover:scale-105 transition-transform duration-300"
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
