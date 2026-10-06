"use client";

import { useRouter } from "next/navigation";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/authContext";


export default function Page() {

  const router = useRouter();
  const { setIsLoggedIn } = useAuth()
  const { loading, setLoading } = useAuth()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        await Promise.all([
          fetchRecall(token),
          fetchJournal(token),
        ]);
      } finally {
        setLoading(false);
        setToken(token)
      }
    };

    init();
  }, []);

  // console.log(token)

  async function fetchRecall(token, id = null) {
    try {
      let url = "/api/recall";

      if (id) {
        url += `?id=${id}`;
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
      setRecallTask(data.recall);
    } catch (err) {
      console.error(err);
    }
  }
  async function fetchJournal(token) {
    try {
      const res = await fetch("/api/journal", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setJournalTask(data.journal);
    } catch (err) {
      console.error(err);
    }
  }



  const [streak, setStreak] = useState([
    { title: "Streak of the day!", day: "Your brain can 'rewrite' memories every time you remember them." },
  ]);
  const [recallTasks, setRecallTask] = useState([]);
  const [journalTasks, setJournalTask] = useState([]);


  return (
    <>{loading ? <Loader /> : <div className="flex flex-col items-center justify-center py-2 mx-4 md:mx-[25vw] gap-3 ">
      <div className="steak self-start w-full ">
        <Card>
          <CardHeader>
            <CardTitle> {streak[0].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{streak[0].day}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-3 justify-center my-6 md:w-fit min-w-full">
        <div className="text-xl border-l-4 px-2 border-blue-200">
          Today's Recall Task
        </div>

        <div className="flex flex-col gap-2 md:flex-row flex-wrap">
          {Array.isArray(recallTasks) && recallTasks.length !== 0 ?
            recallTasks.map((r) => (
              <Card key={r._id} className="flex-1 min-w-fit">
                <CardHeader>
                  <CardTitle> {r.title}</CardTitle>
                  <CardDescription className='text-xs'>{(r.desc).slice(0, 25)}{(r.desc).length > 25 && <>..</>}</CardDescription>
                  {r.completed ? (
                    <CardAction>✔️</CardAction>
                  ) : (
                    <CardAction>🕐</CardAction>
                  )}
                </CardHeader>
                <CardContent>
                  <p>{(r.content).slice(0, 80)}{(r.content).length > 80 && <>..</>}</p>
                </CardContent>
                {!r.completed && (<CardFooter className="flex justify-center items-center">
                  <Button onClick={() => router.push(`/dashboard/recall/${r._id}`)}>Complete Now</Button>
                </CardFooter>)}

              </Card>
            )) : <div className="flex justify-between w-full"><span>No Recalls</span> <Button onClick={()=>router.push('dashboard/recall/new')}>Add Recall</Button></div>}
        </div>
      </div>

      <div className="flex flex-col gap-3 justify-center my-6 md:w-fit min-w-full">
        <div className="text-xl border-l-4 px-2 border-blue-200">
          Recently Added Journal
        </div>

        <div className="flex flex-col gap-2 md:flex-row flex-wrap">
          {Array.isArray(journalTasks) && journalTasks.length !== 0 ?
            journalTasks.map((j) => (
              <Card key={j._id} className="flex-1 min-w-fit">
                <CardHeader>
                  <CardTitle> {j.title}</CardTitle>
                  <CardDescription className='text-xs'>{(j.tags).slice(0, 25)}{(j.tags).length > 25 && <>..</>}</CardDescription>
                </CardHeader>
                <CardContent className="text-wrap">
                  <p>{(j.body).slice(0, 80)}{(j.body).length > 80 && <>..</>}</p>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                  <Button onClick={() => router.push(`/dashboard/journal/${j._id}`)}>Read Now</Button>
                </CardFooter>
              </Card>
            )) : <div className="flex justify-between w-full"><span>No Journal</span> <Button onClick={()=>router.push('dashboard/journal/new')}>Add Journal</Button></div>}
        </div>
      </div>
    </div>}

    </>

  );
}
