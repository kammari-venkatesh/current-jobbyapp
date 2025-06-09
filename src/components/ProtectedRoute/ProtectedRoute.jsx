import Cookies from "js-cookie"
import { Navigate } from "react-router"

const ProtectedRoute = ({children}) =>{
const jswToken = Cookies.get('jwt_token')
if(jswToken !== undefined){
    return children
}
else{
    return <Navigate to='/login' replace />
}

}
export default ProtectedRoute
