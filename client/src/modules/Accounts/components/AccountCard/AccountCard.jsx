import { useState } from 'react';
import styles from './AccountCard.module.scss'
import AccountUpdate from "../AccountUpdate/AccountUpdate.jsx";

const AccountCard = ({ name, balance, id }) => {
  const [isVisible, setVisible] = useState(false)
  return (
    <>
      <div
        className={styles.accountCard}
        onClick={() => setVisible(true)}
      >
        <p className={styles.name}>{name}</p>
        <p className={styles.balance}>{balance}</p>
      </div>
      <AccountUpdate
        isVisible={isVisible}
        onClose={() => setVisible(false)}
        name={name}
        balance={balance}
        id={id}
      />
    </>
  )
}

export default AccountCard