import React, { useRef, useState } from "react";
import useData from "../hooks/data";
import "../App.css";

function Notes() {
    const { notes, setNotes, NOTE_WIDTH, NOTE_GAP } = useData();
    const noteRefs = useRef({});
    const [currNote, setCurrNote] = useState("");

    const handleMouseDown = (note, e) => {
        const noteRef = noteRefs.current[note.id].current;
        const rect = noteRef.getBoundingClientRect();

        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const startPos = note.position;

        const handleMouseMove = (moveEvent) => {
            const newX = moveEvent.clientX - offsetX;
            const newY = moveEvent.clientY - offsetY;

            noteRef.style.left = `${newX}px`;
            noteRef.style.top = `${newY}px`;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

            const finalRect = noteRef.getBoundingClientRect();
            const newPosition = {
                x: finalRect.left,
                y: finalRect.top,
            };

            if (checkOverlap(note.id)) {
                // revert to original position
                noteRef.style.left = `${startPos?.x ?? 0}px`;
                noteRef.style.top = `${startPos?.y ?? 0}px`;
            } else {
                updateNotePosition(note.id, newPosition);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const updateNotePosition = (id, newPosition) => {
        const updated = notes.map((note) =>
            note.id === id ? { ...note, position: newPosition } : note
        );

        setNotes(updated);
        localStorage.setItem("notes", JSON.stringify(updated));
    };

    const checkOverlap = (id) => {
        const currentRect =
            noteRefs.current[id].current.getBoundingClientRect();

        return notes.some((note) => {
            if (note.id === id) return false;

            const otherRef = noteRefs.current[note.id]?.current;
            if (!otherRef) return false;

            const otherRect = otherRef.getBoundingClientRect();

            return !(
                currentRect.right < otherRect.left ||
                currentRect.left > otherRect.right ||
                currentRect.bottom < otherRect.top ||
                currentRect.top > otherRect.bottom
            );
        });
    };

    const addNote = () => {
        if (!currNote.trim()) return;

        const newNote = {
            id: Date.now().toString(),
            text: currNote,
            position: { x: notes.length *(NOTE_WIDTH + NOTE_GAP), y: 100 },
        };

        const addedNotes = [...notes, newNote];

        setNotes(addedNotes);
        localStorage.setItem("notes", JSON.stringify(addedNotes));
        setCurrNote("");
    };
const DeleteNote=(id)=>{
        const deleteNote=notes.filter(note=>note.id!==id);
        setNotes(deleteNote);
        localStorage.setItem("notes",JSON.stringify(deleteNote));
}
    return (
        <div style={{
            display: "flex",
            flexDirection: 'flex-row',
        }}>
            {notes.map((note) => {
                if (!noteRefs.current[note.id]) {
                    noteRefs.current[note.id] = React.createRef();
                }

                return (
                    <div
                        key={note.id}
                        ref={noteRefs.current[note.id]}
                        onMouseDown={(e) => handleMouseDown(note, e)}
                        className="notes"
                        style={{
                            
                            position: "absolute",
                            left: `${note.position?.x ?? 0}px`,
                            top: `${note.position?.y ?? 0}px`,
                        }}
                    >
                        {note.text}
            <button onClick={()=>DeleteNote(note.id)}>Delete Note</button>

                    </div>
                );
            })}

            <input
                type="text"
                value={currNote}
                onChange={(e) => setCurrNote(e.target.value)}
                placeholder="Enter note text"
            />
            <button onClick={addNote}>Add A Note</button>
        </div>
    );
}

export default Notes;