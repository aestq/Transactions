import Layout from "@components/Layout/Layout.jsx"
import Title from "@components/UI/Title/Title.jsx"
import TransactionList from "./components/TransactionList/TransactionList.jsx"
import useTransactionStore from "./store/useTransactionStore.js"
import {useEffect} from "react"

const Transactions = () => {
  const updatePage = useTransactionStore(state => state.updatePage)

  useEffect(() => {
    updatePage(1)
  }, [])

  return (
    <Layout>
      <Title>Операции</Title>
      <TransactionList />
    </Layout>
  )
}

export default Transactions