import Image from "next/image";
import { Tag } from "./Tag";

export function MenuCardLeft({ list, onCafeSelect }: { list: any[], onCafeSelect: (id: string) => void }) {
  return (
    <div className="w-full flex justify-start items-center px-4 py-8">
      <div className="pr-4 py-8">
        <Image src="/icons/cup-of-coffee-svgrepo-com.svg" width={96} height={96} alt="" />
      </div>
      <div className="flex-1 flex-col justify-center items-start border-l-2 border-slate-400 py-2">
        <h1 className="w-full flex justify-center text-xl">含奶</h1>
        {
          list.map(item => {
            return (
              <button className="w-full flex justify-between px-4 mt-2 box-border focus:border-slate-700" key={item._id} onClick={() => { onCafeSelect(item._id) }}>
                <div className="flex justify-start items-center">
                  <Tag title={item.category}></Tag>
                  {item.name}
                  <div className={`mx-2 ${item.isHot ? 'text-red-400' : 'text-indigo-400'}`}>{item.isHot ? '(热)' : '(冰)'}</div>
                </div>
                <div>¥{item.price}</div>
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export function MenuCardRight({ list, onCafeSelect }: { list: any[], onCafeSelect: (id: string) => void }) {
  return (
    <div className="w-full flex justify-start items-center px-4 py-8">

      <div className="flex-1 flex-col justify-center items-start border-r-2 border-slate-400 py-2">
        <h1 className="w-full flex justify-center text-xl">不含奶</h1>
        {
          list.map(item => {
            return (
              <button className="w-full flex justify-between px-4 mt-2 box-border" key={item._id} onClick={() => { onCafeSelect(item._id) }}>
                <div className="flex justify-start items-center">
                  <Tag title={item.category}></Tag>
                  {item.name}
                  <div className={`ml-2 ${item.isHot ? 'text-red-400' : 'text-indigo-400'}`}>{item.isHot ? '(热)' : '(冷)'}</div>
                </div>

                <div>¥{item.price}</div>
              </button>
            )
          })
        }
      </div>
      <div className="px-4 py-8">
        <Image src="/icons/take-away-coffee-svgrepo-com.svg" width={96} height={96} alt="" />
      </div>
    </div>
  )
}

export function MenuCardLeftBean({ list, onBeanSelected }: { list: any[], onBeanSelected: (id: string) => void }) {
  return (
    <div className="w-full flex justify-start items-center px-4 py-8">
      <div className="pr-6 pl-2 py-8">
        <Image src="/icons/coffees-cafe-svgrepo-com.svg" width={84} height={96} alt="" />
      </div>
      <div className="flex-1 flex-col justify-center items-start border-l-2 border-slate-400 py-2">
        <h1 className="w-full flex justify-center text-xl">Beans</h1>
        {
          list.map(item => {
            return (
              <button className="w-full flex justify-between px-4 mt-2 box-border focus:border-slate-700" key={item._id} onClick={() => { onBeanSelected(item._id) }}>
                <div className="flex justify-start items-center">
                  {item.name}
                </div>
                <div className="text-green-400">+¥{item.price}</div>
              </button>
            )
          })
        }
      </div>
    </div>
  )
}