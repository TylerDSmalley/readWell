import './App.css';

function App() {
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/book/:id' element={<Post />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
