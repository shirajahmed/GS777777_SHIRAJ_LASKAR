import logo from "./assets/logo.svg";

function App() {
  return (
    <>
      <div className="bg-[#00ff00]">
        <img
          src={logo}
          className="logo"
          height={200}
          width={200}
          alt="Company logo"
        />
      </div>
    </>
  );
}

export default App;
