import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_CART_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    let existingCartItem = state.items[existingCartItemIndex];
    let updatedItems = [...state.items];
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: state.totalAmount + action.item.price * action.item.amount,
    };
  }

  if (action.type === "REMOVE_CART_ITEM") {
    const removedItemIndex = state.items.findIndex((item) => {
      return item.id === action.ID;
    });

    // const updatedItems = [...state.items];
    let updatedItems;
    let removedItem = state.items[removedItemIndex];
    if (removedItem.amount === 1) {
      // updatedItems.splice(removedItemIndex, 1);
      updatedItems = state.items.filter((item) => item.id !== action.ID);
    } else {
      const updatedItem = {
        ...removedItem,
        amount: removedItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[removedItemIndex] = updatedItem;
    }

    const totalAmount = state.totalAmount - removedItem.price;

    return {
      items: updatedItems,
      totalAmount: totalAmount,
    };
  }

  if (action.type === "RESET") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, cartDispatcher] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    cartDispatcher({
      type: "ADD_CART_ITEM",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    cartDispatcher({
      type: "REMOVE_CART_ITEM",
      ID: id,
    });
  };

  const cartResetHandler = () => {
    cartDispatcher({
      type: "RESET",
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: cartResetHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
