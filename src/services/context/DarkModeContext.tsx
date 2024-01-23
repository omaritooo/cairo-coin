// import { PropsWithChildren, createContext, useContext, useState } from "react";

// const defaultValue = {
//   darkMode: false,
//   toggleDarkMode: () => undefined,
// };

// const DarkModeContext = createContext(defaultValue);

// const DarkModeProvider = ({ children }: PropsWithChildren) => {
//   const storage = localStorage.getItem("theme") === "false" ? true : false;
//   const [darkMode, setDarkMode] = useState<boolean>(storage as boolean | false);
//   const toggleDarkMode: () => void = () => {
//     setDarkMode(!darkMode);
//     localStorage.setItem("theme", `${darkMode}`);
//   };

//   return (
//     <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       <body className={`${darkMode ? "dark" : ""} `}>{children}</body>
//     </DarkModeContext.Provider>
//   );
// };

// const useDarkMode = () => useContext(DarkModeContext);
// export { DarkModeContext, DarkModeProvider, useDarkMode };
