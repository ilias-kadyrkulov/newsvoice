import { Suspense } from 'react'
import { Navigation } from './navigation/Navigation'
import { RotatingLines } from 'react-loader-spinner'

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <RotatingLines
              width="100"
              animationDuration="0.75"
              strokeWidth="5"
              strokeColor="#dc0228"
              ariaLabel="loader"
            />
          </div>
        }
      >
        <Navigation />
      </Suspense>
    </>
  )
}

export default App
