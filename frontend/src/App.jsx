
import React from "react";
import { useLocation } from "react-router-dom";
import Cabecalho from "./components/cabecalho/cabecalho";
import Rodape from "./components/rodape/rodape";
import RoutesApp from "./Routes.jsx";

function App() {
  const location = useLocation();


  const paginasFullscreen = ["/cadastro"];
  const mostrarHeader = !paginasFullscreen.includes(location.pathname);
  const mostrarRodape = !paginasFullscreen.includes(location.pathname);

  return (
    <>
      {mostrarHeader && <Cabecalho />}
      
      <main className={mostrarHeader ? "content-wrap" : ""}>
        <RoutesApp />
      </main>
      
      {mostrarRodape && <Rodape />}
    </>
  );
}

export default App;