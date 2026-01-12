
import OpenAI from "openai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { ShipmentDetails } from "../types";

export const generateLogisticsPlan = async (details: ShipmentDetails) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
    dangerouslyAllowBrowser: true,
  });

  const prompt = `
    Product: ${details.product}
    Quantity: ${details.quantity}
    Destination: ${details.destination}
    Requested delivery: ${details.deliveryWindow}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_INSTRUCTION },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
};
