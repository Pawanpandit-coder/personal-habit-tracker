'use client'
import { useState, useEffect } from "react"
import { CalendarWithPresets } from "@/components/CalendarWithPresets"
import { Button } from "@/components/ui/button"
import Loader from "@/components/Loader"
import { useRouter } from "next/navigation"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function page() {
  const [token, setToken] = useState(null)


  const [searchedRecall, setSearchedRecall] = useState([])
  const [loading, setLoading] = useState(false)

  const [date, setDate] = useState(
    new Date(new Date().getFullYear(), 1, 12)
  )
  const [currentMonth, setCurrentMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )

  const router = useRouter()

  useEffect(() => {

    const init = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        setToken(token)
        if (!token) {
          router.push('/login')
          return;
        }
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!res.ok) {
          localStorage.removeItem('token')
          localStorage.removeItem('userData')
          router.push('/login')
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    init();

  }, [])

  const handleRecall = async (e) => {
    e.preventDefault();
    try {
      let url = '/api/recall'
      if (date) {
        url = `/api/recall?date=${date.toLocaleDateString()}`
      }
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        router.push("/login");
        return;
      }

      const data = await res.json();
      setSearchedRecall(data.recall);

    } catch (err) {
      console.error(err);
    } finally {
      return;
    }
  }



  console.log(date)


  return (
    <>
      {loading ? <Loader /> : <section className="flex justify-center items-center flex-col gap-6">
        <div className="flex justify-center flex-col gap-6 my-6 max-w-fit">

          <div className="text-xl border-l-4 px-2 border-blue-200">
            Find With Specific Date
          </div>
          <CalendarWithPresets date={date} setDate={setDate} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
          <Button onClick={handleRecall}>Find Recall</Button>
        </div>

        <div className="flex flex-col gap-3 justify-center my-6 md:w-fit min-w-full">
          <div className="text-xl border-l-4 px-2 border-blue-200">
            Fetched Recall Task
          </div>

          <div className="flex flex-col gap-2 md:flex-row flex-wrap md:max-w-md ">
            {Array.isArray(searchedRecall) && searchedRecall.length !== 0 ?
              searchedRecall.map((r) => (
                <Card key={r._id} className="flex-1 min-w-fit">
                  <CardHeader>
                    <CardTitle> {r.title}</CardTitle>
                    <CardDescription>{r.desc}</CardDescription>
                    {r.completed ? (
                      <CardAction>✔️</CardAction>
                    ) : (
                      <CardAction>🕐</CardAction>
                    )}
                  </CardHeader>
                  <CardContent className='w-full text-wrap'>
                    <p>{(r.content).slice(0,80)}...</p>
                  </CardContent>
                  <CardFooter className="flex justify-center items-center">
                    <Button>Complete Now</Button>
                  </CardFooter>
                </Card>
              )) : <span>No Recalls</span>}
          </div>
        </div>
      </section>}
    </>

  )
}

