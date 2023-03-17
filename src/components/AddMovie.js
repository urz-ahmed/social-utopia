import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";
const AddMovie = () => {
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    image: "",
    rated: 0,
    rating: 0,
  });
  const [loading, setLoading] = useState(false);
  const addMovie = async () => {
    setLoading(true);
    try {
      if (useAppstate.login) {
        await addDoc(moviesRef, form);
        swal({
          title: "Successfully Added",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setForm({
          title: "",
          year: "",
          description: "",
          image: "",
        });
      } else {
        navigate("/login");
      }
    } catch (err) {
      swal({
        title: err,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };
  return (
    <section class="text-gray-600 body-font min-h-screen">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12 text-slate-300">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4">
            Share your Reviews
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Write an honest review that will help the viewers to decide their
            best.
          </p>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <div class="relative">
                <label
                  for="name"
                  class="leading-7 text-sm text-gray-400 uppercase font-semibold"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="name"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  name="name"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label
                  for="email"
                  class="leading-7 text-sm text-gray-400 uppercase font-semibold"
                >
                  Year
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label
                  for="email"
                  class="leading-7 text-sm text-gray-400 uppercase font-semibold"
                >
                  Image Link
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label
                  for="message"
                  class="leading-7 text-sm text-gray-400 uppercase font-semibold"
                >
                  Description
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div class="p-2 w-full">
              <button
                onClick={addMovie}
                class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                {loading ? <TailSpin height={25} color="white" /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddMovie;
