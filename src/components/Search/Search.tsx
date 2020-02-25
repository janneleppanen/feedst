import React from "react";
import { connect } from "react-redux";

import { setSearchTerm, removeSearchTerm } from "../../redux/SearchReducer";

interface Props {
  setSearchTerm: typeof setSearchTerm;
  removeSearchTerm: typeof removeSearchTerm;
  searchTerm: string;
}

const Search: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  removeSearchTerm
}) => {
  return (
    <div className="relative">
      <input
        className="border border-gray-300 border-solid rounded-md py-2 px-4 pr-10 mr-2 flex-1 w-full"
        type="text"
        data-testid="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {searchTerm !== "" && (
        <button
          onClick={() => removeSearchTerm()}
          className="absolute right-0 top-0 py-2 px-4 hover:text-green-400"
        >
          &times;
        </button>
      )}
    </div>
  );
};

const mapStateToProps = ({ searchTerm }: GlobalState) => {
  return {
    searchTerm
  };
};

export default connect(mapStateToProps, { setSearchTerm, removeSearchTerm })(
  Search
);
