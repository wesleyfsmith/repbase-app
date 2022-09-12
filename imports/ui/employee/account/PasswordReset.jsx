import React, {useState} from 'react';
import { Users } from '/imports/api/users/users-module';
import { useApi } from '/imports/api/utils/client-utils';
import { ExclamationTriange } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';

export const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const clickRegisterButton = async (e) => {
    e.preventDefault();
  }

  return (
  <div className="h-full bg-neutral">
    <article className="prose prose-xl mx-auto">
      <h1 className="text-center pt-16 pb-1 text-primary">Repbase</h1>
    </article>
    <div className="px-4">
      <article className="prose prose-xl font-bold text-white leading-8 mt-8 mb-4">
        Revisa tu correo y sigue las instrucciones
      </article>
      <article className="prose text-white">
        Enviaremos un mensaje con instrucciones a tu correo personal para que cambies tu contraseña.
      </article>
      <div className="form-control pt-4">
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="E-mail personal" className="input input-bordered" />
      </div>
      <div className="form-control">
        <button onClick={(e) => clickRegisterButton(e)} className="btn btn-primary mt-4">Recuperar contraseña</button>
      </div>
      <p className="text-center pt-4 text-white"><Link to="/" className="text-primary">Regresar a inicio de sesión</Link></p>
      <article className="prose prose-sm text-white text-center mt-8">
        ¿No te has registrado?
      </article>
      <div className="form-control">
        <button onClick={(e) => clickRegisterButton(e)} className="btn btn-outline btn-primary mt-4">Regístrate</button>
      </div>
      <article className="prose prose-sm text-white">
        Si sigues teniendo problemas escríbenos un correo a <Link to="/" className="text-primary">SOPORTE@REPBASE.XYZ</Link>
      </article>
    </div>

  </div>
)};
