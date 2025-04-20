import React from "react";

interface Props {
  filters: string[];
  activeFilters: string[];
  onToggle: (filter: string) => void;
}

const FilterPanel: React.FC<Props> = ({ filters, activeFilters, onToggle }) => {
  return (
    <div className="d-flex flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          className="btn me-2 mb-2"
          style={{
            backgroundColor: activeFilters.includes(filter) ? "#8f9779" : "#d2691e",
            color: "#fff",
            border: "none",
          }}
          onClick={() => onToggle(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterPanel;
