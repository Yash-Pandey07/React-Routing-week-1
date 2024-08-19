//Lazy Loading & Routing
// import { useState, useEffect , lazy } from 'react'
// import './App.css'
// import React, { Suspense } from 'react';
// import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
// //import { Dashboard } from './components/Dashboard'  //Lazy Loading
// const Dashboard = lazy(() => import('./components/Dashboard'));   //React.lazy
// //import { Landing } from './components/Landing'
// const Landing = lazy(() => import('./components/Landing'));       //React.lazy or lazy if imported from React

// // Suspense Wrapper: The Routes component, which contains the lazy-loaded Dashboard and Landing components, is wrapped inside a Suspense component. This Suspense component has a fallback prop, which is a UI element (like a loading spinner or a simple "Loading..." message) that is displayed while the lazy-loaded component is being fetched.

// // Lazy Loading: React.lazy is used to lazy load the Dashboard and Landing components. This will load these components only when the corresponding route is accessed, improving the initial load time.


// function App() {
//   const [count, setCount] = useState(0)
//   // const navigate = useNavigate();    //Can't use it outside BrowerRouter
//   //   The error occurs because useNavigate must be used inside a component that is rendered within a   Router (like BrowserRouter). If useNavigate is used outside the context of a Router, React will throw the error you're seeing.

//   // To fix this issue, you need to ensure that your App component is wrapped in a BrowserRouter before any other components, including where you call useNavigate. 
//   useEffect(() => {
//     console.log('Navigated to Home Page');
//   }, []); // Empty dependency array means this runs only on mount

//   return (
//     <div>
//       <div style={{ background: "black", color: "white" }}>
//         Hi this is the topbar!

//         {/* <button onClick={() => {
//         //  window.location.href = "/";
//             navigate("/");
//         }}>Landing page</button>

//         <button onClick={() => {
//         //  window.location.href = "/dashboard";
//             navigate("/dashboard");
//         }}>Dashboard page</button> */}
//       </div>
//       <BrowserRouter>
//         <Suspense fallback={<div>Loading...</div>}>
//           <Appbar />
//           <Routes>
//             {/* replacing with lazt loading */}
//             <Route path="/dashboard" element={<Dashboard />} />
//             {/* <Dashboard /> */}
//             <Route path="/" element={<Landing />} />
//             {/* <Landing /> */}
//           </Routes>
//         </Suspense>
//       </BrowserRouter>
//     </div>
//   )
// }

// function Appbar() {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <button onClick={() => navigate('/')}>
//         Landing page
//       </button>
//       <button onClick={() => navigate('/dashboard')}>
//         Dashboard page
//       </button>
//     </div>
//   );
// }

// export default App

// -------------------------------------------------------------------
//PROP DRILLING 
// import { useState, useEffect , lazy } from 'react'
// import './App.css'
// import React, { Suspense } from 'react';

// function App() {
//   const [count, setCount] = useState(0);
//   const userData = { name: 'John', age: 30 };
// //   return <ComponentA userData={userData} />;

//   return (
//     <div>
//       <h1>PROP DRILLING </h1>
//       <Count count={count}  setCount={setCount}/>
//       {/* <Buttons count={count} setCount={setCount}/>    now passing this line to Count function */}
//       <ComponentA userData={userData} />
//     </div>
//   )
// }

// function Count({count , setCount}) {
//   return <div>
//     {count}
//     {/* PROP Drilling now the setCount part into count  */}
//     <Buttons count={count} setCount={setCount}/>
//   </div>
// }

// function Buttons({count, setCount}) {
//   return <div>
//     <button onClick ={ () => {
//       setCount(count+1)
//     }} >Increase </button>

// <button onClick ={ () => {
//       setCount(count-1)
// }} >Decrease </button>

//   </div>
// }

// //Example of Prop Drilling:
// //  App
// //  └── ComponentA
// //  └── ComponentB
// //       └── ComponentC

// // function App() {
// //   const userData = { name: 'John', age: 30 };
// //   return <ComponentA userData={userData} />;
// // }
// // If you need to pass some data (let's say userData) from App to ComponentC, you would have to pass it through ComponentA and ComponentB even if these components don't need that data.

// function ComponentA({ userData }) {
//   return <ComponentB userData={userData} />;
// }

// function ComponentB({ userData }) {
//   return <ComponentC userData={userData} />;
// }

// function ComponentC({ userData }) {
//   return (
//     <div>
//       <p>Name: {userData.name}</p>
//       <p>Age: {userData.age}</p>
//     </div>
//   );
// }

// export default App

// -------------------------------------------------------------------

//CONTEXT API
//The Context API in React is a powerful feature that allows you to manage global state in a React application without having to pass props manually through each level of your component tree. It's especially useful when you have data or state that needs to be accessible by many components at different nesting levels.

import React, { useContext, useState } from 'react';
import { CountContext } from './context';

function App() {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        height: '100vh', // Ensures the background covers the entire viewport height
        padding: '20px',
      }}
    >
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: theme === 'light' ? '#ddd' : '#555', // Button background color
          color: theme === 'light' ? '#000' : '#fff', // Button text color
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          borderRadius: '5px',
          marginBottom: '20px', // Adds space below the button
        }}
      >
        Toggle Theme
      </button>
      <h1>Welcome to My Themed Page!</h1>
      <p>The theme is currently {theme}</p>
      {/* <Count count={count} setCount={setCount} /> */}
      {/* <Count setCount={setCount} />  */}
      {/* Context API */}
      <CountContext.Provider value={count}>
        <Count count={count} setCount={setCount} />
      </CountContext.Provider>

    </div>
  );
}

function Count({ setCount }) {
  return <div>
    {/* PROP Drilling now the setCount part into count  */}
    {/* <CountRenderer count={count} /> */}
    <CountRenderer />
    <Buttons setCount={setCount} />
  </div>
}

function CountRenderer({ setCount }) {
  const count = useContext(CountContext);
  return <div>
    {count}
  </div>
}
function Buttons({ setCount }) {
  const count = useContext(CountContext);
  return <div>
    <button onClick={() => {
      setCount(count + 1)
    }} >Increase </button>

    <button onClick={() => {
      setCount(count - 1)
    }} >Decrease </button>

  </div>
}

export default App;
