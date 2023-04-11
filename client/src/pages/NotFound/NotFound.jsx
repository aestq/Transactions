import { Link } from 'react-router-dom'
import './NotFound.scss'

const NotFound = () => {
  return (
    <div className='notFound'>
      <p className='status'>404</p>
      <p className='message'>Не найдено</p>
      <Link className='back' to='/'>На главную</Link>
    </div>
  )
}
 
export default NotFound;