import { Titlebar } from '../components/Titlebar';
import { Navbar } from '../components/Navbar';
import React, {useState, useEffect} from 'react';
import { FooterWhite } from '../footer/FooterWhite';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useApi } from '../../api/utils/client-utils'; 
import { Settings } from '../../api/settings/settings-module';
import { Users } from '../../api/users/users-module';
import { PasswordChangeForm } from './PasswordChangeForm';

//fuck this component lol
const SettingsForm = () => {
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [email, setEmail] = useState('');
  const [companySector, setCompanySector] = useState('');

  const [namesState, setNamesState] = useState('');
  const [lastNamesState, setLastNamesState] = useState('');
  const [corporateEmailState, setCorporateEmailState] = useState('');
  const [companySectorState, setCompanySectorState] = useState('');

  const [changedSettings, setChangedSettings] = useState(false);

  const getEmployeeProfile = useApi(Settings.api.getEmployeeProfile);
  const setEmployeeProfile = useApi(Settings.api.setEmployeeProfile);

  const updateNames = (e) => {
    setNames(e.target.value);
    setChangedSettings(true);
    setNamesState(' input-warning ');
  }

  const updateLastNames = (e) => {
    setLastNames(e.target.value);
    setChangedSettings(true);
    setLastNamesState(' input-warning ');
  }

  const updateCorporateEmail = (e) => {
    setCorporateEmail(e.target.value);
    setChangedSettings(true);
    setCorporateEmailState(' input-warning ');
  }

  const updateCompanySector = (e) => {
    setCompanySector(e.target.value);
    setChangedSettings(true);
    setCompanySectorState(' input-warning ');
  }

  const isButtonDisabled = changedSettings ? ' ' : ' btn-disabled ';

  useEffect(async () => {
    getEmployeeProfile.call();
  }, [])

  if (getEmployeeProfile.res && email === '') {
    const profile = getEmployeeProfile.res;
    console.log({profile});
    setNames(profile.names);
    setLastNames(profile.last_names);
    setCorporateEmail(profile.company_email);
    setCompanySector(profile.company_sector);
    setEmail(Meteor.user().emails[0].address);
  }

  const updateProfile = async () => {
    const userEmployeeParameters = {
      names,
      last_names: lastNames,
      company_email: corporateEmail,
      company_sector: companySector
    };
    try {
      Users.employeeProfileSchema.validate(userEmployeeParameters);
    } catch (e) {
      console.log({e});
      if (names.length === 0) {
        setNamesState(' input-error ');
      }
      if (lastNames.length === 0) {
        setLastNamesState(' input-error ');
      }
      if (companySector.length === 0) {
        setCompanySectorState(' input-error ');
      } 
      if (e.details[0].name === 'company_email') {
        setCorporateEmailState(' input-error ');
      }
      return;
    }
    await setEmployeeProfile.call(userEmployeeParameters);
    setNamesState(' ');
    setLastNamesState(' ');
    setCompanySectorState(' ');
    setCorporateEmailState(' ');
    setChangedSettings(false);
    //TODO update
  }

  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Nombres</span>
        </label>
        <input type="text" onChange={(e) => updateNames(e)} value={names} placeholder="Nombres" className={`input input-bordered ${namesState}`} />
      </div> 

      <div className="form-control">
        <label className="label">
          <span className="label-text">Apellidos</span>
        </label>
        <input type="text" onChange={(e) => updateLastNames(e)} value={lastNames} placeholder="Apellidos" className={`input input-bordered ${lastNamesState}`} />
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text">E-mail corporativo</span>
        </label>
        <input type="email" onChange={(e) => updateCorporateEmail(e)} value={corporateEmail} placeholder="E-mail corporativo" className={`input input-bordered ${corporateEmailState}`} />
      </div>

      {/* <div className="form-control pt-4">
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="E-mail personal" className="input input-bordered" />
      </div> */}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Área de la empresa</span>
        </label>
        <input type="text" onChange={(e) => updateCompanySector(e)} value={companySector} placeholder="Area de la empresa" className={`input input-bordered ${companySectorState}`} />
      </div>
      <div className="form-control">
        <button onClick={(e) => updateProfile(e)} className={`btn btn-primary ${isButtonDisabled} mt-4`}>Guardar cambios</button>
      </div>
    </div>
  )
}



export const SettingsPage = () => {
  const { address, isConnected } = useAccount();
  
  return (
    <div className="h-max">
    <Titlebar />
    <Navbar title="AJUSTES"
        showBackButton={true}
        /> 
    <div className="px-4">
      <article className="prose prose-xl">
        <p className="font-bold">Tu billetera WEB3</p>
      </article>
      <article className="prose ">
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
