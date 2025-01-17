import { Route,Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import LoginPage from "../src/pages/LoginPage";
import SignUpPage from "../src/pages/SignUpPage";
import NotFoundPage from "../src/pages/NotFoundPage";
import TransactionPage from "../src/pages/TransictionPage";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@apollo/client";
import Header from "./components/ui/Header";
import { Navigate } from "react-router-dom";
function App() {
	const { loading, data } = useQuery(GET_AUTHENTICATED_USER);
	


	if (loading) return null;

	return (
		<>
			{data?.authUser && <Header />}
			<Routes>
				<Route path='/' element={data.authUser ? <HomePage /> : <Navigate to='/login' />} />
				<Route path='/login' element={!data.authUser ? <LoginPage /> : <Navigate to='/' />} />
				<Route path='/signup' element={!data.authUser ? <SignUpPage /> : <Navigate to='/' />} />
				<Route
					path='/transaction/:id'
					element={data.authUser ? <TransactionPage /> : <Navigate to='/login' />}
				/>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Toaster />
		</>
	);

}
export default App;