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
                <li><Link href="/">Home</Link></li>
                <li><Link href="/">Events</Link></li>
                <li><Link href="/">Create Events</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contactus">Contact Us</Link></li>
            </ul>

        </nav>
    </header>
  )
}

export default Navbar