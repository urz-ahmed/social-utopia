import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Dna } from "react-loader-spinner";
import Reviews from "./Reviews";
const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: 0,
    rated: 0
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <section class="text-gray-600 body-font overflow-hidden min-h-screen">
      <div class="container px-5 my-16 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Dna />
          </div>
        ) : (
          <>
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="movies-poster"
                src={data.image}
                className="block md:sticky mx-auto md:my-10 h-96 md:h-[30rem] rounded-md"
              />
              <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 class="text-gray-400 text-2xl title-font font-mono font-semibold mb-1 uppercase">
                  {data.title}
                </h1>
                <h2 class="text-sm title-font text-gray-500 tracking-widest">
                  {data.year}
                </h2>
                <div class="flex mb-4">
                  <span class="flex items-center">
                    <ReactStars
                      size={20}
                      half={true}
                      value={data.rating/data.rated}
                      edit={false}
                      className="mr-2"
                    />
                  </span>
                </div>
                <p class="leading-relaxed">{data.description}</p>
                <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Detail;
