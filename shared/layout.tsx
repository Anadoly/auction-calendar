import { PropsWithChildren } from 'react';
import { fullPageHeight } from '@styles/Shared.module.css';
import { Header } from './header';
import { Footer } from './footer';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      <main className={fullPageHeight}>{children}</main>
      <Footer />
    </>
  );
}
