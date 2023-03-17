import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "../firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, Dna } from "react-loader-spinner";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";
const Reviews = ({ id, prevRating, userRated }) => {
  const navigate = useNavigate()
  const useAppstate = useContext(Appstate)
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0)
  const sendReview = async () => {
    setLoading(true);
    try {
      if(useAppstate.login){
      await addDoc(reviewsRef, {
        movieid: id,
        name: useAppstate.username,
        rating: rating,
        thoughts: form,
        timestamp: new Date().getTime(),
      });
      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      });
      setForm("");
      setRating(0);
      setNewAdded(newAdded+1);
      swal({
        title: "Successfully Reviwed",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
    }else{
      navigate('/login')
    }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);
      setData([]);
      let quer = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setReviewsLoading(false);
    }
    getData();
  }, [newAdded]);
  return (
    <div className="w-full my-4 border-t-4">
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        type="text"
        placeholder="Share your thoughts"
        className="my-4 w-full p-2 bg-slate-600 outline-none rounded-md text-slate-50"
      />
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
        className="mr-2"
      />
      <button
        onClick={sendReview}
        className="bg-green-700 w-full rounded-sm text-slate-50 p-2 my-2 hover:bg-green-900 flex justify-center items-center"
      >
        {loading ? <TailSpin height={20} color="white" /> : "Share"}
      </button>
      {reviewsLoading ? (
        <div className="flex justify-center mt-8">
          <Dna />
        </div>
      ) : (
        <div className="mt-8">
          {data.map((e, i) => {
            return (
              <div
                key={i}
                className="bg-slate-800 text-slate-200 m-3 p-3 rounded-sm w-full shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
              >
                <div className="flex justify-between">
                  <p className="text-red-300">{e.name}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(e.timestamp).toLocaleString()}
                  </p>
                </div>
                <p>{e.thoughts}</p>
                <ReactStars
                  size={15}
                  half={true}
                  value={e.rating}
                  edit={false}
                  className="mr-2"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
