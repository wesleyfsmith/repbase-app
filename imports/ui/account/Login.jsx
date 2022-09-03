import React, {useState} from 'react';
import { Users } from '/imports/api/users/users-module';
import { useApi } from '/imports/api/utils/client-utils';
import { ExclamationTriange } from '@heroicons/react/outline'


const MetamaskAlert = () => (
  <div class="card card-side bg-accent mt-4">
    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie"></img></figure>
  <div class="card-body p-4 text-white">
    <p>{`Recuerda que para poder visualizar y usar tus tokens, y para ver tus logros, debes ingresar a través del navegador de tu billetera web3 (ej. Metamask).`}</p>
  </div>
</div>  
)

export const Login = () => {
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [email, setEmail] = useState('');
  const [companySector, setCompanySector] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  
  const createAccountWithPassword = useApi(Users.api.createUserWithPassword);

  const clickRegisterButton = async (e) => {
    e.preventDefault();
    console.log({email, password})
    await createAccountWithPassword.call({ email, password, profile: {
      names,
      last_names: lastNames,
      corporate_email: corporateEmail,
      company_sector: companySector
    }})
    console.log({userId: Meteor.userId()})
  }

  return (
  <div className="h-full bg-neutral">
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
      <p className="text-center pt-4 text-white"><a className="text-primary">Olvidé mi contraseña</a></p>
      
      <div className="form-control">
        <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Ingresa</button>
      </div>
      <p className="text-center pt-4 text-white">¿No te has registraste? <a className="text-primary">Registrate aquí.</a></p>
      <MetamaskAlert />
    </div>

  </div>
)};
