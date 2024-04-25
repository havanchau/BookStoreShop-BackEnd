import { NextResponse } from "next/server";
const PayOS = require("@payos/node");

import {
  CLIENT_KEY,
  API_KEY,
  CHECKSUM_KEY,
  DOMAIN,
} from "@/../../ultils/contranst";

const payos = new PayOS(CLIENT_KEY, API_KEY, CHECKSUM_KEY);

const createNewPayment = async () => {
  try {
    const orderCode = Math.floor(Math.random() * 9007199254740991);

    const order = {
      amount: 2000,
      description: "Thanh toan phi mua sach",
      orderCode: orderCode,
      returnUrl: `${DOMAIN}/result`,
      cancelUrl: `${DOMAIN}/result`,
    };

    const paymentLink = await payos.createPaymentLink(order);
    const link = paymentLink.checkoutUrl;
    return NextResponse.json({ link, orderCode }, { status: 200 });
  } catch (error) {
    console.error("Error creating payment link:", error);
    return NextResponse.json({ message: "Failed" }, { status: 400 });
  }
};

const getPaymentInfo = async (res, { params }) => {
  try {
    if (!params || !params.id) {
      throw new Error("Invalid parameters");
    }

    const code = params.id;

    const paymentInfo = await payos.getPaymentLinkInformation(code);

    return NextResponse.json({ paymentInfo }, { status: 200 });
  } catch (error) {
    console.error("Error fetching payment information:", error);
    return NextResponse.json({ message: "Failed" }, { status: 400 });
  }
}

module.exports = {
    createNewPayment,
    getPaymentInfo,
}