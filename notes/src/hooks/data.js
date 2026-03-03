import React, { useEffect, useState } from 'react'

const useData = () => {
    const [notes, setNotes] = useState([{
        id: 1,
        text: 'Check your morning wood!'
    }, {
        id: 2,
        text: 'emasculate yourself!'

    }])
      useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
    
        const updatedNotes = notes.map(note => {
          const savedNote = savedNotes.find(n => n.id === note.id)
          return {
            ...note,
            position: savedNote?.position || determinePosition(),
          }
        })
    
        setNotes(updatedNotes)
        localStorage.setItem('notes', JSON.stringify(updatedNotes))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
      const determinePosition = () => {
        const maxX = window.innerWidth - 250
        const maxY = window.innerHeight - 250
    
        return {
          x: Math.floor(Math.random() * maxX),
          y: Math.floor(Math.random() * maxY),
        }
      }
    return{notes,setNotes};
}
export default useData;