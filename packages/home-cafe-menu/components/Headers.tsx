import Image from 'next/image'

export function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full h-16 flex justify-start items-center z-50"
      style={{
        background: 'rgba(245, 237, 234, 0.8)',
        boxShadow: ' 0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10.7px)',
      }}
    >
      <Image src="/icons/cafe-sign-svgrepo-com.svg" width={36} height={36} alt="" />
      <p className='ml-2'>欢迎光临饭团咖啡</p>
    </div>
  )
}