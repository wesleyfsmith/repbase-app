import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import React, {useState, useEffect} from 'react';
import { FooterWhite } from '../footer/FooterWhite';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useApi } from '../../api/utils/client-utils'; 
import { Settings } from '../../api/settings/settings-module';

const SettingsForm = () => {
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [email, setEmail] = useState('');
  const [companySector, setCompanySector] = useState('');

  const getEmployeeProfile = useApi(Settings.api.getEmployeeProfile);

  useEffect(async () => {
    getEmployeeProfile.call();
  }, [])

  if (getEmployeeProfile.res) {
    console.log({res: getEmployeeProfile.res})
  }

  return (
    <div>
      <div className="form-control pt-4">
        <input type="text" onChange={(e) => setNames(e.target.value)} value={names} placeholder="Nombres" className="input input-bordered" />
      </div> 

      <div className="form-control pt-4">
        <input type="text" onChange={(e) => setLastNames(e.target.value)} value={lastNames} placeholder="Apellidos" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="email" onChange={(e) => setCorporateEmail(e.target.value)} value={corporateEmail} placeholder="E-mail corporativo" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="E-mail personal" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">  
        <input type="text" onChange={(e) => setCompanySector(e.target.value)} value={companySector} placeholder="Area de la empresa" className="input input-bordered" />
      </div>
      <div className="form-control">
        <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Guardar cambios</button>
      </div>
    </div>
  )
}

const PasswordChangeForm = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <div>
      <div className="form-control pt-4">
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Contraseña actual" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} placeholder="Nueva contraseña" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirme contrasena" className="input input-bordered" />
      </div>
      <div className="form-control">
        <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Guardar cambios</button>
      </div>
    </div>
  )
}

export const SettingsPage = () => {
  const { address, isConnected } = useAccount();
  
  if (address) {
    
  }
  return (
    <div className="h-max">
    <Titlebar />
    <Navbar title="AJUSTES"
        showBackButton={true}
        /> 
    <div className="container px-2">
      <article className="prose prose-xl pl-2 ">
        <p className="font-bold">Tu billetera WEB3</p>
      </article>
      <article className="prose pl-2 ">
        <p>No has conectado una billetera web3 (ej. Metamask) a Repbase.</p> 
        <p>Esta es necesario para que puedas usar tus RepTokens y registrar tus logros en el blockchain.</p>
      </article>

      <div className="flex justify-center mt-4">
        <ConnectButton className="w-full" label="CONNECTAR BILLETERA" chainStatus="icon" />
      </div>
      
      <article className="prose prose-xl pt-8 ">
        <p className="font-bold">Tus Datos</p>
      </article>
      <SettingsForm />
      <article className="prose prose-xl pt-8 ">
        <p className="font-bold">Cambiar contraseña</p>
      </article>
      <PasswordChangeForm />
    </div>
    <FooterWhite />
  </div>
  )
};
