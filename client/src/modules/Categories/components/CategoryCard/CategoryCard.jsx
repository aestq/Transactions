import styles from './CategoryCard.module.scss'
import {getIconOne} from "@/helpers/getIcons.jsx"
import CategoryUpdate from "../CategoryCreate/CategoryCreate.jsx"
import {useState} from "react"

const CategoryCard = ({name, type, icon, id}) => {
  const [isVisible, setVisible] = useState(false)

  return (
    <>
      <div
        className={styles.categoryCard}
        onClick={() => setVisible(true)}
      >
        <div className={styles.title}>
          <img
            src={getIconOne(icon)}
            className={styles.icon}
          />
          <p className={styles.name}>{name}</p>
        </div>
      </div>
      <CategoryUpdate
        isVisible={isVisible}
        onClose={() => setVisible(false)}
        name={name}
        type={type}
        icon={icon}
        id={id}
      />
    </>
  )
}

export default CategoryCard