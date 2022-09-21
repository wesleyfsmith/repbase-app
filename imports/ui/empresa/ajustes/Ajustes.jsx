import React, { useEffect } from 'react';
import { Sidebar } from '../Sidebar';
import { PasswordChangeForm } from '../../employee/settings/PasswordChangeForm';


const ChangeEmailForm = () => {
  return (
    <div className="pb-4">
      <article className="prose prose-xl font-bold">
      Correo de ingreso
      </article>
      <div className="form-control pt-4">
        <input type="email" placeholder="E-mail corporativo" className={'input input-bordered'} />
      </div>
      <div className="form-control">
        <button className={'btn btn-primary btn-disabled mt-4'}>Guardar cambios</button>
      </div>
    </div>
  );
};

export const Ajustes = () => {
  return (
    <Sidebar>
      <div className="container max-w-3x1 mx-auto h-full">
        <div className="w-96">
          <ChangeEmailForm />
          <article className="prose prose-xl font-bold">
          Cambiar contraseña
          </article>
          <PasswordChangeForm />  
        </div>
      </div>
    </Sidebar>
  );
};