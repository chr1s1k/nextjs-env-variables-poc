import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import Link from 'next/link'
import { TodoList } from '@/components'
import type { GetServerSideProps, NextPage } from 'next'

type Props = {
  apiUrl: string
}

const Ssr: NextPage<Props> = ({ apiUrl }) => {
  return (
    <>
      <main className={styles.main}>
        <div className={inter.className}>
          <Link href="/" className={styles.card}>
            &lt; Back
          </Link>
          <h1 className={styles.title}>Using getServerSideProps</h1>
          <h2>What happened?</h2>
          <ol style={{ marginTop: '1rem' }}>
            <li>
              <code>NEXT_PUBLIC_API_URL</code> is <strong>NOT</strong> available in the browser
            </li>
            <li>
              internal request to <code>_next/data</code> has been made to get the fresh props due
              to <strong>getServerSideProps</strong>
            </li>
            <li>
              request to <code>NEXT_PUBLIC_API_URL</code> has been made to get the user data
            </li>
          </ol>
          <TodoList apiUrl={apiUrl} />
        </div>
      </main>
    </>
  )
}

export default Ssr

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
    },
  }
}
