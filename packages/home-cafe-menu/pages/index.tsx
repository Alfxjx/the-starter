import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Header } from "../components/Headers";
import { MenuCardLeft, MenuCardRight, MenuCardLeftBean } from "../components/MenuCard";
import { Cart } from "../components/Cart";
import { doBuy, getBean, getMenu } from "../requests";

interface IProps {
  cafe: any[];
  bean: any[];
}

const Home: NextPage = () => {
  const [cafe, setCafe] = useState<any[]>([]);
  const [bean, setBean] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getMenu();
      const bean = await getBean();
      console.log(res.data, bean.data);
      await setCafe([...res.data]);
      await setBean([...bean.data]);
    })()
  }, []);
  return (
    <div className="w-screen min-h-screen bg-bg-paper font-cola">
      <MenuView cafe={cafe} bean={bean}></MenuView>
    </div>
  );
};

const MenuView = ({ cafe, bean }: IProps) => {
  const [cafeSelect, setCafe] = useState<any>({});
  const [beanSelect, setBean] = useState<any>({});
  const [isLoading, setLoading] = useState(false);
  const handlePay = () => {
    console.log('paying');
    if(isLoading){
      return;
    }
    setLoading(true);
    doBuy({
      cafeID: cafeSelect._id,
      beanID: beanSelect?._id
    }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        toast('已下单！');
      } else {
        toast('下单失败！');
      }
    }).catch(() => {
      setLoading(false);
      toast('下单失败！');

    })
  }

  const handleCafe = (id: string) => {
    console.log(`cafe: ${id}`);
    const cafeItem = cafe.filter(x => x._id === id)[0];
    setCafe(cafeItem);
  }

  const handleBean = (id: string) => {
    console.log(`bean: ${id}`);
    const beanItem = bean.filter(x => x._id === id)[0];
    setBean(beanItem);
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="w-full flex-1 mt-16 mb-32 py-4">
        <MenuCardLeft list={cafe.filter(x => {
          return x.category === '拿铁' || x.category === 'Dirty'
        })} onCafeSelect={handleCafe} />
        <MenuCardRight list={cafe.filter(x => {
          return x.category !== '拿铁' && x.category !== 'Dirty'
        })} onCafeSelect={handleCafe} />
        <MenuCardLeftBean list={bean} onBeanSelected={handleBean} />
      </div>
      <Cart cafe={cafeSelect.name} bean={beanSelect.name} onPay={handlePay} />
    </div>
  )
}

export default Home;
