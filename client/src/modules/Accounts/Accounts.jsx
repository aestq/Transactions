import {useEffect} from 'react'
import AccountList from "./components/AccountList/AccountList.jsx"
import Title from "@components/UI/Title/Title.jsx"
import Layout from "@components/Layout/Layout.jsx"
import useAccountStore from "./store/useAccountStore.js"

const Accounts = () => {
  const getAccounts = useAccountStore(state => state.getAccounts)

  useEffect(() => {
    getAccounts()
  }, [])

  return (
    <Layout>
      <Title>Счёта</Title>
      <AccountList />
    </Layout>
  )
}

export default Accounts