'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CopyIcon, FileCodeIcon } from "lucide-react"

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'
import { DatePickerTime } from '@/components/DatePickerTime'

export default function page() {
    const [token, setToken] = useState(null)
    const [journal, setJournal] = useState({
        title: "", body: "", tags: "", date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString().split(' ')[0].padStart(8, '0')
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const init = async () => {
            try {
                setLoading(true)
                const t = localStorage.getItem('token')
                setToken(t)
                if (!t) {
                    router.push('/login')
                    return;
                }
                const res = await fetch('/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${t}`
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

    const router = useRouter()

    async function handleJournal(e) {
        e.preventDefault();
        try {
            const res = await fetch('/api/journal', {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(journal)
            })
            if (!res.ok) {
                router.push('/login')
                return;
            }
            alert("Journal added")
        } catch (err) {
            console.error(err)
        } finally {
            setJournal({ title: "", body: "", tags: "" })
        }
        // console.log(journal)
    }

    return (
        <>
            {loading ? <Loader /> : <FieldGroup className="max-w-md mt-6">
                <div className="text-xl border-l-4 px-2 border-blue-200">
                    Add Journal
                </div>
                <form onSubmit={handleJournal} className='flex gap-4 flex-col'>
                    <Field>
                        <InputGroup className="h-auto">
                            <InputGroupInput
                                id="block-start-input"
                                placeholder="ie. A Peaceful Mind"
                                onChange={(e) => setJournal({ ...journal, title: e.target.value })}
                                value={journal.title}
                                required
                                maxLength='50'
                            />
                            <InputGroupAddon align="block-start">
                                <InputGroupText>Journal Title</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Field>
                        <InputGroup>
                            <InputGroupTextarea
                                id="block-start-textarea"
                                placeholder="ie. A consistent daily routine is the foundation of long-term success."
                                className="font-mono text-sm"
                                onChange={(e) => setJournal({ ...journal, body: e.target.value })}
                                value={journal.body}
                                required

                            />
                            <InputGroupAddon align="block-start">
                                <FileCodeIcon className="text-muted-foreground" />
                                <InputGroupText className="font-mono">Detail Description</InputGroupText>
                                <InputGroupButton size="icon-xs" className="ml-auto">
                                    <CopyIcon />
                                    <span className="sr-only">Copy</span>
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>

                    </Field>
                    <Field>
                        {/* <FieldLabel htmlFor="block-start-input">Title</FieldLabel> */}
                        <InputGroup>
                            <InputGroupTextarea placeholder="ie.  #motivation  #life" required
                                onChange={(e) => setJournal({ ...journal, tags: e.target.value })}
                                value={journal.tags}
                                maxLength='120'
                            />
                            <InputGroupAddon align="block-end">
                                <InputGroupText className="text-xs text-muted-foreground">
                                    {120 - (journal.tags).length} characters left
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Field >
                        <DatePickerTime date={journal.date} onDateChange={(selectedDate) => setJournal({ ...journal, date: selectedDate.toLocaleDateString() })}
                            time={journal.time} onTimeChange={(e) => setJournal({ ...journal, time: e.target.value })} />
                    </Field>
                    <Button>Save Journal</Button>
                </form>
            </FieldGroup>}

        </>


    )

}
