import Footer from "./components/Footer";
import ForumNavbar from "./components/Navbar";
import FormQRGenerator from "./components/Qrcode";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ForumNavbar />
      <div className="flex-grow">
        <FormQRGenerator />
      </div>
      <Footer />
    </div>
  );
}
