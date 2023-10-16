export const Filter = ({ filter, onChangeFilter, onResetFilter }) => {
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={filter}
        onChange={evt => onChangeFilter(evt.target.value)}
      />
      <button onClick={onResetFilter}>Reset</button>
    </div>
  );
};
