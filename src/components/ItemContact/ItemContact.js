import { ButtonDelete } from './ItemContact.stuled';

export const ItemContact = ({ item: { id, name, number }, onDelete }) => {
  return (
    <div>
      {name}: {number}
      <ButtonDelete
        onClick={() => {
          onDelete(id);
        }}
        type="button"
      >
        Delete
      </ButtonDelete>
    </div>
  );
};
