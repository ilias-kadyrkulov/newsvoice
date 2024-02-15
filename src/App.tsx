import { Suspense } from 'react'
import { Navigation } from './navigation/Navigation'

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
      </Suspense>
    </>
  )
}

export default App
