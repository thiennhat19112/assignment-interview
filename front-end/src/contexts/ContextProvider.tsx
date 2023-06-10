import React, { createContext, useContext, useState } from "react";
import { TypeData, year } from "../typeContain";
import data from "../data.json";
const { years } = data as TypeData;

const initialState: year = {
  // Giá trị mặc định của state
  year: years[0].year,
  link: years[0].link,
};

const StateContext = createContext<{
  state: year;
  setState: React.Dispatch<React.SetStateAction<year>>;
}>({
  state: initialState,
  setState: () => initialState,
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState(initialState);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
