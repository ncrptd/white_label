import Footer from "../components/Footer"
import Header from "../components/Header"
import { useAuth } from "../context/AuthContext"

function Home() {
    const { user } = useAuth()

    return (
        <div>
            <Header />
            <h1 className="font-bold text-2xl">Welcome {user?.name} </h1>
            <Footer />
        </div>
    )
}

export default Home