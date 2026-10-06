'use client'
import { useState, useEffect } from "react"
import { CopyIcon, FileCodeIcon } from "lucide-react"
import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import { DatePickerTime } from "@/components/DatePickerTime"
import { useRouter } from "next/navigation"
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

export default function page() {
  const [token, setToken] = useState(null)

  const [loading, setLoading] = useState(false)
  const [recall, setRecall] = useState({
    title: "", desc: "", content: "", date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString().split(' ')[0].padStart(8, "0")
  })
  const router = useRouter()

  console.log(recall.time)

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


  const handleRecall = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/recall', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(recall)
      })
      if (!res.ok) {
        router.push('/login')
        return;
      }
      alert("Recall added")
    } catch (err) {
      console.error(err)
    } finally {
      setRecall({ title: "", desc: "", content: "" })
    }
  }
  return (
    <>{loading ? <Loader /> : <FieldGroup className="max-w-md my-6">
      <div className="text-xl border-l-4 px-2 border-blue-200">
        Add Recall
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleRecall}>
        <Field>
          <InputGroup className="h-auto">
            <InputGroupInput
              id="block-start-input"
              placeholder="ie. matrix multiplication"
              onChange={(e) => setRecall({ ...recall, title: e.target.value })}
              value={recall.title}
              required
              maxLength='50'
            />
            <InputGroupAddon align="block-start">
              <InputGroupText>Recall Title</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <InputGroup>
            <InputGroupTextarea
              id="block-start-textarea"
              placeholder="ie. procedure of the matrix multiplication"
              className="font-mono text-sm"
              onChange={(e) => setRecall({ ...recall, desc: e.target.value })}
              value={recall.desc}
              required
              maxLength='120'
            />
            <InputGroupAddon align="block-start">
              <FileCodeIcon className="text-muted-foreground" />
              <InputGroupText className="font-mono">Short Description</InputGroupText>
              <InputGroupButton size="icon-xs" className="ml-auto">
                <CopyIcon />
                <span className="sr-only">Copy</span>
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupAddon align="block-end">
              <InputGroupText className="text-xs text-muted-foreground"
              >
                {120 - (recall.desc).length} characters left
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <InputGroup>
            <InputGroupTextarea placeholder="ie. Detailed Explaination " id="block-start-textarea"
              className="font-mono text-sm"
              value={recall.content}
              onChange={(e) => setRecall({ ...recall, content: e.target.value })}
              required
            />
            <InputGroupAddon align="block-start">
              <InputGroupText className="font-mono">Recall content</InputGroupText>
              <InputGroupButton size="icon-xs" className="ml-auto">
                <CopyIcon />
                <span className="sr-only">Copy</span>
              </InputGroupButton>
            </InputGroupAddon>

          </InputGroup>
        </Field>

        <Field >
          <DatePickerTime date={recall.date} onDateChange={(selectedDate) => setRecall({ ...recall, date: selectedDate.toLocaleDateString() })}
            time={recall.time} onTimeChange={(e) => setRecall({ ...recall, time: e.target.value })} />
        </Field>
        <Button>Save Recall</Button>
      </form>

    </FieldGroup>}
    </>
  )
}
