import { useGlobalContext } from "../contexts/WatchListContext";

export const AutoComplete = () => {
  const { search ,setSearch, renderDropDown} = useGlobalContext();

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        {renderDropDown()}
      </div>
    </div>
  );
};
