'use client'

import { useRouter } from 'next/navigation'
import { createNote } from '@/lib/api'
import { useNoteStore } from '@/lib/store/noteStore'
import css from './NoteForm.module.css'

export default function NoteForm() {
  const router = useRouter()

  const draft = useNoteStore((state) => state.draft)
  const setDraft = useNoteStore((state) => state.setDraft)
  const clearDraft = useNoteStore((state) => state.clearDraft)

  const handleSubmit = async (formData: FormData) => {
    const note = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as string,
    }

    await createNote(note)
    clearDraft()
    router.back()
  }

  return (
    <form action={handleSubmit} className={css.form}>
      <input
        name="title"
        placeholder="Title"
        className={css.input}
        value={draft.title}
        onChange={(e) =>
          setDraft({
            ...draft,
            title: e.target.value,
          })
        }
        required
      />

      <textarea
        name="content"
        placeholder="Content"
        className={css.textarea}
        value={draft.content}
        onChange={(e) =>
          setDraft({
            ...draft,
            content: e.target.value,
          })
        }
        required
      />

      <select
        name="tag"
        className={css.select}
        value={draft.tag}
        onChange={(e) =>
          setDraft({
            ...draft,
            tag: e.target.value,
          })
        }
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <div className={css.actions}>
        <button type="submit" className={css.submit}>
          Create
        </button>

        <button
          type="button"
          className={css.cancel}
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
