import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";



function App() {
  const [notes, setNotes] = useState([]);


  useEffect(() => {

    fetch("http://localhost:5000/notes")
      .then(res => res.json())
      .then(data => setNotes(data));


  }, []);

  /*
  1. here there will be a function named handleSearch
  to handle search by query, and it will be passed as props to header
  
  */

  const handleSearch = (event) => {
    event.preventDefault()
    const searchText = (event.target.searchText.value);

    console.log(searchText);
    fetch(`http://localhost:5000/notes?user_name=${searchText}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setNotes(data)
      })


  }








  /*2. here there will be a function named handleDelete
  to delete a note, and it will be passed as props to NoteCard that will be triggered using delete button.
   */

  const handleDelete = (id) => {
    // console.log(id);
    // fetch(`http://localhost:5000/note?_id=${id}`, {
    //   method: 'delete'
    // })

  }









  /*
  3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
  */







  /*
  4.  there will be a function named handlePost
  to post data to backend, and it will be passed as props to InputFrom.
  */

  const handlePost = (event) => {
    event.preventDefault()
    const user_name = event.target.user_name.value
    const text = (event.target.text.value);

    fetch('http://localhost:5000/note', {
      method: 'POST',
      body: JSON.stringify({ text, user_name }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));


  }





  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <InputForm handlePost={handlePost} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard
            handleDelete={handleDelete}
            note={note}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
