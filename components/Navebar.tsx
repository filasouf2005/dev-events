import React from 'react'
import Link from "next/link";
import Image from "next/image";

const Navebar = () => {
    return (
        <header>
            <nav>
                <Link href="/" className="logo">
                    <Image src="/icons/logo.png" alt="logo" width={24} height={24}  />
                    <p>DevEvent</p>
                </Link>
                <ul>
                    <Link href="/">Home</Link>
                    <Link href="/">Event</Link>
                    <Link href="/create">Create Event</Link>
                </ul>
            </nav>
        </header>
    )
}
export default Navebar
