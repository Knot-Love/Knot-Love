import React, { useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import AddAddress from '../components/AddAddress';
import { useSelector } from 'react-redux';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector(state => state.addresses.addressList);
  const [selectAddress, setSelectAddress] = useState(null); // Default to null
  const cartItemsList = useSelector(state => state.cartItem.cart);
  const navigate = useNavigate();

  const handleCashOnDelivery = async () => {
    console.log("Cart Items:", cartItemsList);
    console.log("Address List:", addressList);
    console.log("Selected Address Index:", selectAddress);
  
    if (cartItemsList.length === 0) {
      console.log("❌ Error: Empty Cart");
      return toast.error("Your cart is empty!");
    }
  
    if (!addressList || addressList.length === 0) {
      console.log("❌ Error: No address found");
      return toast.error("Please add an address before placing the order!");
    }
  
    if (selectAddress === null || selectAddress === undefined) {
      console.log("❌ Error: No address selected");
      return toast.error("Please select an address before placing the order!");
    }
  
    const selectedAddress = addressList[selectAddress]?._id;
    if (!selectedAddress) {
      console.log("❌ Error: Invalid address selected");
      return toast.error("Invalid address selected! Please choose a valid address.");
    }
  
    try {
      console.log("✅ Proceeding with order...");
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: selectedAddress,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });
  
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem?.();
        fetchOrder?.();
        navigate('/success', { state: { text: "Order" } });
      }
    } catch (error) {
      console.log("❌ API Error:", error);
      AxiosToastError(error);
    }
  };
  
  
  
  const handleOnlinePayment = async () => {
    console.log("Cart Items:", cartItemsList);
    console.log("Address List:", addressList);
    console.log("Selected Address Index:", selectAddress);
    
    if (cartItemsList.length === 0) {
      console.log("❌ Error: Empty Cart");
      return toast.error("Your cart is empty!");
    }
  
    if (!addressList || addressList.length === 0) {
      console.log("❌ Error: No address found");
      return toast.error("Please add an address before making the payment!");
    }
  
    if (selectAddress === null || selectAddress === undefined) {
      console.log("❌ Error: No address selected");
      return toast.error("Please select an address before making the payment!");
    }
  
    const selectedAddress = addressList[selectAddress]?._id;
    if (!selectedAddress) {
      console.log("❌ Error: Invalid address selected");
      return toast.error("Invalid address selected! Please choose a valid address.");
    }
  
    try {
      toast.loading("Loading...");
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripePromise = await loadStripe(stripePublicKey);
  
      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: selectedAddress,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });
  
      const { data: responseData } = response;
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
  
      fetchCartItem?.();
      fetchOrder?.();
    } catch (error) {
      console.log("❌ API Error:", error);
      AxiosToastError(error);
    }
  };
  

  return (
    <section className='bg-blue-50'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
        <div className='w-full'>
          <h3 className='text-lg font-semibold'>Choose your address</h3>
          <div className='bg-white p-2 grid gap-4'>
            {addressList.map((address, index) => (
              <label key={index} htmlFor={"address" + index} className={!address.status ? "hidden" : ""}>
                <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                <input 
  id={"address" + index} 
  type='radio' 
  value={index} 
  onChange={(e) => setSelectAddress(parseInt(e.target.value))} 
  name='address' 
  checked={selectAddress === index} 
  required 
/>

                  <div>
                    <p>{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>{address.country} - {address.pincode}</p>
                    <p>{address.mobile}</p>
                  </div>
                </div>
              </label>
            ))}
            <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
              Add address
            </div>
          </div>
        </div>

        <div className='w-full max-w-md bg-white py-4 px-2'>
          <h3 className='text-lg font-semibold'>Summary</h3>
          <div className='bg-white p-4'>
            <h3 className='font-semibold'>Bill details</h3>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Items total</p>
              <p className='flex items-center gap-2'>
                <span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </p>
            </div>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Quantity total</p>
              <p>{totalQty} item(s)</p>
            </div>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Delivery Charge</p>
              <p>Free</p>
            </div>
            <div className='font-semibold flex items-center justify-between gap-4'>
              <p>Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
          <button 
  className={`py-2 px-4 ${selectAddress === null ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'} rounded text-white font-semibold`} 
  onClick={handleOnlinePayment}
  disabled={selectAddress === null}
>
  Online Payment
</button>


            <button 
  className={`py-2 px-4 ${selectAddress === null ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'} rounded text-white font-semibold`} 
  onClick={handleCashOnDelivery}
  disabled={selectAddress === null}
>
  Cash on Delivery
</button>

          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;