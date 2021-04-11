import React, {Component} from "react"
import logo from "./logo.png";
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>TV Wizard</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Recommended shows for you (Trending):</p>
          <div id="movieDisplays">

          </div>
        </header>
      </div>
    );
  }

  //https://stackoverflow.com/questions/51411447/using-chrome-api-with-react-js
  //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  componentDidMount(){
    //  Start guest session
    var guestSessionId = "";
    fetch("https://api.themoviedb.org/3/authentication/guest_session/new?api_key=6e5f220634aecf81f7fd066faad83f8b")
      .then(response => response.json())
      .then(id => {
        console.log("guestSessionId=", id["guest_session_id"], "expiresAt=", id["expires_at"])
        guestSessionId = id["guest_session_id"];

        // Load movie database
        var movieDb = {};
        fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/tv?api_key=6e5f220634aecf81f7fd066faad83f8b&language=en-US&sort_by=created_at.asc`)
          .then(response => response.json())
          .then(db => {
            console.log("movieDb=", db)
            movieDb = db;
          })
      })

      var movies = []
      var movieDisplays = []

      // Trending
      fetch("https://api.themoviedb.org/3/trending/tv/day?api_key=6e5f220634aecf81f7fd066faad83f8b")
        .then(response => response.json())
        .then(list => {
          movies = list.results
          console.log("list=",list)

          let movieDisplayElement = document.getElementById("movieDisplays")
          for (var movie of movies){
            let md = new MovieDisplay(movie)
            movieDisplays.push(md)

            //https://www.w3schools.com/jsref/met_node_appendchild.asp
            let movieDisplay = md.display
            console.log(md, movieDisplay)
            movieDisplayElement.appendChild(movieDisplay)
          }
          console.log(movieDisplayElement)
          console.log(movieDisplays)
        })
  }
}

class MovieDisplay {
  movie = {};
  display = {};
  constructor(movie){
    this.movie = movie
    this.display = (
      <div>
        <img src={this.movie["backdrop_path"]}></img>
        <p>{this.movie["name"]}</p>
        <p>{this.movie["popularity"]}</p>
      </div>
    )
  }
}

export default App;
