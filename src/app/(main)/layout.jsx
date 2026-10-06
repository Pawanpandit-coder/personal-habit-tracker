import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-start min-h-200 ">{children}</main>
      <Footer />
    </>
  );
}
