import {useState} from "react"
import Navigation from "@components/Navigation/Navigation"
import Accounts from "@modules/Accounts/Accounts"
import Categories from "@modules/Categories/Categories.jsx"
import Transactions from "@modules/Transactions/Transactions.jsx"
import Settings from "@modules/Settings/Settings"
import './Main.scss'

const Main = () => {
  const [tab, setTab] = useState(0)
  const tabs = [<Accounts/>, <Categories />, <Transactions />, <Settings/>]

  return (
    <main className="container">
      <div className="page">
        <Navigation tab={tab} setTab={setTab}/>
        {tabs[tab]}
      </div>
    </main>
  )
}

export default Main