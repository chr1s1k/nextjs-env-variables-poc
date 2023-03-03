import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import Link from 'next/link'
import { TodoList } from '@/components'

export default function File() {
  return (
    <>
      <main className={styles.main}>
        <div className={inter.className}>
          <Link href="/" className={styles.card}>
            &lt; Back
          </Link>
          <h1 className={styles.title}>Using .env file</h1>
          <h2>What happened?</h2>
          <ol style={{ marginTop: '1rem' }}>
            <li>
              <code>NEXT_PUBLIC_API_URL</code> is available in the browser
            </li>
            <li>
              request to <code>NEXT_PUBLIC_API_URL</code> has been made to get the user data
            </li>
          </ol>
          <TodoList apiUrl={process.env.NEXT_PUBLIC_API_URL} />
        </div>
      </main>
    </>
  )
}
