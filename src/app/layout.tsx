import { Metadata } from "next";
import "./globals.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import "@fontsource-variable/source-code-pro";
import { ProductProvider } from "./Context/ProductContext";
import { RegionProvider } from "./Context/RegionContext";

export const metadata: Metadata = {
  title: "MAVOK",
  description: "A Assignment for learning Directus and Medusa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <RegionProvider>
          <ProductProvider>
            <Header />
            {children}
            <Footer />
          </ProductProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
