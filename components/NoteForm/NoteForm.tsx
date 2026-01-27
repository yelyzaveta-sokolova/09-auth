
      'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createNote } from '@/lib/api'
import { useNoteStore } from '@/lib/store/noteStore'
import type { NoteTag } from '@/types/note'

import css from './NoteForm.module.css'

export default function NoteForm() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { draft, setDraft, clearDraft } = useNoteStore()

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      clearDraft()
      router.back()
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag as NoteTag,
    })
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        name="title"
        value={draft.title}
        onChange={(e) =>
          setDraft({ ...draft, title: e.target.value })
        }
        required
      />

      <textarea
        className={css.textarea}
        name="content"
        value={draft.content}
        onChange={(e) =>
          setDraft({ ...draft, content: e.target.value })
        }
        required
      />

      <select
        className={css.select}
        name="tag"
        value={draft.tag}
        onChange={(e) =>
          setDraft({ ...draft, tag: e.target.value })
        }
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>


      <div className={css.actions}>
        <button type="submit" disabled={mutation.isPending}>
          Create note
        </button>

        <button
          type="button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
