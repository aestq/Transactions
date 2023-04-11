import useAccountStore from "../../store/useAccountStore.js"
import styles from './AccountList.module.scss'
import AccountCard from "../AccountCard/AccountCard.jsx"
import plus from "@assets/plus.png"
import Button from "@components/UI/Button/Button.jsx"
import {useState} from "react";
import AccountCreate from "../AccountCreate/AccountCreate.jsx"
import Skeleton from "@components/UI/Skeleton/Skeleton.jsx";

const AccountList = () => {
  const [isVisible, setVisible] = useState(false)
  const {accounts, isLoadingAll} = useAccountStore(
    state => ({accounts: state.accounts, isLoadingAll: state.isLoadingAll})
  )


  return (
    <>
      {!isLoadingAll ?
        <div className={styles.accountsCards}>
          {accounts.length ?
            accounts.map(({id, name, balance}) =>
              <AccountCard
                id={id}
                name={name}
                balance={balance}
                key={id}
              />
            ) : <></>
          }
          <Button
            className={styles.create}
            onClick={() => setVisible(true)}
          >
            <img className={styles.createImg} src={plus} />
          </Button>
          <AccountCreate
            isVisible={isVisible}
            onClose={() => setVisible(false)}
          />
        </div> :
        <Skeleton />
      }
    </>
  )
}

export default AccountList