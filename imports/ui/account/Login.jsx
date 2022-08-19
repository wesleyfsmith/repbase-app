import React from 'react';

export const Login = () => (
  <div className="h-full bg-neutral">
    <article className="prose prose-xl mx-auto">
      <p className="text-center pt-8 pb-0 mb-0 text-primary font-montserrat">Bienvenido a</p>
      <h1 className="text-center pt-0 pb-1 text-primary">Repbase</h1>
    </article>
    <div className="px-4">
      <p className="text-center pt-8 text-white">Construye tu futuro con logros del pasado</p>

      <div className="form-control pt-4">
        <input type="text" placeholder="Nombres" className="input input-bordered" />
      </div> 

      <div className="form-control pt-4">
        <input type="text" placeholder="Apellidos" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="text" placeholder="E-mail corporativo" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="text" placeholder="E-mail personal" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="text" placeholder="Area de la empresa" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="text" placeholder="Contrasena" className="input input-bordered" />
      </div>

      <div className="form-control pt-4">
        <input type="text" placeholder="Confirme contrasena" className="input input-bordered" />
      </div>
      
      <div className="form-control">
        <button className="btn btn-primary mt-4">Registrate</button>
      </div>
      <p className="text-center pt-4 text-white">¿Ya te registraste? <a className="text-primary">Ingresa aquí.</a></p>
    
    </div>

  </div>
);
