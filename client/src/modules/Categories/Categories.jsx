import Layout from "@components/Layout/Layout.jsx"
import Title from "@components/UI/Title/Title.jsx"
import CategoryList from "./components/CategoryList/CategoryList.jsx"
import {useEffect} from "react"
import useCategoryStore from "./store/useCategoryStore.js"

const Categories = () => {
  const getCategories = useCategoryStore(state => state.getCategories)

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Layout>
      <Title>Категории</Title>
      <CategoryList />
    </Layout>
  )
}

export default Categories