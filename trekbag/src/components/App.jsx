import BackgroundHeading from "./BackgroundHeading";
import Footer from "./Footer";
import Header from "./Header";
import ItemList from "./ItemList";
import Sidebar from "./Sidebar";

function App() {
  return (
    <>
      <BackgroundHeading />

      <main>
        <Header />
        <ItemList i />
        <Sidebar />
      </main>

      <Footer />
    </>
  );
}

export default App;
