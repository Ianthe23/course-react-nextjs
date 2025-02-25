import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full px-4 py-2">
      <Logo />

      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/events/all">All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
