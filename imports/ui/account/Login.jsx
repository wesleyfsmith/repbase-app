import React, {useState} from 'react';
import { Users } from '/imports/api/users/users-module';
import { useApi } from '/imports/api/utils/client-utils';
import { ExclamationTriange } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FooterBlack } from '../footer/FooterBlack';


const AlertIcon = () => (
  <div className="w-1/2 flex flex-col justify-center pl-4">
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16.9215 1.99982C16.6339 1.40086 16.1829 0.895353 15.6205 0.541538C15.0581 0.187723 14.4072 0 13.7427 0C13.0783 0 12.4274 0.187723 11.865 0.541538C11.3026 0.895353 10.8516 1.40086 10.564 1.99982L0.418979 21.9561C-0.794771 24.3386 0.738979 27.5023 3.59648 27.5023H23.8877C26.7465 27.5023 28.2777 24.3398 27.0665 21.9561L16.9215 1.99982ZM13.7427 8.75232C14.0743 8.75232 14.3922 8.88402 14.6266 9.11844C14.861 9.35286 14.9927 9.6708 14.9927 10.0023V16.2523C14.9927 16.5838 14.861 16.9018 14.6266 17.1362C14.3922 17.3706 14.0743 17.5023 13.7427 17.5023C13.4112 17.5023 13.0933 17.3706 12.8588 17.1362C12.6244 16.9018 12.4927 16.5838 12.4927 16.2523V10.0023C12.4927 9.6708 12.6244 9.35286 12.8588 9.11844C13.0933 8.88402 13.4112 8.75232 13.7427 8.75232ZM13.7427 19.3773C14.0743 19.3773 14.3922 19.509 14.6266 19.7434C14.861 19.9779 14.9927 20.2958 14.9927 20.6273V21.2523C14.9927 21.5838 14.861 21.9018 14.6266 22.1362C14.3922 22.3706 14.0743 22.5023 13.7427 22.5023C13.4112 22.5023 13.0933 22.3706 12.8588 22.1362C12.6244 21.9018 12.4927 21.5838 12.4927 21.2523V20.6273C12.4927 20.2958 12.6244 19.9779 12.8588 19.7434C13.0933 19.509 13.4112 19.3773 13.7427 19.3773Z" fill="#FFC700"/>
    </svg>
  </div>
)

const MetamaskAlert = () => (
  <div className="card card-side bg-accent mt-4">
    <AlertIcon />
    <div className="card-body p-4 text-white">
      <p>{`Recuerda que para poder visualizar y usar tus tokens, y para ver tus logros, debes ingresar a través del navegador de tu billetera web3 (ej. Metamask).`}</p>
    </div>
  </div>  
)

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const loginWithPassword = useApi(Users.api.loginWithPassword);

  const clickRegisterButton = async (e) => {
    e.preventDefault();
    console.log({email, password})
    await loginWithPassword.call({email, password});
    navigate('/dashboard');
  }

  return (
  <div className="h-screen bg-neutral">
    <article className="prose prose-xl mx-auto">
      <h1 className="text-center pt-16 pb-1 text-primary">Repbase</h1>
    </article>
    <div className="px-4">
      <p className="text-center pt-8 text-white">Construye tu futuro con logros del pasado</p>

      <div className="form-control pt-4">
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="E-mail personal" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Contrasena" className="input input-bordered" />
      </div>
      <p className="text-center pt-4 text-white"><Link to="/passwordreset" className="text-primary">Olvidé mi contraseña</Link></p>
      
      <div className="form-control">
        <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Ingresa</button>
      </div>
      <p className="text-center pt-4 text-white">¿No te has registraste? <Link to="/" className="text-primary">Registrate aquí.</Link></p>
      <MetamaskAlert />
    </div>
    <FooterBlack/>
  </div>
)};
