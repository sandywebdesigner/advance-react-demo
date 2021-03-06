import React from 'react';
// import axios from 'axios';

import ArticleList from './ArticleList';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import pickBy from 'lodash.pickBy';


class App extends React.Component {
  static childContextTypes = {
    store: PropTypes.object,
  };

  getChildContext() {
    return {
      store: this.props.store
    };
  }
  state = this.props.store.getState();
  onStoreChange = () => {
    this.setState(this.props.store.getState());
  }
  componentDidMount() {
    this.subscriptionId = this.props.subscribe(this.onStoreChange);
  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }
  render() { 
    let { articles, searchTerm } = this.state;
    if(searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchTerm) ||
          value.body.match(searchTerm);
      });

    }
    return ( 
      <div>
        <SearchBar doSearch={this.props.store.setSearchTerm} />
        <ArticleList 
          articles={articles}
          store={this.props.store}
        />
      </div>
    );
  }
}
 
export default App;