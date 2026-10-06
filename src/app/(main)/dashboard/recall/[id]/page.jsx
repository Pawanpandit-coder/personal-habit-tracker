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
    const [viewRecall, setViewRecall] = useState(null);
    const [token, setToken] = useState(null)

    useEffect(() => {
        async function getTask() {
            const token = localStorage.getItem("token");

            const res = await fetch(`/api/recall?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setViewRecall(data.recall);
            setToken(token)
        }

        getTask();
    }, [id]);

    const updateRecall = async (id) => {
        try {
            const res = await fetch(`/api/recall`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id,
                    completed: true,
                }),
            });
            console.log(res)
            if (!res.ok) {
                router.push('/login')
            }
            alert('marked')
            return;
        } catch (err) {
            console.log(err)
            return;
        }

    }

    return (
        <section>
            <div className="flex flex-col gap-3 justify-center my-6 md:w-fit min-w-full">
                <div className="text-xl border-l-4 px-2 border-blue-200">
                    Review Recall
                </div>
                <div className="flex flex-col gap-2 md:flex-row flex-wrap md:max-w-xl">
                    {Array.isArray(viewRecall) && viewRecall.length !== 0 ?
                        viewRecall.map((r) => (
                            <Card key={r._id} className="flex-1 min-w-fit">
                                <CardHeader>
                                    <CardTitle> {r.title}</CardTitle>
                                    <CardDescription>{(r.desc).slice(0, 25)}{(r.desc).length > 25 && <>..</>}</CardDescription>
                                    {r.completed ? (
                                        <CardAction>✔️</CardAction>
                                    ) : (
                                        <CardAction>🕐</CardAction>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <p>{(r.content).slice(0, 80)}{(r.content).length > 80 && <>..</>}</p>
                                </CardContent>
                                <CardFooter className="flex justify-center items-center">
                                    <Button onClick={() => updateRecall(r._id)}>Mark Complete</Button>
                                </CardFooter>
                            </Card>
                        )) : <span>No Recall</span>}
                </div>
            </div>
        </section>
    );
}