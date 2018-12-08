import { client } from '../../utils/apoll-client';
import gql from 'graphql-tag';
import { AutoComplete } from 'antd';

const { Component } = wp.element;

class PostAutoComplete extends Component {
	state = {
		dataSource: [],
	};

	onSearchSelect = ( value, option ) => {
		this.props.onSelect( value, option );
	};

	handleSearch = ( value ) => {
		const searchResults = [];
		const query = gql`
		query SEARCH_POSTS($keyword:String) {
		  posts(where:{ search:$keyword }){
			nodes {
			  postId
			  title
			  date
			}
		  }
		}
		`;

		client.query( {
			query,
			variables: {
				keyword: value,
			},
		} ).then( results => {
			results.data.posts.nodes.map( ( node ) => {
				if ( node.title && node.postId ) {
					const option = {
						value: node.postId,
						text: node.title + ' ' + node.date,
					};
					searchResults.push( option );
					this.setState( {
						dataSource: ! searchResults ? [] : searchResults,
					} );
				}
			} );
			return searchResults;
		} );
	};

	render() {
		const { dataSource } = this.state;
		const { label, value } = this.props;
		return (
			<div>
				<label className={ 'components-base-control__' + label }>{ label }</label>
				<AutoComplete
					defaultValue={value}
					dataSource={ dataSource }
					style={ { width: '100%' } }
					onSelect={ this.onSearchSelect }
					onSearch={ this.handleSearch }
					placeholder="Select a Post"
				/>
			</div>
		);
	}
}

export default PostAutoComplete;
