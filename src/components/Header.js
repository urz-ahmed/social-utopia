import React, { useContext } from "react";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import { Link } from "react-router-dom";
import { Appstate } from "../App";
import LoginIcon from '@mui/icons-material/Login';
const Header = () => {
  const useAppstate = useContext(Appstate)
  return (
    <>
      <div className="sticky top-0 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3  bg-slate-900 shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
        <div className="flex mx-4">
          <Link
            className="text-xl font-bold inline-block mr-4 py-2 whitespace-nowrap uppercase text-white hover:bg-slate-800 p-2 rounded-lg"
            to="/"
          >
            Social{" "}
            <span className="font-extrabold text-purple-400">Utopia</span>
          </Link>
        </div>
        {useAppstate.login?
        
        <Link to="addMovie">
          <button
            type="button"
            className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2"
          >
            <ControlPointDuplicateIcon className="mr-2" />
            Add
          </button>
        </Link>:
        <Link to="login">
        <button
          type="button"
          className="text-white bg-[#d87474] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 uppercase"
        >
          <LoginIcon className="mr-2" />
          Login
        </button>
      </Link>
        }
      </div>
    </>
  );
};

export default Header;
