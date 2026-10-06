'use client'
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

import { useEffect, useState, use } from 'react';
import { useRouter } from "next/navigation";

export default function Page({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const [viewJournal, setviewJournal] = useState(null);
    const [token, setToken] = useState(null)

    useEffect(() => {
        async function getTask() {
            const token = localStorage.getItem("token");

            const res = await fetch(`/api/journal?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setviewJournal(data.journal);
            setToken(token)
        }

        getTask();
    }, [id]);


    return (
        <section className="px-4 flex md:block justify-start">
            <div className="flex flex-col gap-3 justify-center my-6 md:max-w-xl min-w-full">
                <div className="text-xl border-l-4 px-2 border-blue-200">
                    Read Journal
                </div>

                <div className="flex flex-col gap-2 md:flex-row flex-wrap">
                    {Array.isArray(viewJournal) && viewJournal.length !== 0 ?
                        viewJournal.map((j) => (
                            <Card key={j._id} className="flex-1 min-w-fit">
                                <CardHeader>
                                    <CardTitle> {j.title}</CardTitle>
                                    <CardDescription className='text-xs'>{j.tags}</CardDescription>
                                </CardHeader>
                                <CardContent className="text-wrap">
                                    <p>{j.body}</p>
                                </CardContent>

                            </Card>
                        )) : <span>No Journals</span>}
                </div>
            </div>
        </section>
    );
}