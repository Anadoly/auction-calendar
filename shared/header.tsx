import { header } from '@styles/Header.module.css';
import { container, visuallyHidden } from '@styles/Shared.module.css';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  return (
    <div className={header}>
      <nav className={container}>
        <h1>
          <Link href="/">
            <Image src="/images/ea-logo.svg" alt="Arabian Systems Logo" width={190} height={48} />
          </Link>
          <span className={visuallyHidden}>Arabian Systems</span>
        </h1>
        <div>
          <ul>
            <li>
              <Link href="/calender">Calender</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
