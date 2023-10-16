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
    const savedContacts = localStorage.getItem('setContacts');
    const savedFilter = localStorage.getItem('filter');

    if (savedContacts !== null) {
      const listContacts = JSON.parse(savedContacts);
      this.setState({ contacts: listContacts });
    }

    if (savedFilter !== null) {
      const newFilters = JSON.parse(savedFilter);
      this.setState({ filter: newFilters });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('setContacts', JSON.stringify(this.state.contacts));
    }

    if (prevState.filter !== this.state.filter) {
      localStorage.setItem('filter', JSON.stringify(this.state.filter));
    }
  }

  changeFilter = newFilter => {
    this.setState({
      filter: newFilter,
    });
  };

  resetFilter = clearFilter => {
    this.setState({
      filter: '',
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
        <Filter
          filter={this.state.filter}
          onChangeFilter={this.changeFilter}
          onResetFilter={this.resetFilter}
        />
        <ContactList
          contacts={contactsFilter}
          onDelete={this.deleteItemContact}
        />
      </div>
    );
  }
}
