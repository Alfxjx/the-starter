export function Cart({ cafe, bean, onPay }: { cafe: string, bean: string, onPay: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-24 bg-slate-700 text-gray-50 z-50">
      <div className="w-full h-full flex justify-between items-start">
        <div className="flex-1 flex-col h-full flex items-start justify-center box-border pl-8 text-sm">
          <div className="py-2">
            {'1. '}
            {cafe ? <span>{cafe}</span> : <span className="text-red-400">请选择咖啡</span>}</div>
          <div className="py-2">
            {'2. '}
            {bean ? <span>{bean}</span> : <span className="text-gray-300">默认精品咖啡豆</span>}
          </div>
        </div>
        <div className="w-36 h-full flex justify-center items-center">
          <button
            disabled={!cafe}
            className="py-2 px-8 bg-indigo-600 disabled:bg-indigo-300 text-white rounded disabled:cursor-not-allowed cursor-pointer"
            onClick={onPay}
          >下单</button>
        </div>
      </div>
    </div>
  )
}