import React, {useState} from 'react';
import { Users } from '/imports/api/users/users-module';
import { useApi } from '/imports/api/utils/client-utils';

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
      <p className="text-center pt-8 pb-0 mb-0 text-primary font-montserrat">Bienvenido a</p>
      <h1 className="text-center pt-0 pb-1 text-primary">Repbase</h1>
    </article>
    <div className="px-4">
      <p className="text-center pt-8 text-white">Construye tu futuro con logros del pasado</p>

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

      <div className="form-control pt-4">
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Contrasena" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirme contrasena" className="input input-bordered" />
      </div>
      
      <div className="form-control">
        <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Registrate</button>
      </div>
      <p className="text-center pt-4 text-white">¿Ya te registraste? <a className="text-primary">Ingresa aquí.</a></p>
    
    </div>

  </div>
)};
