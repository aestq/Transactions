const ICONS_URL = 'http://localhost:5000/static'

const getIconAll = () => {
  const array = []
  for (let i = 1; i < 36; i++) {
    array.push({value: i, label: <img src={`${ICONS_URL}/icon${i}.svg`} style={{width: '20px'}} alt='icon'/>})
  }
  return array
}

const getIconOne = (number) => {
  return `${ICONS_URL}/icon${number}.svg`
}

export {getIconOne, getIconAll}