import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useScroll } from "../../hooks/useScroll";
import { Menu, X } from "lucide-react";
import "./cabecalho.scss";


function Cabecalho () {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); 
    const { scrolled } = useScroll(50); 
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function handleLogout() {
        logout();
        navigate('/cadastro', { state: { show: 'login' } });
    }

    return (
        <>
            <header className={`header ${scrolled ? "scrolled" : ""}`}>
                <div className="header__container">
                    
                    <Link to="/" className="header__logo">
                        <img src="/assets/images/logo.png" />
                    </Link>
                    
                    <nav className="header__links-desktop">
                        <Link to="/">Início</Link>
                        <Link to="/progresso">Progresso</Link>
                        <Link to="/autoavaliacao">Autoavaliação</Link>
                        <Link to="/calculadora">Calculadora</Link>
                        <Link to="/biblioteca">Biblioteca</Link>
                    </nav>

                    <div className="header__botoes-container">

                        <div className="header__botao">
                            {user ? (
                                <div className="header__usuario-logado">
                                    <span>Olá, {user.nome}</span>
                                    <button onClick={handleLogout} className="btn-logout">Sair</button>
                                </div>
                            ) : (
                                <>
                                    <button className="btn branco" onClick={() => navigate("/cadastro", { state: { show: 'login' } })}>
                                        Login
                                    </button>
                                    <button className="btn azul" onClick={() => navigate("/cadastro", { state: { show: 'signup' } })}>
                                        Cadastre-se
                                    </button>
                                </>
                            )}
                        </div>
                        
                        <button 
                            className="header__toggle" 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                </div>
            </header>
            
            <div className={`header__nav-mobile ${isMobileMenuOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Início</Link>
                <Link to="/progresso" onClick={() => setIsMobileMenuOpen(false)}>Progresso</Link>
                <Link to="/autoavaliacao" onClick={() => setIsMobileMenuOpen(false)}>Autoavaliação</Link>
                <Link to="/calculadora" onClick={() => setIsMobileMenuOpen(false)}>Calculadora</Link>
            </div>
        </>
    )
}

export default Cabecalho;