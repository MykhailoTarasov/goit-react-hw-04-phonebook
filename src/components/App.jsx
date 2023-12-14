import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Container, Title } from './Layout';


const App = () => {
  const [contacts, setContacts] = useState(() => {
    const saveContacts = localStorage.getItem('contacts-list');
    return JSON.parse(saveContacts) || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts-list', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (nameExists) {
      alert(`${newContact.name}' is arleady in contacts.`);
    } else {
      setContacts(prevState => [...prevState, { ...newContact, id: nanoid() }]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = newFilter => {
    setFilter(newFilter);
  };

  const visibleContacts = filter
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />

      <Title>Contacts</Title>
      <Filter filter={filter} onChangeFilter={changeFilter} />
      <ContactList
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}



export default App;
