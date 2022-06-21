import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';

const OrHR = () => (
  <div class="relative flex py-5 items-center">
  <div class="flex-grow border-t border-gray-400"></div>
    <span class="flex-shrink mx-4 text-gray-400">OR</span>
  <div class="flex-grow border-t border-gray-400"></div>
  </div>
)

export const Login = () => (
  <div className="bg-gradient-to-r from-primary to-secondary h-full">
    <article className="prose prose-xl mx-auto">
      <h1 style={{fontFamily: "'Lobster', cursive"}} className="text-center text-white py-8">Repbase</h1>
    </article>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl shadow-secondary bg-base-100 mx-auto">
        <div class="card-body">
        <h2 class="card-title mx-auto">Login</h2>
        <button class="btn btn-primary ">Login with metamask</button>
        <OrHR />
        <p className="text-center">Please login with your company email</p>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="text" placeholder="email" class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="text" placeholder="password" class="input input-bordered" />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div class="form-control">
            <button class="btn btn-primary">Login</button>
          </div>
          <p>Don't have an account? <a>Signup</a></p>
        </div>
      </div>

  </div>
);
