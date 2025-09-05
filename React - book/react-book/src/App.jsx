import "./App.css"
import List from "./components/list/List"
import Card from "./components/card/Card"
import Title from "./components/title/Title"
import { useState } from "react";



function App() {

  const [selectedBook, setSelectedBook] = useState(null);


  return (
    <>
    <div><Title></Title></div>

    <div className="container">  
    
    <List onBookClick={setSelectedBook}></List>
    <Card book={selectedBook}></Card>
    </div>
    




    </>
  )
}

export default App
