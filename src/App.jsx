
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//context
import { AuthProvider } from './context/AuthContext';

//Components
import NewNavbar from './components/Navbar/NewNavbar';
import Footer from './components/Footer/Footer';

//Pages
/* Olds
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
*/
import NewHome from './pages/Home/NewHome';
import About from './pages/About/About';
import NewLogin from './pages/Login/NewLogin';
import CreatePost from './pages/CreatePost/CreatePost';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';
import NewDashboard from './pages/Dashboard/NewDashboard';
import NewRegister from './pages/Register/NewRegister';

function App() {
    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();

    const loadingUser = user === undefined;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [auth]);

    if (loadingUser) {
        return <p>carregando...</p>;
    }

    return (
        <>
            <AuthProvider value={user}>
                <BrowserRouter>
                    <div className="container">
                        <div className="content-wrap">
                            <NewNavbar />
                            <Routes>
                                <Route path="/" element={<NewHome />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/post/:id" element={<Post />} />
                                <Route path="/login" element={user ? <Navigate to="/" /> : <NewLogin />} />
                                <Route path="/register" element={user ? <Navigate to="/" /> : <NewRegister />} />
                                <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/" />} />
                                <Route path="/post/edit/:id" element={user ? <EditPost /> : <Navigate to="/" />} />
                                <Route path="/dashboard" element={user ? <NewDashboard /> : <Navigate to="/" />} />
                                <Route path="/search" element={<Search />} />
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App
