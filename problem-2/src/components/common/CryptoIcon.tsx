type Props = {
  symbol: string
  size?: number
}

const CryptoIcon = ({ symbol, size = 24 }: Props) => {
  const src = `src/assets/icons/${symbol}.svg`;
  return (
    <img
      src={src}
      alt={symbol}
      width={size}
      height={size}
    />
  )
}

export default CryptoIcon
