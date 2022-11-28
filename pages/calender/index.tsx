import Head from 'next/head';
import Image from 'next/image';
import styles from '@styles/Home.module.css';
import { Calender } from '@calender/index.tsx';

export default function CalenderPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Auction Calendar</title>
        <meta
          name="description"
          content="the auction calendar in order to view the auction
ending soon"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Calender />
    </div>
  );
}
