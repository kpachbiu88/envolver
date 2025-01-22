import { ReactTerminal } from 'react-terminal'

import { fromNumeralRoman, fromRomanNumeral } from './modules/converter'
import { validate } from './api/gemini'
import { validateUsesRegex } from './modules/validator'

const useGemini = import.meta.env.VITE_USE_GEMINI === 'true'

const App: React.FC = () => {
  const commands = {
		help: (
			<span>
				List of available commands: <br/>
				<strong>convert &lt;NUMBER&gt;</strong> - convert number from roman to digital format and vice versa<br />
				<strong>author</strong> - Information about an author <br />
				<strong>clear</strong> - clears the console
			</span>
		),
    author: 'Made with ❤️ by Konstantin Nikolaev <twozebras.nikolaev@gmail.com>',
    convert: async (str: string) => {
			if (!isNaN(Number(str))) {
				const num = Number(str)
				if (num < 1) {
					return "Error: The number must be more than 0"
				}
				if (num > 3999) {
					return "Error: The largest numeral is 3999 (MMMCMXCIX)"
				}
				return fromNumeralRoman(num)
			} else {
				str = str.toUpperCase()
				const validation = useGemini
					? await validate(str)
					: validateUsesRegex(str)
				console.log('validation', validation)
				if (validation && validation.error) {
					return validation.error_message
				}
				return fromRomanNumeral(str);
			}
		}
  }

	const welcomeMessage = (
		<span>
			Roman {'<->'} Numerals converter 🧮<br />
			Type "help" for all available commands. <br />
		</span>
	);

  return (
    <ReactTerminal
			welcomeMessage={welcomeMessage}
			theme="material-dark"
			prompt="$"
			errorMessage="The command not found!"
      commands={commands}
    />
  )
}

export default App