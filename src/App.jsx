import { useEffect } from 'react'
import Navbar from './Components/navbar'

const App = () => {
  useEffect(() => {
    void (async () => {
      await import('./assets copy/vendors/js/nxlNavigation.min.js')
      await import('./assets copy/js/common-init.min.js')
    })()
  }, [])

  return <Navbar />
}

export default App
