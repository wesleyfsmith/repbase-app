import React, {useState, useEffect} from 'react';
import { Users } from '../../../api/users/users-module';
import { useApi } from '../../../api/utils/client-utils'; 

export const PasswordChangeForm = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordsMatch] = useState(true);
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const changePassword = useApi(Users.api.changePassword);

  const updateNewPassword = (e) => {
    setNewPassword(e.target.value);
    if (confirmPassword !== e.target.value) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      setHasFormChanged(true);
    }
  }

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== newPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      setHasFormChanged(true);
    }
  }

  const submitChange = async () => {
    try {
      await changePassword.call({oldPassword: password, newPassword});
    } catch (e) {
      return;
      //TODO improve the error message here
      //TODO some feedback that this was a success
    }
    setShowSuccessMessage(true);
    setPassword('');
    setConfirmPassword('');
    setNewPassword('');
    setPasswordsMatch(true);
    setHasFormChanged(false);

  }

  console.log({confirmPassword, newPassword});

  const isButtonDisabled = hasFormChanged ? ' ' : ' btn-disabled ';

  return (
    <div>
      <div className="form-control pt-4">
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Contraseña actual" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="password" onChange={(e) => updateNewPassword(e)} value={newPassword} placeholder="Nueva contraseña" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="password" onChange={(e) => updateConfirmPassword(e)} value={confirmPassword} placeholder="Confirme contrasena" className="input input-bordered" />
      </div>
      {
        !passwordMatch &&
        <article className="prose text-error text-center mt-2">
          Las contraseñas no coinciden
        </article>
      }
      {
        showSuccessMessage &&
        <article className="prose text-success text-center mt-2">
          Contraseña cambiada con éxito
        </article>
      }
      <div className="form-control">
        <button onClick={(e) => submitChange(e)} className={`btn btn-primary mt-4 ${isButtonDisabled}`}>Guardar cambios</button>
      </div>
    </div>
  )
}