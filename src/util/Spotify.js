let accessToken = '';
let PlayListID = '';
const clientID = '28d661c91f234ffaa400f7a2a730402c';
const redirectURI = 'jammingTesting.surge.sh'
let currentAccessToker = accessToken;
let userId = '';
const header = {
    Authorization : `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}`
}


const Spotify = {

  getAccessToken(){
    if(accessToken !== null){
      return accessToken}
      else{
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        accessToken = accessTokenMatch;
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        let expireTime = expiresInMatch;
        window.setTimeout(() => accessToken = accessTokenMatch,expireTime* 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      }
  },

  Search(term){
  return  fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
    {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response =>{
        return response.json()
      }).then(jsonResponse=>{
          if(jsonResponse.track){
              return jsonResponse.track.map(track=> ({
                id : track.id,
                Name : track.name,
                Artist: track.artists[0].name,
                Album : track.album.name,
                URI : track.uri,
          }));}else return ([]);
    })},

  check(playListName,TrackURIs){
    if(this.state.track.find((savedTracks)=> savedTracks.name === playListName), this.state.track.find((savedTracks)=> savedTracks.URI === TrackURIs)){
      return console.log('Checked');
    } else{return;};
  },

  SpotifyUsername(){
    return fetch('https://api.spotify.com/v1/me',
  {
    headers: header}
  ).then(response =>{
    return response.json()
  }).then(jsonResponse =>{
    if(jsonResponse.id){
      userId = jsonResponse.id
    }else{return}})
  },

  NewPlayList(){
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
      headers: {
        'Authorization': (header.Authorization),
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: {
        name: 'PlayList'
      }
    }).then(response =>{
      if(response.ok){
        return response.json();
      }throw new Error('Request Failed!')
    },networkError => {
      console.log(networkError.message)
    }).then(jsonResponse =>{
    if(jsonResponse.id){
      PlayListID = jsonResponse.id;
    }else{return;}})
  }



}










export default Spotify;
