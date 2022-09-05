import React, {useState} from 'react';
import { Users } from '/imports/api/users/users-module';
import { useApi } from '/imports/api/utils/client-utils';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FooterBlack } from '../footer/FooterBlack';
import SimpleSchema from "simpl-schema";

const ErrorBadge = () => (
  <div className="pt-1 flex justify-end" >
    <div className="badge badge-error gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      Formato no valido
    </div>
  </div>
  
)

export const Signup = () => {
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [email, setEmail] = useState('');
  const [companySector, setCompanySector] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [namesError, setNamesError] = useState(false);
  const [lastNamesError, setLastNamesError] = useState(false);
  const [corporateEmailError, setCorporateEmailError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [companySectorError, setCompanySectorError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false  );

  const navigate = useNavigate();
  
  const createAccountWithPassword = useApi(Users.api.createUserWithPassword);

  const clickRegisterButton = async (e) => {
    e.preventDefault();
    const schema = Users.db.schema;
    const userEmployeeParameters = {
      names,
      last_names: lastNames,
      company_email: corporateEmail,
      company_sector: companySector
    };
    try {
      Users.employeeProfileSchema.validate(userEmployeeParameters);
    } catch (e) {
      if (names.length === 0) {
        setNamesError(true);
      }
      if (lastNames.length === 0) {
        setLastNamesError(true);
      }
      if (companySector.length === 0) {
        setCompanySectorError(true);
      }
      if (password.length === 0) {
        setPasswordError(true);
      }
      if (e.details[0].name === 'company_email') {
        setCorporateEmailError(true);
      }
    }
    try {
      new SimpleSchema({email: {type: String,
        regEx: SimpleSchema.RegEx.Email}}).validate({email});
    } catch (e) {
      setEmailError(true);
    }
    if (password.length < 4) {
      setPasswordError(true);
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true)
    }
    if (!namesError && !lastNamesError && !corporateEmailError && !emailError && !companySectorError && !passwordError && !confirmPasswordError) {
      userEmployeeParameters.account_type = "employee";
      await createAccountWithPassword.call({ email, password, profile: userEmployeeParameters});
      navigate('/dashboard');
    }
  }

  return (
    <div className="h-full">
          <div className="bg-neutral h-full">
    <article className="prose prose-xl mx-auto">
      <p className="text-center pt-8 pb-0 mb-0 text-primary font-montserrat">Bienvenido a</p>
      <h1 className="text-center pt-0 pb-1 text-primary">Repbase</h1>
    </article>
    <div className="px-4">
      <p className="text-center pt-8 text-white">Construye tu futuro con logros del pasado</p>

      <div className="form-control pt-4">
        <input type="text" onChange={(e) => setNames(e.target.value)} value={names} placeholder="Nombres" className="input input-bordered" />
      </div> 
      {namesError && <ErrorBadge/>}

      <div className="form-control pt-4">
        <input type="text" onChange={(e) => setLastNames(e.target.value)} value={lastNames} placeholder="Apellidos" className="input input-bordered" />
      </div>
      {lastNamesError && <ErrorBadge/>}
      <div className="form-control pt-4">
        <input type="email" onChange={(e) => setCorporateEmail(e.target.value)} value={corporateEmail} placeholder="E-mail corporativo" className="input input-bordered" />
      </div>
      {corporateEmailError && <ErrorBadge/>}

      <div className="form-control pt-4">
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="E-mail personal" className="input input-bordered" />
      </div>
      {emailError && <ErrorBadge/>}

      <div className="form-control pt-4">
        <input type="text" onChange={(e) => setCompanySector(e.target.value)} value={companySector} placeholder="Area de la empresa" className="input input-bordered" />
      </div>
      {companySectorError && <ErrorBadge/>}

      <div className="form-control pt-4">
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Contrasena" className="input input-bordered" />
      </div>
      {passwordError && <ErrorBadge/>}

      <div className="form-control pt-4">
        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirme contrasena" className="input input-bordered" />
      </div>
      {confirmPasswordError && <ErrorBadge/>}

      <div className="form-control">
        <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Registrate</button>
      </div>
      <p className="text-center pt-4 text-white">¿Ya te registraste? <Link to="/login" className="text-primary">Ingresa aquí.</Link></p>
    
    </div>
    <FooterBlack />
  </div>
    </div>

)};
