import { ItemContact } from 'components/ItemContact/ItemContact';
import { ItemList } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(i => (
        <ItemList key={i.id}>
          <ItemContact item={i} onDelete={onDelete} />
        </ItemList>
      ))}
    </ul>
  );
};
