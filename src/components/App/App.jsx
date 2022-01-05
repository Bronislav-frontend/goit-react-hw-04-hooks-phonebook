import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'

import defaultContacts from '../../data/contacts.json'
import Section from '../Section/Section'
import ContactsForm from '../ContactsForm/ContactsForm';
import Filter from '../Filter/Filter';
import Contacts from '../Contacts/Contacts';

import s from './App.module.css'

export default function App () {
  const [contacts, setContacts] = useState(() => {
      return JSON.parse(localStorage.getItem('contacts')) ?? defaultContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {

    const contact = {
      id: nanoid(3),
      name,
      number,
    };

    if (
      contacts.find(
          contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else if (!name.trim() || !number.trim()) {
      alert("Enter the contact's name and number phone!");
    } else {
      setContacts(prevContacts => [...prevContacts, contact]);
    }
  };
 

  const onChangeFilter = evt => {
    setFilter(evt.target.value);
  };

  const onDeleteContact = contactId => {
    setContacts(contacts.filter(({id}) => id !== contactId))
  };

  const showFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    )}
  

    return (
      <>
        <div className={s.container}>
          <Section title="Phonebook">
            <ContactsForm onSubmit={formSubmitHandler} />
            </Section>
          <Section title="Contacts">
            <Filter value={filter} onChange={onChangeFilter} /> 
            <Contacts contacts={showFilteredContacts()} onDeleteContact={onDeleteContact} />
          </Section>
        </div>
      </>
    )
  }
