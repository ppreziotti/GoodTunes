// Include React
var React = require("react");
var Rating = require('react-rating');
var Link = require("react-router").Link;

import styles from "./styles-children.css";

// Creating the Results component
var Playlist = React.createClass({
  // Here we render the function

  getInitialState: function () {
    return {

    }
  },
  componentWillReceiveProps: function (nextProps) {

  },

  // this is to play a song

  handleClick2: function (result, e) {
    console.log("play clicked for: " + result.title);
    this.props.playSong(result);
  },

  // this will delete song from saved playlist

  handleClick3: function (result, e) {
    console.log("delete!");
    this.props.deletedArticle(result);
  },

 handleClick4: function (rate, search) {
    // this.props.callbackFn(key)
    var rating = [];
    console.log(rate._id); // this is the id
    console.log(search);  // this is the rating.. 
    rating.push(rate._id);
    rating.push(search);
    this.props.rating(rating);
  },

  //  var articles = this.props.results.map(function (article, index) {

  render: function () {

    if (!this.props.isLoggedIn) {

      return (
          <div className="container login">
          <h2>You must be logged in to view your personal playlist!</h2>
          <Link to="/login"><button className="btn btn-nav"> Login</button></Link>
          <Link to="/signup"><button className="btn btn-nav">Sign Up </button></Link>
        </div>
      );

    }

    else if (this.props.isLoggedIn) {
   
      return (
        <div >
          <h2>Welcome, {this.props.email}!</h2>
      
          {this.props.playlist.map(function (search, i) {
            var boundClick3 = this.handleClick3.bind(this, search);
            var boundClick2 = this.handleClick2.bind(this, search);
            var boundClick4 = this.handleClick4.bind(this, search);
            return (
              <div className="well playlist-well">
                 <p className="critic"> 
                  <a href={search.sourceLink} target="blank">
                    <img className="logo" src={search.source}/> 
                  </a>
                  </p>
                <h4 className="artist"> <strong> {search.artist}</strong></h4>
                 <p className="title">  {search.title} </p>
                <button className="btn delete" key={"b" + i} onClick={boundClick3}> delete </button>
                 <button className="btn play"  key={"a" + i} onClick={boundClick2}> play </button>
                <div className="rating"> 
                  <Rating key={search.id} start={0} step={1} stop={5} initialRate={search.rating}
                    empty="glyphicon glyphicon-star-empty"
                    full="glyphicon glyphicon-star"
                    onClick={boundClick4} />
                         <p> votes:{search.votes} </p> 
                </div>
              </div>
            )
          }.bind(this)
          )
          }
        </div>
    )

  }

  }
})

// Export the component back for use in other files
module.exports = Playlist;
