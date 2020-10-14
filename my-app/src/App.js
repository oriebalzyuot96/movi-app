
import React, { useState } from 'react'
import axios from 'axios'

import Search from './component/Search'
import Results from './component/Results'
import Popup from './component/Popup'

function App() {
  const [state, setState] = useState({
    s: "",//search query
    results: [],
    selected: {} //empty object relating to our object 
  });

  // const apiurl =" http://www.omdbapi.com/?i=tt3896198&apikey=dffc7b9b"

  const apiurl = "http://www.omdbapi.com/?apikey=dffc7b9b";

  const search = (e) => {
    //listen when clck enter in kybored
    if (e.key === "Enter") {
    //  in axios passed data api and s => search query 
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
      //  console.log(data)
        //store this data in variable called result
        let results = data.Search;
        //update state result 

        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }
  
  //to handle when input value is change
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
    //console.log(state.s);
  }
//to geta information about specific movie depends the id of this movie 
  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie </h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App
