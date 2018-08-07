import React from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import SearchBar from '../SearchBar/SearchBar'
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        searchResult : [{}],
        playlistName : '',
        playlistTracks: [{}],
      };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);

    };

  addTrack(newTrack){
    if(this.state.playlistTracks.find((playlistTracks) => playlistTracks.id === newTrack.id )){
      return;
    }
    else{ this.setState( {playlistTracks : newTrack} )}
  };

  savePlayList(){
    Spotify.NewPlayList();
    this.setState({playlistName : 'New Playlist'});
  };

  search(e){
    const searchTerm = e.target.value;
    Spotify.search(searchTerm);
  };

  updatePlaylistName(name){
    this.setState({playlistName : `${name}`});
  }

  removeTrack(track){
    const newTracks = this.state.playlistTracks.filter(savedTracks => savedTracks.id !== track.id)
    this.setState({playlistTracks : newTracks });
  };



  render(){
        return(
          <div>
              <h1>
              JA<span className="highlight">mmm</span>ING
              </h1>
              <div className="App">
                  <SearchBar onSearch={this.search} />
                  <div className="App-playlist">
                  < SearchResults searchResult={this.state.searchResult} onAdd={this.addTrack()}/>
                  <PlayList onSave= {this.savePlayList} Name={this.state.playlistName} PlayListTracks={this.state.playlistTracks} onRemove={this.removeTrack()} onNameChange={this.updatePlaylistName()}/>
                  </div>
              </div>
          </div>)};};

export default App;
