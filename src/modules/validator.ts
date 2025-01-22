interface ValidateResult {
  error: boolean
  error_message?: string
}

const validRomanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/ui
const onlyRomanRegex = /^[IVXLCDM]+$/ui
const nonRomanRegex = /[IVXLCDM]+/uig
const validAfterSymbolRegex = /VI{0,3}|LX{0,3}|DC{0,3}/ui

export const validateUsesRegex = (str: string): ValidateResult => {
  if (validRomanRegex.test(str)) {
    return { error: false }
  }

  if (!onlyRomanRegex.test(str)) {
    const nonRoman = str
    .replaceAll(/\s+/g, '')
    .replaceAll(nonRomanRegex, '')
    .split('')
    .join(', ')
    return {
      error: true,
      error_message: `Error: "${str}" contains non-roman symbols - ${nonRoman}`
    }
  }

  const validAfterSymbol = str.match(validAfterSymbolRegex)
  if (validAfterSymbol && validAfterSymbol[0].length > 3) {
    const symbol = validAfterSymbol[0].charAt(0)
    const afterSymbol = validAfterSymbol[0].charAt(1)
    return {
      error: true,
      error_message: `Error: "${str}" after "${symbol}" symbol can be maximum 3 symbol "${afterSymbol}"`
    }
  }
  //TODO: more regex rules

  return {
    error: true,
    error_message: `Error: "${str}" is invalid roman number`
  }
}
