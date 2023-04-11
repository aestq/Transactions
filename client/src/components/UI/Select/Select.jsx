import ReactSelect from 'react-select'

const Select = ({value, onChange, options, placeholder}) => {
  const selectStyle = {
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: 'var(--main-color)',
      border: 'none',
      color: '#fff',
      padding: '2px 10px',
      borderRadius: '10px',
      boxShadow: 'none',
      width: '100%'
    }),
    option: () => ({
      padding: '8px 14px',
      '&:hover': {backgroundColor: 'var(--background-color)'}
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'var(--main-color)',
      borderRadius: '10px'
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--color-input)',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      fontSize: 20,
      color: 'var(--color-input)',
    })
  }

  return (
    <ReactSelect
      styles={selectStyle}
      options={options}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      isSearchable={false}
    />
  )
}

export default Select