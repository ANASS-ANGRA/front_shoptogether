import { createContext, useState } from "react";

// Create a context for the menu state
export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [MenuPhone, setMenuPhone] = useState(false);

  const toggleMenuPhone = () => {
    setMenuPhone((prev) => !prev);
  };

  const setMenuPhoneFalse = () => {
    setMenuPhone(false);
  };

  return (
    <MenuContext.Provider
      value={{ MenuPhone, toggleMenuPhone, setMenuPhoneFalse }}
    >
      {children}
    </MenuContext.Provider>
  );
};
