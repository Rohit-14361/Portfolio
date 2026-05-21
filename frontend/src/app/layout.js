import { ReduxProvider } from "../providers/ReduxProvider";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Rohit Kumar | Full Stack Developer",
  description: "Modern Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}