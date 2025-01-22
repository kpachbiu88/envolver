import { createRoot } from 'react-dom/client'
import { TerminalContextProvider } from 'react-terminal'

import App from "./App"

import './reset.css'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
	<TerminalContextProvider>
		<App />
	</TerminalContextProvider>
)