import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header>
        <nav>
            <Link href="/" className='logo'>
                <Image src="/icons/dcs-club-logo.png" alt="Logo" width={100} height={50}/>
            </Link>
            <ul className="nav-links">
                <Link href="/">Home</Link>
                <Link href="/event">Events</Link>
                <Link href="/about">About</Link>
                <Link href="/contactus">Contact Us</Link>
                <Link href="/create-event">Create Events</Link>
            </ul>

        </nav>
    </header>
  )
}

export default Navbar