// Include React
var React = require("react");
var axios = require('axios');
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

// Here we include all of the sub-components
var Scrape = require("./children/Scrape");
var Playlist = require("./children/Playlist");
// var History = require("./children/Extra");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  //  All the scrapes are getting dumped into scrapedArticles array: 

  getInitialState: function () {
    return {
      scrapedArticles: [], playlist: []
    };
  },

  // When the page loads, we run the helpers.getArticle function
  // this function populates the scrapedArticles variable with the scrapes in the database
  // since savedArticles is a "state" variable, it will render in the first child, called "Scrape"

  componentDidMount: function () {


    // this gets the scrapes from the database

    helpers.getArticle().then(function (response) {

      console.log("The scrapes: ", response.data);

      //if nothing is in the database, then scrape -- 

      if ((response.data).length < 1) {
        helpers.scrape().then(function (response) {
          console.log("the scrapes: ", response.data);
          this.setState({ scrapedArticles: response.data }.bind(this));
        }.bind(this));
      }

      // update "scrapedArticles" variable with scrape data
      this.setState({ scrapedArticles: response.data });
      //
      this.getSavedArticles();
    }.bind(this));
  },

  // this will run through the scrapedArticles, 
  // find those that are "saved" and put them in the 
  // "playlist" variable.. 

  getSavedArticles: function () {
    var prePlaylist = [];
    for (var i = 0; i < this.state.scrapedArticles.length; i++) {
      if (this.state.scrapedArticles[i].saved) {
        console.log(this.state.scrapedArticles[i].saved)

        prePlaylist.push(this.state.scrapedArticles[i])
        this.setState({ playlist: prePlaylist })
      }
    }
    console.log(this.state.playlist);
  },

  // this will change the "saved" database property to true

  savedArticles: function (result) {
    console.log("This will need to be saved: " + result.artist + "whose id is: " + result._id)
    helpers.postArticle(result._id);
  },

  // this will change the "saved" database property to false

  deletedArticle: function (result) {
    console.log("delete!");
    console.log("This will need to be un-saved: " + result.artist + "whose id is: " + result._id)
    helpers.deleteArticle(result._id);
    // shouldn't this refresh the saved articles? 

  },

  componentDidUpdate: function () {

    // What happens if something updates? 

  },


  setTerm: function () {
    // This function allows childrens to update the parent.

  },

  // Here we render the function

  render: function () {

    const style = { width: '70%' };
    const width = { width: '15%' };
    const body = { 'background-color': 'yellow', border: '1px solid black', float: 'right' }

    return (

      <div>


        {/* NAV BAR */}

        <nav>
          <div>
            <a href="#" class="brand-logo"><h2>Good Tunes</h2></a>
            <ul className="nav nav-tabs" >
              <Link to="/scrape"><li className="active"> <a href="#">Home</a></li></Link>
              <li><a href="#">By Genre</a></li>
              <li><a href="#">By Critic</a></li>
              <li><a href="#">By Rating</a></li>
              <Link to="/playlist"><li><a href="#">Saved Tracks</a></li></Link>
              <li><a href="#">Logout</a></li>
            </ul>
          </div>
        </nav>
        <div>


          {/* SCRAPED SONGS -  */}
          {/* scrapedArticles contain scraped articles / savedArticles contain articles that the user wants saved for his playlist */}

          <div className="panel panel-default">
             <div className="panel-heading">
               <h3 className="panel-title text-center">Scraped Playlist</h3>
             </div>
            <div className="panel-body text-center">

              {/* <Scrape scrape={this.state.scrapedArticles} savedArticles={this.savedArticles} />*/}

              {/* YOU CAN INSERT THE NEXT CHILD HERE, POPULATING WITH THE API CALLS? */}
              {this.props.children}
              {/*
     <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title text-center">Saved Playlist</h3>
                </div>
                <div className="panel-body text-center">

                  <Playlist playlist={this.state.playlist} deletedArticle={this.deletedArticle} />
                </div>
              </div>
  */}
            </div>
          </div>
        </div>

        <footer>

        </footer>

      </div>

    )
  }
});

// Export the component back for use in other files
module.exports = Main;
