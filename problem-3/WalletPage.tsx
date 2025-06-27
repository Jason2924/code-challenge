interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// If `BoxProps` is the same as `React.HTMLAttributes<HTMLDivElement>`, you can extend it.
// If not, cannot get the HTML attributes from parent.
type Props = React.HTMLAttributes<HTMLDivElement>

const WalletPage: React.FC<Props> = (props: Props) => {
  // The `children` is not used. Make sure it’s necessary before passing it.
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Replace `any` with `string`. The switch logic checks for a string value.
	const getPriority = (currency: string): number => {
  switch (currency) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99
  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      // `WalletBalance` does not contain a `blockchain` field. use `currency` instead.
      const balancePriority = getPriority(balance.currency);
      if (balancePriority > -99) {
        // Should return `true` only when the amount is greater than 0
        // It does not make sense when amount is less than or equal to 0
        if (balance.amount > 0) {
          return true;
        }
      }
      return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.currency);
      const rightPriority = getPriority(rhs.currency);
      if (leftPriority > rightPriority) {
        return -1;
      }
      return 1;
    });
  }, [balances]); // `prices` has no interaction with this function and should not be set.

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  // this is uses `formattedBalances`, not `sortedBalances`
  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        currency={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {children}
      {rows}
    </div>
  )
}

export default WalletPage
