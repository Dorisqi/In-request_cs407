import React, { Component } from 'react';

/* ---  THIS FILE CONTAINS ALL THE POSTS --- */
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [{}]
    }
    this.loadData = this.loadData.bind(this)
  }
  ComponentDidMount() {
    this.loadData()
  }

  render() {
      return (
        <ul>
          {this.props.posts.map(function(post) {
            return <li key={post.title}> {post.description} - {post.borrower} </li>
          })}
        </ul>
      );
  }
}

export default Home;
