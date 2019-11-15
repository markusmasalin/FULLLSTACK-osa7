import React, { useState, useEffect } from 'react'
import nameService from './services/names'
import Persons from './components/Persons'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }
  if (notification.message === '') {
    return null
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

const Filter = ({filterInput, handleFilter}) => {
    console.log(filterInput)    
    return (
        <form>
            rajaa näytettäviä
            <input 
                value={filterInput}
                onChange={handleFilter}
            />
        </form>
    )
}



const PersonForm = ({props}) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <h3>Blogi</h3>
                Kirjoittajan nimi: <input 
                value={props.newAuthor}
                onChange={props.handleNameChange}
                />
            </div>
            <div>aihe: <input 
                value={props.newTitle}
                onChange={props.handleNumberChange}
                />
            </div>
            <div>url: <input 
                value={props.newUrl}
                onChange={props.handleNumberChange}
                />
            </div>
            <div>Tykkäysten määrä: <input 
                value={props.newLike}
                onChange={props.handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

const App = () => {
    const [authors, setAuthors] = useState([])
    const [ newAuthor, setNewAuthor ] = useState('')
    const [ newTitle, setNewTitle ] = useState('')
    const [ newUrl, setNewUrl ] = useState('')
    const [ newLike, setNewLike] = useState('')

    const [filterInput, setNewFilterInput] = useState('')
    const [notification, setNotification] = useState({
      message:null
    })
    

    useEffect(() => {
      nameService
      .getAll().then(initialNames => {
        setAuthors(initialNames)
      })
    }, [])
    console.log('render', authors.length, 'authors')

    const handleAuthorChange = (event) => {
      console.log(event.target.value)
      setNewAuthor(event.target.value)
    }
    const handleTitleChange = (event) => {
      console.log(event.target.value)
      setNewTitle(event.target.value)
    }
    const handleLikeChange = (event) => {
      console.log(event.target.value)
      setNewLike(event.target.value)
    }
    const handleUrlChange = (event) => {
      console.log(event.target.value)
      setNewUrl(event.target.value)
    }
    

    const handleFilter = (event) => {
      console.log(event.target.value)
      setNewFilterInput(event.target.value)
    }

    const notify = (message, type='success') => {
      setNotification({ message, type })
      setTimeout(() => setNotification({ message: null }), 10000)
    }

    
    const handleSubmit = (event) => {
      event.preventDefault()

      const existingAuthors = authors.find(p => p.name === newAuthor)
      /*
      if (existingAuthors) {
        const ok = window.confirm(`${newAuthor} is already added to the list, add ?`)

        if (ok) { 
           
          nameService
                .update({ ...existingPerson, number: newNumber} ).then(returnedName => {
                  setPersons(persons.map(p => p.name === newName ? returnedName : p))      
                  setNewName('')
                  setNewNumber('')
                  notify(
                    `The number of '${newName}' is updated to server`
                  )
                })
                .catch(() => {
                  setPersons(persons.filter(n => n.id !== existingPerson.id))
                  notify(`Name '${newName}' was already removed from phonebook`)

                })
          }
          return
        } */
      
        nameService
              .create({
                author: newAuthor,
                title: newTitle,
                url: newUrl,
                likes: newLike
              })
              .then(returnedName => {
                  setAuthors(authors.concat(returnedName))
                  setNewAuthor('')
                  setNewTitle('')
                  setNewUrl('')
                  setNewLike('')
                  notify(
                    `${returnedName} is added to the list`
                  )
                  
                })
                .catch(error => {
                  console.log(error.response.data)
                  console.log(error)
     
                  notify(
                    `'${error.response.data.error}'`
                  ) 
                })
              }

    const deletePerson = (id) => {
      
      const person = authors.find(p => p.id === id)
      console.log("person" + person)
      console.log("id" + id)
      const ok = window.confirm(`Delete ${person.name}?`) 
      if (ok){ 
        nameService
            .deleteName(id)
            .then(() => {
              setAuthors(authors.filter(p => p.id !==id))
            })
        notify(`${person.name} is deleted from the phonebook`)
      }
    }
    
    const namesToShow = authors.filter(person => person.name.toLowerCase().includes(filterInput.toLowerCase()))
    

    return (
        <div>
        <h2>Blogit</h2> 
        <Notification notification={notification} />
       

        <Filter filterInput={filterInput} handleFilter={handleFilter}/>  
        <PersonForm 
            newAuthor={newAuthor}
            newTitle={newTitle}
            newUrl={newUrl}
            newLike={newLike}
            handleAuthorChange={handleAuthorChange}
            handleTitleChange={handleTitleChange}  
            handleUrlChange={handleUrlChange} 
            handleLikeChange={handleLikeChange} 
            handleSubmit={handleSubmit}
            
            />
        <h3>Numerot</h3>
        <Persons persons={namesToShow} deletePerson={deletePerson}   />      
        </div>
    )
}
export default App


