import { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import SInput from '@/components/Input';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Invalid email format.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [varient, setVarient] = useState('login');
  const [errors, setErrors] = useState({});


  const validateForm = useCallback(() => {
    try {
      formSchema.parse({ email, username: name, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  }, [email, name, password]);

  const toggleVarient = useCallback(() => {
    setVarient((currVarient) => (currVarient === 'login' ? 'register' : 'login'));
  }, []);

  const login = useCallback(async () => {
    if (validateForm()) {
      try {
        await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: '/profiles',
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [email, password, validateForm]);

  const register = useCallback(async () => {
    if (validateForm()) {
      try {
        await axios.post('/api/register', {
          email,
          name,
          password,
        });
        login();
      } catch (err) {
        console.log(err);
      }
    }
  }, [email, name, password, login, validateForm]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat  bg-center bg-fixed bg-cover  ">
      <div className=" sm:bg-opacity-50 w-full h-full lg:bg-opacity-50 md:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {varient === 'login' ? 'sign up' : 'Register'}
            </h2>

            <div className="flex flex-col gap-4">
              {varient === 'register' && (
                <SInput
                  label="UserName"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  id="name"
                  type="text"
                  value={name}
                  error={errors.username}
                />
              )}
              <SInput
                label="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
                error={errors.email}
              />

              <SInput
                label="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
                error={errors.password}
              />
            </div>

            <Button onClick={varient === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition ">
              {varient === 'login' ? 'Login' : 'Sing up'}
            </Button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>
              <div onClick={() => signIn('github', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {varient === 'login' ? 'First time using Netflix ?' : 'Alredy have an acount ?'}
            </p>

            <span
              onClick={toggleVarient}
              className="text-white ml-1 hover:underline cursor-pointer "
            >
              {varient === 'login' ? 'Create an account' : 'login'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
