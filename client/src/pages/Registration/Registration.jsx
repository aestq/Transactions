import TransactionsLogo from "@components/TransactionsLogo/TransactionsLogo"
import { useScreen } from "@hooks/useScreen"
import FormRegistration from "@modules/FormRegistration/FormRegistration"
import './Registration.scss'

const Registration = () => {
  const screen = useScreen()
  const variant = screen <= 770 ? 'md' : 'lg'

  return (
    <div className="registration">
      <TransactionsLogo variant={variant} />
      <FormRegistration />
    </div>
  )
}
 
export default Registration