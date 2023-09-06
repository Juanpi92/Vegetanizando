import axios from "axios";
import Stripe from "stripe";

export const purchase = async (userData, cardDetails, cart, totalCart) => {
  cart = cart.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    };
  });
  let purchase = {
    user: userData.nome,
    email: userData.email,
    celphone: userData.celular,
    cpf: userData.cpf,
    address: userData.address,
    status: "solicitado",
    date: Date.now(),
    cart,
    totalCart,
  };
  let card = {
    number: cardDetails.number,
    exp_month: cardDetails.expiry.split("/")[0],
    exp_year: cardDetails.expiry.split("/")[1],
    cvc: cardDetails.cvc,
  };
  try {
    /*NO TOCAR
      const stripe = new Stripe(
    "pk_live_51NmekIDpeBCo5ijrs1BRTBliuOiHFbIBvYsO9qKEvnIjzMr19hfyHNGL3bp0hIo3JlwXz6r5kDWYTk3C8htUQQK700V6nqz5ej"
  );
   
    const token = await stripe.tokens.create({
      card: card,
    });
    const optionsStripe = {
      method: "POST",
      url: "https://vegetanizando-api.vercel.app/payment",
      headers: { "Content-Type": "application/json" },
      data: {
        token: token.id,
        total: totalCart,
        email: userData.email,
      },
    };
    await axios.request(optionsStripe);*/

    const options = {
      method: "POST",
      url: "https://vegetanizando-api.vercel.app/purchase",
      headers: { "Content-Type": "application/json" },
      data: {
        purchase: purchase,
      },
    };
    await axios.request(options);
  } catch (error) {
    throw error;
  }
};
