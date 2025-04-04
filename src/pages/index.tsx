import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>home</h1>
            <Link href={"/about"}> To About </Link>
        </div>
    );
}
