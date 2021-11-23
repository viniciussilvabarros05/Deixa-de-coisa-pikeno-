import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export function PrivateRouter({ children, ...rest }) {

    const admin = useSelector(state => state.admin)

    return (<Route {...rest}
        render={({ Location }) =>
            admin.admin ? (children) : (<Redirect to={{ pathname: "/login", state: { from: Location } }}></Redirect>)

        }>

    </Route >)
}