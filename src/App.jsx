
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


//New Pages
import NewHome from './pages/Home/NewHome';
import About from './pages/About/About';
import NewLogin from './pages/Login/NewLogin';
import Search from './pages/Search/Search';
import NewPost from './pages/Post/NewPost';
import NewDashboard from './pages/Dashboard/NewDashboard';
import NewRegister from './pages/Register/NewRegister';
import NewCreatePost from './pages/CreatePost/NewCreatePost';
import NewEditPost from './pages/EditPost/NewEditPost';

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
                                <Route path="/post/:id" element={<NewPost />} />
                                <Route path="/login" element={user ? <Navigate to="/" /> : <NewLogin />} />
                                <Route path="/register" element={user ? <Navigate to="/" /> : <NewRegister />} />
                                <Route path="/posts/create" element={user ? <NewCreatePost /> : <Navigate to="/" />} />
                                <Route path="/post/edit/:id" element={user ? <NewEditPost /> : <Navigate to="/" />} />
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
