import styles from './TransactionList.module.scss'
import useTransactionStore from "../../store/useTransactionStore.js"
import TransactionCard from "../TransactionCard/TransactionCard.jsx"
import TransactionCreate from "../TransactionCreate/TransactionCreate.jsx"
import Search from "../Search/Search.jsx"
import {useState} from "react"
import Pagination from "../Pagination/Pagination.jsx";
import Skeleton from "@components/UI/Skeleton/Skeleton.jsx";

const selector = state => ({
  transactions: state.transactions,
  isLoadingAll: state.isLoadingAll,
})

const TransactionList = () => {
  const {transactions, isLoadingAll} = useTransactionStore(selector)
  const [isVisible, setVisible] = useState(false)


  return (
    <>
      <Search onOpen={() => setVisible(true)}/>
      {!isLoadingAll ?
        <div
          className={styles.transactionList}
        >
          {transactions.length ?
            transactions.map((transaction) =>
              <TransactionCard
                id={transaction.id}
                date={transaction.date}
                amount={transaction.amount}
                category={transaction.category}
                account={transaction.account}
                key={transaction.id}
              />
            ) : <div className={styles.none}>Пусто</div>}
          <Pagination />
          <TransactionCreate isVisible={isVisible} onClose={() => setVisible(false)}/>
        </div> :
        <Skeleton />
      }
    </>
  )
}

export default TransactionList