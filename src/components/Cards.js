import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import ReactStars from "react-stars";
import { moviesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";
const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prev) => [...prev, {...(doc.data()), id: doc.id}]);
      });
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-wrap justify-around px-3 my-12">
        {loading ? (
          <div className="w-full flex justify-center items-center min-h-24">
            <Blocks height={80} />
          </div>
        ) : (
          data.map((e, i) => {
            return (
              <Link to={`/detail/${e.id}`}>
              <div
                key={i}
                className="text-slate-100 bg-slate-800 p-2 rounded-md hover:scale-105 transition-all duration-500 cursor-pointer my-4 mx-2 font-bold"
              >
                <img
                  src={e.image}
                  alt="movie-poster"
                  className="rounded-md sm:h-60 md:h-72 w-full md:w-52"
                />
                <h1>Name: {e.title}</h1>
                <h1 className="flex items-center">
                  <span className="mr-2">Rating:</span>
                  <ReactStars
                    size={20}
                    half={true}
                    value={e.rating/e.rated}
                    edit={false}
                    className="mr-2"
                  />
                </h1>
                <h1>Year: {e.year}</h1>
              </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Cards;
