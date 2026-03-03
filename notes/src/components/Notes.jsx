import React, { useRef } from 'react'
import useData from '../hooks/data'
import '../App.css'

function Notes() {
    const { notes, setNotes } = useData()
    const noteRefs = useRef({})


    const handleMouseDown = (note, e) => {
        const noteRef = noteRefs.current[note.id].current
        const rect = noteRef.getBoundingClientRect()

        const offsetX = e.clientX - rect.left
        const offsetY = e.clientY - rect.top
        const startPos = note;
        const handleMouseMove = (moveEvent) => {
            const newX = moveEvent.clientX - offsetX
            const newY = moveEvent.clientY - offsetY

            noteRef.style.left = `${newX}px`
            noteRef.style.top = `${newY}px`
        }
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)

            const finalRect = noteRef.getBoundingClientRect()
            const newPosition = {
                x: finalRect.left,
                y: finalRect.top
            }
            updateNotePosition(note.id, {
                x: finalRect.left,
                y: finalRect.top,
            })
            if (checkOverlap(note.id)) {
                noteRef.style.left = `${startPos?.x}px`;
                noteRef.style.right = `${startPos?.y}px`;

            } else {
                updateNotePosition(note.id, newPosition)
            }
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const updateNotePosition = (id, newPosition) => {
        const updated = notes.map(note =>
            note.id === id ? { ...note, position: newPosition } : note
        )

        setNotes(updated)
        localStorage.setItem('notes', JSON.stringify(updated))
    }
    const checkOverlap = (id) => {
        const currentNote = noteRefs.current[id].current;
        const currentRect = currentNote.getBoundingClientRect();
        return notes.some((note) => {
            if (note.id == id) return false;
            const otherNoteRef = noteRefs.current[id].current;
            const otherRect = otherNoteRef.getBoundingClientRect();
            const overlap = !(currentRect.right < otherNoteRef.left || currentRect.left > otherRect.right || currentRect.bottom < otherRect.top || currentRect.top > otherRect.bottom)
        })
    }
    return (
        <div>
            {notes.map(note => {
                if (!noteRefs.current[note.id]) {
                    noteRefs.current[note.id] = React.createRef()
                }

                return (
                    <div
                        key={note.id}
                        ref={noteRefs.current[note.id]}
                        onMouseDown={(e) => handleMouseDown(note, e)}
                        className="notes"
                        style={{
                            position: 'absolute',
                            left: `${note.position?.x}px`,
                            top: `${note.position?.y}px`,
                        }}
                    >
                        {note.text}
                    </div>
                )
            })}
        </div>
    )
}

export default Notes