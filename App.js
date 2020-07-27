import React from 'react'
import { mapping, light as lightTheme } from '@eva-design/eva'
import Firebase, { FirebaseProvider } from './src/utils'
import AppContainer from './src/navigation'

const App = () => (
  <>
      <FirebaseProvider value={Firebase}>
        <AppContainer />
      </FirebaseProvider>
  </>
)

export default App

