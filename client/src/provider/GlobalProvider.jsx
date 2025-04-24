import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

export const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const cartItem = useSelector(state => state.cartItem.cart);
  const user = useSelector(state => state.user);

  const fetchCartItem = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getCartItem });
      if (response.data.success) {
        dispatch(handleAddItemCart(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: { _id: id, qty }
      });
      if (response.data.success) {
        fetchCartItem();
        return response.data;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: { _id: cartId }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    const qty = cartItem.reduce((prev, curr) => prev + curr.quantity, 0);
    setTotalQty(qty);

    const tPrice = cartItem.reduce((prev, curr) => {
      const priceAfterDiscount = pricewithDiscount(curr.productId.price, curr.productId.discount);
      return prev + priceAfterDiscount * curr.quantity;
    }, 0);
    setTotalPrice(tPrice);

    const notDiscountPrice = cartItem.reduce((prev, curr) => prev + curr.productId.price * curr.quantity, 0);
    setNotDiscountTotalPrice(notDiscountPrice);
  }, [cartItem]);

  const handleLogoutOut = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  const fetchAddress = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getAddress });
      if (response.data.success) {
        dispatch(handleAddAddress(response.data.data));
      }
    } catch (error) {}
  };

  const fetchOrder = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getOrderItems });
      if (response.data.success) {
        dispatch(setOrder(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItem();
    handleLogoutOut();
    fetchAddress();
    fetchOrder();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
        fetchOrder,
        showLoginModal,
        setShowLoginModal,
        showRegisterModal,
        setShowRegisterModal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
