import React, { useEffect, useState } from 'react'

const useData = () => {
    const [notes, setNotes] = useState(()=>{
       const saved = JSON.parse(localStorage.getItem('notes') || '[]');
               return saved.map(note => ({
            ...note,
            position: note.position || determinePosition(),
        }));
    }
    //   {
    //     id: 1,
    //     text: 'Check your morning wood!'
    // }, {
    //     id: 2,
    //     text: 'emasculate yourself!'

    // }
  )
    const NOTE_WIDTH = 200;
    const NOTE_GAP = 5;
      useEffect(() => {
        // const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
    
        // const updatedNotes = notes.map(note => {
        //   const savedNote = savedNotes.find(n => n.id === note.id)
        //   return {
        //     ...note,
        //     position: savedNote?.position || determinePosition(),
        //   }
        // })
    
        // setNotes(updatedNotes)
        localStorage.setItem('notes', JSON.stringify(notes))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [notes])
    
      const determinePosition = () => {
        const maxX = window.innerWidth - 250
        const maxY = window.innerHeight - 250
    
        return {
          x: Math.floor(Math.random() * maxX),
          y: Math.floor(Math.random() * maxY),
        }
      }
    return{notes,setNotes,NOTE_GAP,NOTE_WIDTH};
}
export default useData;