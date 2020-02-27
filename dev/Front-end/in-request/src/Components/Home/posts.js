import React, { Component } from 'react';
import {fdb} from "../../firebase";

/* ---  THIS FILE CONTAINS ALL THE POSTS --- */
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_list: [],
      fdb: this.fdb
    }
  }
  componentDidMount() {
    let requests_collection = fdb.collection('requests');
    let all_requests = requests_collection.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const item = doc.data();
          this.setState({
               post_list: [...this.state.post_list, item],
          });
        });
      }).catch(err => {
        console.log('Error getting documents', err);
      });
  }
  render() {
      const {post_list} = this.state
      return (
        <ul>
          {post_list.map(post =>
            <li Key={post.id}>
              <a>{post.borrower} </a>
              <a>{post.content} </a>
            </li>
          )}
        </ul>
      );
  }
}

export default Posts;
