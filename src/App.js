// import logo from './logo.svg';
import './App.css';
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
// import Navbar from './components/Navbar';
import News from './components/News';
import {
	BrowserRouter as Router,
	Routes,
	Route
	// Link
} from 'react-router-dom';


export default class App extends Component {
  state=({
    progress:0
  })
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  
  render() {
    return (
      <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
        
      />
      <div>
        {/* <Navbar/> */}
        
        <Routes>
         <Route exact path="/" element={<News  setprogress={this.setProgress} key="general"  pageSize={9} country='in' category="general"/>} />
         <Route exact path="/business" element={<News  setprogress={this.setProgress} key="business"  pageSize={9} country='in' category="business"/>} />
         <Route exact path="/entertainment" element={<News  setprogress={this.setProgress} key='entertainment'  pageSize={9} country='in' category="entertainment"/>} />
         <Route exact path="/general" element={<News  setprogress={this.setProgress}  key='general' pageSize={9} country='in' category="general"/>} />
         <Route exact path="/health" element={<News  setprogress={this.setProgress}  key='health' pageSize={9} country='in' category="health"/>} />
        <Route exact path="/science" element={<News  setprogress={this.setProgress} key='science'  pageSize={9} country='in' category="science"/>} />
         <Route exact path="/sports" element={<News  setprogress={this.setProgress} key='sports'  pageSize={9} country='in' category="sports"/>} />
         <Route exact path="/technology" element={<News  setprogress={this.setProgress}  key='technology' pageSize={9} country='in' category="technology"/>} />

      </Routes>
      </div>
      </Router>
    )
  }
}
