import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")

  const getRandomCashback = async () => {
    const userId = localStorage.getItem("userId")!
    console.log(userId);
    
    if (userId) {
      setLoading(true)
      const res = await fetch(process.env.NEXT_PUBLIC_API!, {
        method: "post",
        body: JSON.stringify({
          id: userId
        })
      })
      const data = await res.json()
      console.log(data.result);
      setResult(data.result)
      setLoading(false)
    }
    else {
      setLoading(true)
      const newId = (Math.random() * 1e18).toString();
      localStorage.setItem("userId", newId)
      const res = await fetch("http://localhost:5000", {
        method: "post",
        body: JSON.stringify({
          id:newId
      }),
      headers:{
        "Content-Type":"application/json"
      }
      })
      const data = await res.json()
      console.log(data.result);
      setLoading(false)
    }


  }

  return (
    <main
      className={`h-screen w-full flex flex-col items-center justify-center  ${inter.className}`}
    >
      <div className="w-[80%] lg:w-1/2 h-1/2 bg-white flex flex-col rounded-md items-center justify-center">
         {
          result.trim().length > 0 && <h1 className={`my-4 ${result.includes("Cashback")?"text-green-600 font-extrabold":"text-black font-normal"}`}>Result : {result} </h1>
         }
        <button className='w-[60%] lg:w-[300px] h-[45px] text-white bg-blue-800 rounded-md flex items-center justify-center' onClick={getRandomCashback}>{loading ? "Loading.." : "Cashback"}</button>
      </div>
    </main>
  )
}
