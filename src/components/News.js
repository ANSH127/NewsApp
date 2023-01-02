// rce
import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
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

    constructor(){
        super();
        console.log("hello i am a constructor from news component")
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        }
    }
    async UpdateNews(){
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c0667546873420b82299c18f30fee7d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data= await fetch(url)
        let parsedData=await data.json()
        // console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            loading:false
        })


    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c0667546873420b82299c18f30fee7d&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})

        let data= await fetch(url)
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
        // we can also call the function update news but for understandig purpsose didn't call it
    }

    handlePrevClick= async()=>{
        console.log("previous")
        this.setState({
            page:this.state.page-1
        })
        this.UpdateNews()

    }
    handleNextClick= async()=>{

        console.log("next")

        // console.log(parsedData);
        this.setState({
            page:this.state.page+1
        })
        this.UpdateNews();
        }

    
  render() {
    return (
      <div className="container my-1">
        <h1 className='text-center' style={{margin:'30px'}}>NewsMonkey- Top Headlines</h1>
        {this.state.loading &&<Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <Newsitem  title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage}
            newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        

        })}
        </div>
        {!this.state.loading && <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>  &larr;	Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;	</button>

            
        </div>}
        
      </div>
    )
  }
}

export default News