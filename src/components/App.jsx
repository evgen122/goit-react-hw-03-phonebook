import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import { Component } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('setContactst');
    if (savedContacts !== null) {
      const listContacts = JSON.parse(savedContacts);
      this.setState({ contacts: listContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prevState', prevState);
    console.log('state', this.state);
    if (prevState.contacts !== this.state.contacts) {
      console.log('WRITE');
      localStorage.setItem('setContactst', JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = newFilter => {
    this.setState({
      filter: newFilter,
    });
  };

  getContactsFilter = () => {
    const contacts = this.state.contacts;
    return contacts.filter(item => {
      const filter = this.state.filter.toLowerCase();
      const hasContacts = item.name.toLowerCase().includes(filter);
      if (this.state.filter === '') {
        return true;
      }
      return hasContacts;
    });
  };

  deleteItemContact = Id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== Id),
    }));
  };

  addContact = newContact => {
    let flag = 0;

    // eslint-disable-next-line array-callback-return
    this.state.contacts.map(i => {
      if (i.name === newContact.name) {
        return (flag = 1);
      }
    });

    if (flag === 1) {
      return Notiflix.Notify.warning(
        `${newContact.name} 
        is already in contacts`
      );
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
    }));
  };

  render() {
    const contactsFilter = this.getContactsFilter();

    return (
      <div>
        <h1>Poneboock</h1>
        <ContactForm onAdd={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChangeFilter={this.changeFilter} />
        <ContactList
          contacts={contactsFilter}
          onDelete={this.deleteItemContact}
        />
      </div>
    );
  }
}
