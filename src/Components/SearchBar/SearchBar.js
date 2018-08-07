import React from 'react';
import './SearchBar.css';

class searchBar extends React.Component {
  constructor(props){
  super(props);
  
  this.state = {term: ' '};
  
  this.search= this.search.bind(this);
  this.handleTermChange = this.handleTermChange.bind(this);
    
  };
  
  handleTermChange(e){
    this.setState({term : e.target.value});
  };
  
  search(){
    this.props.onSearch(this.state.term)
  };
  
  render(){
    return(
      <div className="SearchBar">
          <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
          <a>SEARCH</a>
      </div>
    )
  };
};

export default searchBar;
