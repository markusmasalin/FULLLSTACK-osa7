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



const PersonForm = ({handleSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h3>lisää nimiä</h3>
                nimi: <input 
                value={newName}
                onChange={handleNameChange}
                />
            </div>
            <div>numero: <input 
                value={newNumber}
                onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [filterInput, setNewFilterInput] = useState('')
    const [notification, setNotification] = useState({
      message:null
    })
    

    useEffect(() => {
      nameService
      .getAll().then(initialNames => {
        setPersons(initialNames)
      })
    }, [])
    console.log('render', persons.length, 'persons')

    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
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

      const existingPerson = persons.find(p => p.name === newName)

      if (existingPerson) {
        const ok = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

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
        }
      
        nameService
              .create({
                name: newName,
                number: newNumber
              })
              .then(returnedName => {
                  setPersons(persons.concat(returnedName))
                  setNewName('')
                  setNewNumber('')
                  notify(
                    `${returnedName} is added to phonebook`
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
      
      const person = persons.find(p => p.id === id)
      console.log("person" + person)
      console.log("id" + id)
      const ok = window.confirm(`Delete ${person.name}?`) 
      if (ok){ 
        nameService
            .deleteName(id)
            .then(() => {
              setPersons(persons.filter(p => p.id !==id))
            })
        notify(`${person.name} is deleted from the phonebook`)
      }
    }
/*
        const nameObject = {
            name: newName,
            number: newNumber
        }
        var found=false;
        persons.forEach(function(item){
            if(item.name === nameObject.name){
                found=true;               
            }
        })
        if (found===true){
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            const updatedPerson = persons.find(n => n.name === newName)  
            
              nameService
                .update(updatedPerson.id, changedNumber).then(returnedName => {
                  setSuccessMessage(
                    `The number of '${updatedPerson.name}' is updated to server`
                  )
                  setTimeout(() => {
                    setSuccessMessage(null)
                  }, 5000)
                  setPersons(persons.map(name => name.id !== updatedPerson.id ? name : returnedName))      
                })
                .catch(error => {
                  setErrorMessage(
                    `Name '${updatedPerson.name}' was already removed from phonebook`
                  )
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
                  setPersons(persons.filter(n => n.id !== updatedPerson.id))
                })
          }
        } 
        if (found===false){
            setPersons(persons.concat(nameObject))
            setNewNumber('')
            setNewName('')
        
            nameService
              .create(nameObject).then(returnedName => {
                  setPersons(persons.concat(returnedName))
                  setNewName('')
                  setSuccessMessage(
                    `${nameObject.name} is added to phonebook`
                  )
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
                })
              .catch(error => {
                setErrorMessage(
                  `Ups, something went wrong. Try to add  '${nameObject.name}' again`
                )
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              })
          }
    }
*/
  
    
    const namesToShow = persons.filter(person => person.name.toLowerCase().includes(filterInput.toLowerCase()))
    

    return (
        <div>
        <h2>Puhelinluettelo</h2> 
        <Notification notification={notification} />
       

        <Filter filterInput={filterInput} handleFilter={handleFilter}/>  
        <PersonForm 
            newName={newName}
            newNumber={newNumber}
            handleNameChange={handleNameChange}
            handleSubmit={handleSubmit}
            handleNumberChange={handleNumberChange}    
            />
        <h3>Numerot</h3>
        <Persons persons={namesToShow} deletePerson={deletePerson}   />      
        </div>
    )
}
export default App


