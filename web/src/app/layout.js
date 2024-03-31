import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/sidebar.scss"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
