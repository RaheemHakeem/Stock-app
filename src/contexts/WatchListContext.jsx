import React, { useContext, useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [stock, setStock] = useState([]);
  const [watchList, setWatchList] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("watchList")) || ["GOOGL", "MSFT", "AMZN"]
    );
  });
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
      localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock]);
    }
  };

  const deleteStock = (stock) => {
    setWatchList(
      watchList.filter((el) => {
        return el !== stock;
      })
    );
  };

  const renderDropDown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul
        style={{
          maxHeight: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {results.map((result) => {
          return (
            <li
              onClick={() => {
                addStock(result.symbol);
                setSearch("");
              }}
              className="dropdown-item"
              key={result.symbol}
            >
              {result.description} ({result.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (error) {}
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        console.log(data);
        if (isMounted) {
          setStock(data);
        }
      } catch (error) {}
    };
    fetchData();

    return () => (isMounted = false);
  }, [watchList]);

  return (
    <AppContext.Provider
      value={{
        stock,
        search,
        setSearch,
        renderDropDown,
        deleteStock,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider, AppContext };
