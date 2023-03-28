import { useEffect, useState } from "react";
import React from "react";
import Search from "./components/Search";
import Form from "./components/Form";
import Person from "./components/Person";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //first, create state for message
  //add functionality to the posting function that when that happens, it will appear, add set timeout
  //otherwise,

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPersons = (event) => {
    event.preventDefault();
    if (
      persons.find(({ name }) => {
        return name === newName;
      })
    ) {
      if (window.confirm(`${newName} has been used, update contact number?`)) {
        const similarPerson = persons.filter((person) => {
          return person.name === newName;
        });
        const similarPersonID = similarPerson[0].id;

        const updatedPersonObject = {
          name: newName,
          number: newNumber,
        };

        // console.log(similarPerson[0].id);
        personService
          .update(similarPersonID, updatedPersonObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== similarPersonID ? person : response.data
              )
            );
            setSuccessMessage(`${newName}'s contact is updated`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
      setNewName("");
      setNewNumber("");

      // });
      // }
    } else {
      const personObject = { name: newName, number: newNumber };
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        setSuccessMessage(`${newName} is added`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Kindly confirm if that you wish to delete this contact")
    ) {
      personService.remove(id).then(() => {
        // setPersons(persons.filter((person) => person.id !== id));
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const personsToShow = newSearch
    ? persons.filter(({ name }) => {
        return name.includes(newSearch);
      })
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification successMessage={successMessage} />
      <ErrorNotification errorMessage={errorMessage} />
      <Search newSearch={newSearch} handleSearch={handleSearch} />
      <Form
        addPersons={addPersons}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <ul>
        {personsToShow.map((person) => (
          <Person
            key={person.name}
            person={person}
            handleDelete={() => handleDelete(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
