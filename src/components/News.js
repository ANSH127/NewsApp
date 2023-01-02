// rce
import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import Navbar from './Navbar';
import InfiniteScroll from "react-infinite-scroll-component";

// import {Link} from 'react-router-dom';

export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general'
        
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    capitalfirstletter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1)
    }

    constructor(props){
        super(props);
        console.log("hello i am a constructor from news component")
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0,
            search:false
        }
        document.title=`${this.capitalfirstletter(this.props.category)} - NewsMonkey`;
    }
    async UpdateNews(){
        if (this.count) {
             console.log('page length'+this.state.page)

            console.log("count")
            let url=`https://newsapi.org/v2/everything?q=${this.inpval}&apiKey=a30a50bf99c249e1a721dd957caf55a8&page=${this.state.page}&pagesize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data= await fetch(url)
            let parsedData=await data.json()
            // console.log(parsedData);
            this.setState({
                articles:parsedData.articles,
                loading:false
            })

        }
        else{
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a30a50bf99c249e1a721dd957caf55a8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        
        this.setState({loading:true})
        let data= await fetch(url)
        let parsedData=await data.json()
        // console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            loading:false,
            totalResults:parsedData.totalResults
        })}


    }
    async componentDidMount(){
        
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a30a50bf99c249e1a721dd957caf55a8&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})

        let data= await fetch(url)
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
        // we can also call the function update news but for understandig purpsose didn't call it
    }

    handlePrevClick= async()=>{
        console.log("previous")
        await this.setState({
            page:this.state.page-1
        })
        this.UpdateNews()

    }
    handleNextClick= async()=>{

        console.log("next")

        // console.log(parsedData);
        await this.setState({
            page:this.state.page+1
        })
        this.UpdateNews();
        }
     count=false;
     inpval=''
     getInputValue=async()=>{
         this.count=true
         let inputVal = document.getElementById("inputId").value;
         console.log(inputVal)
         document.getElementById("heading").innerHTML='NewsMonkey-Top Headlines Related to '+this.capitalfirstletter(inputVal)
        this.inpval=inputVal
        // this.setState({search:true})
        console.log(this.props.pageSize)
        console.log('page length'+this.state.page)
        
        let url=`https://newsapi.org/v2/everything?q=${inputVal}&apiKey=a30a50bf99c249e1a721dd957caf55a8&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true})

        let data= await fetch(url)
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false,page:1})

        

    }
    fetchMoreData = async() => {
        if (this.count) {
            await this.setState({
                page:this.state.page+1
            })
            let url=`https://newsapi.org/v2/everything?q=${this.inpval}&apiKey=a30a50bf99c249e1a721dd957caf55a8&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data= await fetch(url)
            let parsedData=await data.json()
            // console.log(parsedData);
            
        console.log(parsedData);
        console.log(this.state.articles.length)
        console.log(this.state.totalResults)
            this.setState({
                articles:this.state.articles.concat(parsedData.articles),
                loading:false,
                totalResults:parsedData.totalResults
            })

        }
        else{    
        
        await this.setState({
            page:this.state.page+1
        })
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a30a50bf99c249e1a721dd957caf55a8&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        
        this.setState({loading:true})
        let data= await fetch(url)
        let parsedData=await data.json()
        console.log(parsedData);
        console.log(this.state.articles.length)
        console.log(this.state.totalResults)

        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            loading:false,
            totalResults:parsedData.totalResults
        })}
      };
    

    
  render() {
    return (
        <>
        <Navbar searchengine={<form className="d-flex" role="search">

<input className="form-control me-2" type="search" id='inputId' placeholder="Search"  aria-label="Search" autoComplete="off"/>
<button className="btn btn-outline-light"  type="button" onClick={this.getInputValue}>Search</button>
</form>
}/>
      
      
        <h1 className='text-center' style={{margin:'30px'}} id='heading'>NewsMonkey-Top {this.capitalfirstletter(this.props.category)} Headlines</h1>
        {this.state.loading &&<Spinner/>}
       

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        
        <div className="container my-1">
        
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" >
            <Newsitem  title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage}
            newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        

        })}
        {!this.state.loading&&this.state.totalResults<=0 && <h1 className='text-center'>NO RESULT</h1>}
        </div>
         </div>

        </InfiniteScroll>

        {/* {!this.state.loading&&this.state.totalResults>0 && <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>  &larr;	Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;	</button>

            
        </div>} */}
        
      </>
    )
  }
}

export default News