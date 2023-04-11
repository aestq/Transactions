import TextField from "@components/UI/TextField/TextField.jsx"
import Button from "@components/UI/Button/Button.jsx"
import plus from '@assets/plus.png'
import styles from './Search.module.scss'
import {useState} from "react";
import useTransactionStore from "../../store/useTransactionStore.js";

const Search = ({onOpen}) => {
  const [value, setValue] = useState('')
  const {search, getTransaction} = useTransactionStore(
    state => ({search: state.searchTransaction, getTransaction: state.getTransactions})
  )
  const [searchTimeout, setSearchTimeout] = useState(false)

  const onChange = (e) => {
    setValue(e.target.value)
    if(searchTimeout) {
      clearTimeout(searchTimeout)
    }
    if(e.target.value !== '') {
      setSearchTimeout(setTimeout(() => {
        search(e.target.value)
      }, 300))
    } else {
      getTransaction()
    }
  }

  return (
    <div className={styles.search}>
      <TextField
        placeholder='Поиск'
        className={styles.input}
        value={value}
        onChange={onChange}
      />
      <Button className={styles.create} onClick={onOpen}>
        <img src={plus} className={styles.plus}/>
      </Button>
    </div>
  )
}

export default Search