import { createContext, useContext, useState } from "react";
import data from "./data.json";

const AppContext = createContext();

const ContextProvider = ({ children }) => {
    const [comments, setComments] = useState(data.comments);
    return <AppContext.Provider value={{ comments, setComments }}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { ContextProvider, useGlobalContext };
