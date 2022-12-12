import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store'
import Main from './src/Main'

let persistor = persistStore(store)

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Main />
			</PersistGate>
		</Provider>
	)
}
