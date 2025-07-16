import { Button } from "../components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex items-center justify-center h-screen'>
     <Button asChild>
      <Link href={"/dashboard"}>Dashboard</Link>
     </Button>
    </main>
  );
}
