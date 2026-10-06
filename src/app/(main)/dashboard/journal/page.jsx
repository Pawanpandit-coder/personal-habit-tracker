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


  const [searchedJournal, setSearchedJournal] = useState([])
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

  const handleJournal = async (e) => {
    e.preventDefault();
    try {
      let url = '/api/journal'
      if (date) {
        url = `/api/journal?date=${date.toLocaleDateString()}`
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
      setSearchedJournal(data.journal);

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
          <Button onClick={handleJournal}>Find Journal</Button>
        </div>

        <div className="flex flex-col gap-3 justify-center my-6 md:w-fit min-w-full">
          <div className="text-xl border-l-4 px-2 border-blue-200">
            Fetched Journal Task
          </div>

          <div className="flex flex-col gap-2 md:flex-row flex-wrap">
            {Array.isArray(searchedJournal) && searchedJournal.length !== 0 ?
              searchedJournal.map((j) => (
                <Card key={j._id} className="flex-none md:flex-1 min-w-fit">
                  <CardHeader>
                    <CardTitle> {j.title}</CardTitle>
                    <CardDescription>{j.body}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{j.tags}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center items-center">
                    <Button onClick={() => router.push(`/dashboard/journal/${router._id}`)}>Read Now</Button>
                  </CardFooter>
                </Card>
              )) : <span>No Recalls</span>}
          </div>
        </div>
      </section>}
    </>

  )
}

