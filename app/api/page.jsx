import DataFetcher from '../components/DataFetcher'
import DataForm from '../components/DataForm'

export default function Home() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4 text-purple-400">Welcome to Dark Theme Data App</h2>
      <DataFetcher endpoint="/api/data" />
      <DataForm />
    </div>
  )
}

