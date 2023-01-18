// Context(warehouse)
// Provider(delivery)
// consumer/ (useContect(we))

import React, { useContext, useEffect, useState } from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

// we need to create provider func:
const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: "false", message:""});
    const [query, setQuery] = useState("");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if(data.Response === "True"){
        setIsLoading(false);
        setIsError({
            show: false,
            message:"",
        });
        setMovie(data.Search);
      } else {
        setIsError({
            show: true,
            message: data.Error,
        });

      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let timerOut = setTimeout(() => {
        getMovies( `${API_URL}&s=${query}`);  
    }, 500);

   return () => clearTimeout(timerOut); 
  }, [query]);

  return <AppContext.Provider value={{isLoading, isError, movie, query, setQuery}}>{children}</AppContext.Provider>;
};

//Global custom hooks:
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
