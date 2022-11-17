import { useState } from "react";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";

const App = () => {
  const [isCartActive, setIsCartActive] = useState(false);

  const cartModalhandler = () => {
    setIsCartActive(!isCartActive);
  };

  return (
    <CartProvider>
      <Header onToggleCart={cartModalhandler} />
      {isCartActive && <Cart onToggleCart={cartModalhandler} />}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
