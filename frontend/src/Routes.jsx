import React from "react";
import { Routes, Route } from "react-router-dom";


import Inicio from "./pages/inicio/inicio";
import Calculadora from "./pages/calculadora/calculadora";
import Autoavaliacao from "./pages/autoavaliacao/autoavaliacao";
import Biblioteca from "./pages/biblioteca/biblioteca";
import Cadastro from "./pages/cadastro/cadastro";
import Progresso from "./pages/progresso/progresso.jsx";
import Prevencao from "./pages/prevencao/prevencao.jsx";


import ProtectedRoute from "./utils/ProtectedRoute.jsx"; 
import Historico from "./pages/historicoProgresso/historico.jsx";


function RoutesApp() {
  return (
    <Routes>

      <Route path="/cadastro" element={<Cadastro />} />

      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Inicio />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/calculadora" 
        element={
          <ProtectedRoute>
            <Calculadora />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/autoavaliacao" 
        element={
          <ProtectedRoute>
            <Autoavaliacao />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/biblioteca" 
        element={
          <ProtectedRoute>
            <Biblioteca />
          </ProtectedRoute>
        }
      />

      <Route
        path="/progresso"
        element={
          <ProtectedRoute>
            <Progresso />
          </ProtectedRoute>
        }
      />
        
      <Route
        path="/historico"
        element={
          <ProtectedRoute>
            <Historico />
          </ProtectedRoute>
        }
      />

      <Route
      path="/prevencao"
      element={
        <ProtectedRoute>
          <Prevencao />
        </ProtectedRoute>
      }

      />
        

    </Routes>
  );
}

export default RoutesApp;