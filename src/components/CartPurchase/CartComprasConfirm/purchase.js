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
  const stripe = new Stripe(
    "pk_test_51NmekIDpeBCo5ijrY6v5H3YxJOvOD1WKesK7eGO3nUWuahUANAFVFY7jVelfX0VfIJNVym1WIGEi51rXHd2jo5XC00YSXh2WHw"
  );
  try {
    const options = {
      method: "POST",
      url: "https://vegetanizando-api.vercel.app/purchase",
      headers: { "Content-Type": "application/json" },
      data: {
        purchase: purchase,
      },
    };
    await axios.request(options);
    /*NO TOCAR
   
    const token = await stripe.tokens.create({
      card: card,
    });
    const optionsStripe = {
      method: "POST",
      url: "http://localhost:3000/payment",
      headers: { "Content-Type": "application/json" },
      data: {
        token: token.id,
        total: totalCart,
        email: userData.email,
      },
    };
    await axios.request(optionsStripe);*/
  } catch (error) {
    throw error;
  }
};
