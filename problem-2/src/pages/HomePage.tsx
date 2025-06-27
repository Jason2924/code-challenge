import ExchangeWidget from "@/components/home/ExchangeWidget"

const HomePage = () => {
  return (
    <div className="w-7xl max-w-full mx-auto px-0 sm:px-4 lg:px-8">
      <div className="mb-8 pt-10 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
          Crypto Exchange
        </h1>
        <p className="text-lg text-gray-400">
          Free from sign-up, limits, complications
        </p>
      </div>
      <ExchangeWidget />
    </div>
  )
}

export default HomePage
