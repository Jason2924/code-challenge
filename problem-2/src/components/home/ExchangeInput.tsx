import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type { CryptoModel } from '@/models/crypto.model';
import CryptoIcon from '../common/CryptoIcon';
import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

type Props<T extends FieldValues> = {
  name: Path<T>
  text: string
  amount: number
  control: Control<T>
  crypto: CryptoModel
  cryptos: CryptoModel[]
  changeAmount: (isFromCrypto: boolean, value: number) => void
  changeCrypto: (isFromCrypto: boolean, crypto: CryptoModel) => void
}

const ExchangeInput = <T extends FieldValues>({ name, text,amount,  control, crypto, cryptos, changeAmount, changeCrypto }: Props<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <div className="flex gap-1 sm:gap-2 items-center">
            <div className="py-2 px-2 sm:px-5 flex-auto bg-[#3E3E59] border border-[#46475E] rounded overflow-hidden">
              <p className="mb-0 text-gray-400 text-sm">{text}</p>
              <FormControl>
                <Input
                  className="text-white text-lg sm:text-2xl sm:font-semibold"
                  {...field}
                  autoFocus={false}
                  inputMode="text"
                  value={amount}
                  onKeyDown={(e) => {
                    const isNumber = /[0-9]/.test(e.key);
                    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete"];
                    const isDot = e.key === '.';
                    const target = e.currentTarget;
                    if (!isNumber && !allowedKeys.includes(e.key) && !(isDot && !target.value.includes('.'))) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    changeAmount(name === "send", Number(e.currentTarget.value))
                  }}
                />
              </FormControl>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-[4.1rem] sm:h-[4.6rem] flex-1/2 sm:flex-4/12 flex justify-between items-center bg-[#36324a] hover:bg-[#2b283b] cursor-pointer text-white sm:text-lg font-normal border border-[#3f3b54] rounded" type="button" variant="none">
                  <div className="flex gap-2">
                    <CryptoIcon symbol={crypto.currency} />
                    {crypto.currency}
                  </div>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                {cryptos && cryptos.map((item) => (
                  <DropdownMenuItem className="px-3 py-2 cursor-pointer" onClick={() => changeCrypto(name === "send", item)}>
                    <div className="flex gap-2">
                      <CryptoIcon symbol={item.currency} />
                      {item.currency}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ExchangeInput
