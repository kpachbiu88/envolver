const lookup: [string, number][] = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
]

export const fromNumeralRoman = (num: number) => {
  return lookup.reduce((acc, [k, v]) => {
    acc += k.repeat(Math.floor(num / v))
    num = num % v
    return acc
  }, '')
}

export const fromRomanNumeral = (roman: string): number => {
  return lookup.reduce((acc, [k, v]) => {
    while (roman.startsWith(k)) {
      acc += v
      roman = roman.slice(k.length)
    }
    return acc
  }, 0)
}