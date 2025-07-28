"use client";
import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon, LoaderCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/logo.png";
import google from "../../public/google.svg";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { useStore } from "../app/store";

export default function Home() {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const updateUser = useStore((state) => state.updateUser);
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  
  const signInUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${baseURL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.success == true) {
        toast.success(data.message);
        const token = data.data.token;
        localStorage.setItem("clrtyToken", token);
        updateUser({
          first_name: data.data.userData.first_name,
          last_name: data.data.userData.last_name,
          email: data.data.userData.email,
        });
        console.log(data);
        router.push("/dashboard");

        // Redirect or perform any other action
      }
      if (data.success !== true) {
        console.log(data);
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='lg:flex gap-x-4 justify-between items-center h-screen p-4'>
      {/* Form Section */}
      <section className='basis-1/2 h-full px-5 lg:px-20 xl:px-44 2xl:px-56 py-10 flex flex-col justify-evenly'>
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

        <div className=''>
          <h1 className='font-semibold text-3xl'>
            You again? <br />
            <span className='text-lg text-primary'>
              We like you <span className='text-primary-foreground'>:)</span>{" "}
            </span>
          </h1>

          <p className='mt-2 text-muted-foreground'>
            Time to get productive, or at least try
          </p>
        </div>

        <Button variant={"outline"}>
          <Image src={google} alt='google' />
          Sign In with Google
        </Button>

        <Separator />
        {/* Form */}
        <form onSubmit={signInUser} action=''>
          <Input
            required
            type='email'
            placeholder='Email'
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />

          <div className='relative mt-3'>
            <Input
              id={id}
              required
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className='pe-9'
              placeholder='Password'
              type={isVisible ? "text" : "password"}
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

          {isLoading ? (
            <Button disabled className={"mt-10 w-full"}>
              <LoaderCircle className='animate-spin' />
            </Button>
          ) : (
            <Button type='submit' className={"mt-10 w-full"}>
              Sign In
            </Button>
          )}
        </form>

        <div className='flex justify-center text-muted-foreground text-sm'>
          Don't have an account?{" "}
          <Link className='text-primary ml-1' href={"/sign-up"}>
            Sign Up
          </Link>
        </div>
      </section>

      {/* Image */}
      <section className='basis-1/2 lg:block hidden h-full rounded-3xl bg-pattern'>
        {" "}
        <Button variant={"outline"} asChild className='m-4 rounded-full'>
          <Link href={"/dashboard"}>D</Link>
        </Button>
      </section>
    </main>
  );
}
