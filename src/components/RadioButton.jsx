function RadioButton({ id, name, value, validator, label, onChangeHandler }) {
  return (
    <>
      <input type="radio" id={id} name={name} value={value} checked={validator === value} onChange={onChangeHandler} />
      <label htmlFor={id}>{label}</label>
    </>
  )
}

export default RadioButton;