import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import './cadastro.scss';
import { useAuth } from '../../context/AuthContext';


function Cadastro() {
    const location = useLocation();
    const initialMode = location.state?.show || 'login';
    const [isSignUpActive, setIsSignUpActive] = useState(initialMode === 'signup');
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formDataReg, setFormDataReg] = useState({
        nome: '',
        sobrenome: '',
        telefone: '',
        dt_nascimento: '',
        email: '',
        senha: ''
    });
    const [erroReg, setErroReg] = useState('');
    const [sucessoReg, setSucessoReg] = useState('');

    const [formDataLogin, setFormDataLogin] = useState({
        email: '',
        senha: ''
    });
    const [erroLogin, setErroLogin] = useState('');

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
        setErroLogin('');
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
        setErroReg('');
        setSucessoReg('');
    };

    function handleChangeReg(e) {
        const { name, value } = e.target;
        setFormDataReg(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmitReg(e) {
        e.preventDefault();
        setErroReg('');
        setSucessoReg('');

        if (!formDataReg.nome || !formDataReg.email || !formDataReg.senha) {
            setErroReg('Nome, email e senha são obrigatórios.');
            return;
        }

        try {
            await api.post('/cadastro', formDataReg);
            setSucessoReg('Cadastro realizado! Faça o login para continuar.');

            setTimeout(() => {
                setIsSignUpActive(false);
                setSucessoReg('');
                setFormDataReg({ nome: '', sobrenome: '', telefone: '', dt_nascimento: '', email: '', senha: '' });
            }, 2000);

        } catch (err) {
            if (err.response && err.response.data && err.response.data.erro) {
                setErroReg(err.response.data.erro);
            } else {
                setErroReg('Ocorreu um erro ao tentar cadastrar.');
            }
        }
    }

    function handleChangeLogin(e) {
        const { name, value } = e.target;
        setFormDataLogin(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmitLogin(e) {
        e.preventDefault();
        setErroLogin('');

        if (!formDataLogin.email || !formDataLogin.senha) {
            setErroLogin('Email e senha são obrigatórios.');
            return;
        }

        try {
            const response = await api.post('/login', formDataLogin);
            
            login(response.data.token);

            navigate('/'); 

        } catch (err) {
            if (err.response && err.response.data && err.response.data.erro) {
                setErroLogin(err.response.data.erro);
            } else {
                setErroLogin('Email ou senha inválidos.');
            }
        }
    }

    return (
        <div className="auth-page-container">
            <div className={isSignUpActive ? "container right-panel-active" : "container"} id="container">
                
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSubmitReg}>
                        <h1>Criar Conta</h1>
                        <span>Use seu email para se cadastrar</span>
                        
                        <input type="text" name="nome" placeholder="Nome" value={formDataReg.nome} onChange={handleChangeReg} />
                        <input type="text" name="sobrenome" placeholder="Sobrenome" value={formDataReg.sobrenome} onChange={handleChangeReg} />
                        <input type="text" name="telefone" placeholder="Telefone" value={formDataReg.telefone} onChange={handleChangeReg} />
                        <input type="date" name="dt_nascimento" placeholder="Data de Nascimento" value={formDataReg.dt_nascimento} onChange={handleChangeReg} />
                        <input type="email" name="email" placeholder="Email" value={formDataReg.email} onChange={handleChangeReg} />
                        <input type="password" name="senha" placeholder="Senha" value={formDataReg.senha} onChange={handleChangeReg} />
                        
                        {erroReg && <p className="mensagem-erro">{erroReg}</p>}
                        {sucessoReg && <p className="mensagem-sucesso">{sucessoReg}</p>}
                        
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmitLogin}>
                        <h1>Login</h1>
                        <span>Use sua conta</span>
                        
                        <input type="email" name="email" placeholder="Email" value={formDataLogin.email} onChange={handleChangeLogin} />
                        <input type="password" name="senha" placeholder="Senha" value={formDataLogin.senha} onChange={handleChangeLogin} />
                        
                        {erroLogin && <p className="mensagem-erro">{erroLogin}</p>}

                        <a href="#">Esqueceu sua senha?</a>
                        <button type="submit">Login</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Bem-vindo de volta!</h1>
                            <p>Para se manter conectado, faça login com suas informações pessoais</p>
                            <button className="ghost" id="signIn" onClick={handleSignInClick}>Login</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Olá, Amigo!</h1>
                            <p>Insira seus dados pessoais e comece sua jornada conosco</p>
                            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Cadastre-se</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;