import Navbar from "../components/Navbar";

export default function Layout({children}){
    return (
        <main className="fint-work-sans">
            <Navbar/>
            {children}
        </main>
    )
}