import useTransactionStore from "../../store/useTransactionStore.js"
import styles from './Pagination.module.scss'
import Button from "@components/UI/Button/Button.jsx"

const selector = state => ({
  count: state.count,
  page: state.page,
  updatePage: state.updatePage,
  transactions: state.transactions
})

const Pagination = () => {
  const {page, count, updatePage, transactions} = useTransactionStore(selector)

  const isPagination = count < page || !transactions.length || count === -1

  return isPagination ? null : (
    <div className={styles.pagination}>
      {page > 1 &&
        <Button onClick={() => updatePage(page - 1)}>
          Prev
        </Button>}
      {page < count &&
        <Button
          onClick={() => updatePage(page + 1)}
        >
          Next
        </Button>}
    </div>
  )
}

export default Pagination