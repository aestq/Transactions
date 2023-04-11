import styles from './CategoryList.module.scss'
import useCategoryStore from "../../store/useCategoryStore.js"
import CategoryCard from "../CategoryCard/CategoryCard.jsx"
import Button from "@components/UI/Button/Button.jsx"
import plus from '@assets/plus.png'
import CategoryCreate from "../CategoryCreate/CategoryCreate.jsx"
import {useState} from "react"
import Skeleton from "@components/UI/Skeleton/Skeleton.jsx";

const CategoryList = () => {
  const {categories, isLoadingAll} = useCategoryStore(state => ({categories: state.categories, isLoadingAll: state.isLoadingAll}))
  const [isVisible, setVisible] = useState(false)

  return (
    <>
      {!isLoadingAll ?
        <div className={styles.categoryList}>
          {categories.map(({name, icon, type, id}) =>
            <CategoryCard
              name={name}
              icon={icon}
              type={type}
              id={id}
              key={id}
            />
          )}
          <Button className={styles.create} onClick={() => setVisible(true)}>
            <img src={plus} className={styles.plus}/>
          </Button>
          <CategoryCreate
            isVisible={isVisible}
            onClose={() => setVisible(false)}
          />
        </div> :
        <Skeleton />
      }
    </>
  )
}

export default CategoryList