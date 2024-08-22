import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/coutriesApi";

const SingleCountry = () => {
  interface CountryDetail {
    common: string;
    png: string;
    alt: string;
  }
  interface Country {
    name: CountryDetail;
    flags: CountryDetail;
  }
  const { cca2 } = useParams<{ cca2: string }>();
  const [country, setContry] = useState([]);
  useEffect(() => {
    const fetchSingleCountry = async () => {
      const response = await api.get(`/alpha/${cca2}`);
      setContry(response.data);
    };
    fetchSingleCountry();
  }, [cca2]);
  return (
    <div>
      <Link to="/">
        <button className="mt-5 ml-5 px-4 py-2 border-2 border-black rounded-xl">
          back to list of coutries
        </button>
      </Link>
      {country.map((c: Country) => (
        <li className="flex  mt-32">
          <div className="flex-col w-1/2 mx-10">
            <img src={c.flags.png} alt="" />
            <p className="text-2xl font-bold">{c.name.common}</p>
            <p className="font-light">{c.flags.alt}</p>
          </div>
        </li>
      ))}
    </div>
  );
};

export default SingleCountry;
