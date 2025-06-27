import { ArrowUpDown, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react'
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import ExchangeInput from './ExchangeInput';
import type { CryptoModel } from '@/models/crypto.model';

const ExchangeWidget = () => {

  const [cryptos, setCryptos] = useState<CryptoModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromCrypto, setFromCrypto] = useState<CryptoModel>();
  const [fromAmount, setFromAmount] = useState(0);
  const [toCrypto, setToCrypto] = useState<CryptoModel>();
  const [toAmount, setToAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://interview.switcheo.com/prices.json");
        const data: CryptoModel[] = await response.json();
        let tempFromCrypto: CryptoModel | undefined
        let tempToCrypto: CryptoModel | undefined
        data.forEach((item) => {
          if (item.currency === "USD") {
            tempFromCrypto = item
            setFromCrypto(item)
          } else if (item.currency === "ETH") {
            tempToCrypto = item
            setToCrypto(item)
          }
          if (fromCrypto !== undefined && toCrypto !== undefined) return
        })
        setCryptos(data);
        if (tempFromCrypto && tempToCrypto) {
          updateAmount("send", 1)
          updateAmount("get", calculateAmount(1, tempFromCrypto.price, tempToCrypto.price))
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const swapCurrencies = () => {
    const tempToCrypto = toCrypto
    const tempFromCrypto = fromCrypto
    setFromCrypto(toCrypto)
    setToCrypto(tempFromCrypto)
    updateAmount("get", calculateAmount(fromAmount, tempToCrypto!.price, tempFromCrypto!.price))
  };

  const changeCrypto = (isFromCrypto: boolean, crypto: CryptoModel) => {
    let tempAmount = 0
    if (isFromCrypto) {
      setFromCrypto(crypto)
      tempAmount = calculateAmount(fromAmount, crypto!.price, toCrypto!.price)
    }
    else {
      setToCrypto(crypto)
      tempAmount = calculateAmount(fromAmount, fromCrypto!.price, crypto!.price)
    }
    updateAmount("get", tempAmount)
  }

  const changeAmount = (isFromCrypto: boolean, value: number) => {
    let tempFromAmount = 0
    let tempToAmount = 0
    if (isFromCrypto) {
      tempFromAmount = value
      tempToAmount = calculateAmount(value, fromCrypto!.price, toCrypto!.price)
    } else {
      tempToAmount = value
      tempFromAmount = calculateAmount(value, toCrypto!.price, fromCrypto!.price)
    }
    updateAmount("send", tempFromAmount)
    updateAmount("get", tempToAmount)
  }

  const calculateAmount = (amount: number, fromPrice: number, toPrice: number) => {
    return (amount * fromPrice) / toPrice
  }

  const updateAmount = (type: "send" | "get", amount: number) => {
    if (type === "send") {
      setFromAmount(amount)
    } else {
      setToAmount(amount)
    }
    form.setValue(type, amount.toString())
  }

  const formSchema = z.object({
    send: z.string()
      .min(1, {message: "Required"})
      .refine((value) => !isNaN(Number(value)), {
        message: "Must be a valid number",
      }),
    get: z.string()
      .min(1, {message: "Required"})
      .refine((value) => !isNaN(Number(value)), {
        message: "Must be a valid number",
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    console.log(values)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="w-xl max-w-full mx-auto p-3 sm:p-6 md:p-8 bg-[#343443] rounded-xl border border-[#46475E] shadow-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {fromCrypto && (
            <ExchangeInput name="send" text="You Send" amount={fromAmount} control={form.control} crypto={fromCrypto} cryptos={cryptos} changeAmount={changeAmount} changeCrypto={changeCrypto} />
          )}
          <div className="py-2 flex justify-between items-center text-white">
            <div className="text-sm align-middle">
              <span className="pr-1">No hidden fee</span>
            </div>
            <Button 
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-b-md cursor-pointer"
              type="button"
              size="none"
              onClick={swapCurrencies}
            >
              <ArrowUpDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </Button>
          </div>
          {toCrypto && (
            <ExchangeInput name='get' text="You Get" amount={toAmount} control={form.control} crypto={toCrypto} cryptos={cryptos} changeAmount={changeAmount} changeCrypto={changeCrypto} />
          )}
          <Button 
            className="mt-6 px-4 py-2 w-full text-lg cursor-pointer"
            type="submit"
            variant="secondary"
            size="none"
            disabled={loading}
          >
            {loading && <LoaderCircle />}
            Exchange
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ExchangeWidget
