"use client";
import React, { useMemo, useState, useId } from "react";
import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderCircle,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import google from "../../../public/google.svg";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import Link from "next/link";

const SignUp = () => {
  const id = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
  });
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const checkStrength = (pass) => {
    const requirements = [
      { regex: /.{6,}/, text: "At least 6 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(userData.password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  // Register User

  const registerUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${baseURL}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      toast.success(data.message);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className='lg:flex gap-x-4 justify-between items-center h-screen p-4'>
      {" "}
      {/* Image */}
      <section className='basis-1/2 lg:block hidden h-full rounded-3xl bg-pattern2 border'></section>
      <section className='basis-1/2 h-full px-5 lg:px-20 xl:px-40 2xl:px-52 py-10 flex flex-col justify-evenly'>
        <div className='flex items-center'>
          {" "}
          <Image
            src={logo}
            alt='Clrty'
            className='rounded-full mr-2'
            width={30}
            height={30}
          />
          <h2 className='font-medium font-chillax'>Clrty</h2>
        </div>

        <h1 className='font-semibold text-3xl'>Create an account</h1>

        {/* <Button variant={"outline"}>
          <Image src={google} alt='google' />
          Sign Up with Google
        </Button> */}

        <Separator />

        {/* Form */}
        <form onSubmit={registerUser} className='flex flex-col gap-3' action=''>
          <div className='flex gap-3'>
            {" "}
            <Input
              required
              type='text'
              onChange={(e) =>
                setUserData({ ...userData, first_name: e.target.value })
              }
              placeholder='First Name'
            />
            <Input
              required
              onChange={(e) =>
                setUserData({ ...userData, last_name: e.target.value })
              }
              type='text'
              placeholder='Last Name'
            />
          </div>
          <Input
            required
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type='email'
            placeholder='Email'
          />
          <div>
            {/* Password input field with toggle visibility button */}
            <div className='*:not-first:mt-2'>
              <div className='relative'>
                <Input
                  id={id}
                  className='pe-9'
                  placeholder='Password'
                  type={isVisible ? "text" : "password"}
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  aria-describedby={`${id}-description`}
                />
                <button
                  className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                  type='button'
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls='password'
                >
                  {isVisible ? (
                    <EyeOffIcon size={16} aria-hidden='true' />
                  ) : (
                    <EyeIcon size={16} aria-hidden='true' />
                  )}
                </button>
              </div>
            </div>

            {userData.password && (
              <>
                {/* Password strength indicator */}
                <div
                  className='bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full'
                  role='progressbar'
                  aria-valuenow={strengthScore}
                  aria-valuemin={0}
                  aria-valuemax={4}
                  aria-label='Password strength'
                >
                  <div
                    className={`h-full ${getStrengthColor(
                      strengthScore
                    )} transition-all duration-500 ease-out`}
                    style={{ width: `${(strengthScore / 4) * 100}%` }}
                  ></div>
                </div>
                {/* Password strength description */}
                <p
                  id={`${id}-description`}
                  className='text-foreground mb-2 text-sm font-medium'
                >
                  {getStrengthText(strengthScore)}. Must contain:
                </p>

                {/* Password requirements list */}
                <ul className='space-y-1.5' aria-label='Password requirements'>
                  {strength.map((req, index) => (
                    <li key={index} className='flex items-center gap-2'>
                      {req.met ? (
                        <CheckIcon
                          size={16}
                          className='text-emerald-500'
                          aria-hidden='true'
                        />
                      ) : (
                        <XIcon
                          size={16}
                          className='text-muted-foreground/80'
                          aria-hidden='true'
                        />
                      )}
                      <span
                        className={`text-xs ${
                          req.met ? "text-emerald-600" : "text-muted-foreground"
                        }`}
                      >
                        {req.text}
                        <span className='sr-only'>
                          {req.met
                            ? " - Requirement met"
                            : " - Requirement not met"}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {isLoading ? (
            <Button disabled className={"mt-5"}>
              <LoaderCircle className='animate-spin' />
            </Button>
          ) : (
            <Button className={"mt-5"}>Sign Up</Button>
          )}
        </form>
        <div className='flex justify-center text-muted-foreground text-sm'>
          Already have an account?{" "}
          <Link className='text-primary ml-1' href={"/"}>
            Sign In
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
