import styles from './TransactionCard.module.scss'
import {getIconOne} from "@/helpers/getIcons.jsx"
import classNames from "classnames"
import TransactionUpdate from "../TransactionUpdate/TransactionUpdate.jsx"
import {useState} from "react"

const TransactionCard = ({id, date, amount, category, account}) => {
  const [isVisible, setVisible] = useState(false)

  return (
    <>
      <div
        className={styles.transactionCard}
        onClick={() => setVisible(true)}
      >
        <div className={styles.info}>
          <div className={styles.title}>
            <img src={getIconOne(category.icon)} className={styles.icon}/>
            {category.name}
          </div>
          <p className={styles.account}>{account.name}</p>
        </div>
        <p className={classNames(
          styles.amount,
          category.type === 'expenses' ? styles.red : styles.green
        )}>
          {category.type === 'expenses' ? '-' : '+'}{amount}
        </p>
      </div>
      <TransactionUpdate
        isVisible={isVisible}
        onClose={() => setVisible(false)}
        id={id}
        date={date}
        amount={amount}
        category={category}
        account={account}
      />
    </>
  )
}

export default TransactionCard