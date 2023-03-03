import { useEffect, useState } from 'react'
import superagent from 'superagent'

const isSSR = typeof window === 'undefined'

type Props = {
  apiUrl?: string
}

type Todo = {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export const TodoList = ({ apiUrl }: Props) => {
  const [envCache, setEnvCache] = useState(
    apiUrl || (!isSSR ? sessionStorage.getItem('apiUrl') : '')
  )
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setLoading] = useState(false)

  // first check if we've already cached the API URL
  useEffect(() => {
    if (envCache) return

    const fetchEnvVariable = async () => {
      setLoading(true)

      try {
        const response = await superagent.get('/api/get-env-variable')
        const { apiUrl } = response.body
        setEnvCache(apiUrl)
        sessionStorage.setItem('apiUrl', apiUrl)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchEnvVariable()
  }, [envCache])

  // once we have the API URL cached => make the API call
  useEffect(() => {
    if (!envCache) return

    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await superagent.get(envCache)
        setTodos(response.body.todos)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [envCache])

  if (isLoading) {
    return <h2 style={{ marginTop: '2rem' }}>Loading...</h2>
  }

  return (
    <>
      {todos.length > 0 && (
        <>
          <hr style={{ marginTop: '2rem' }} />
          <h3 style={{ marginTop: '1rem' }}>User data</h3>
          <ul style={{ marginTop: '1rem' }}>
            {todos.map(({ todo, id }) => (
              <li key={id}>{todo}</li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
