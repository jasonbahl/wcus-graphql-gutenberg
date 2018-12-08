import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { client } from '../../utils/apoll-client';
import gql from 'graphql-tag';
import { Row, Col } from 'antd';

import NewsCard, { PostFragment } from './post-card';
import Inspector from './inspector';

const { registerBlockType } = wp.blocks;

const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;



const CURATED_POSTS_QUERY = gql`
query GET_CURATED_POSTS( $postIds:[ID] ){
	posts(first: 3, where: {in: $postIds, orderby:{field:IN, order:ASC}}) {
		nodes {
			...PostFragment
		}
	}
}
${ PostFragment }
`;

class EditCuratedPosts extends Component {
	render() {
		const { isSelected, attributes: { sectionTitle, selectedPostIds = {} } } = this.props;

		const postIds = selectedPostIds && Object.keys( selectedPostIds ).map( key => {
			return parseInt( selectedPostIds[ key ].key );
		} );

		const variables = {
			first: 3,
			postIds: postIds ? postIds : null,
		};

		return [
			isSelected && ( <Inspector { ...this.props } /> ),
			<ApolloProvider client={ client } fe>
				<Query
					query={ CURATED_POSTS_QUERY }
					variables={ variables }
					fetchPolicy="cache-and-network"
					shouldInvalidatePreviousData={ ( nextVariables, previousVariables ) =>
						nextVariables.postIds !== previousVariables.postIds
					}
				>
					{ ( { loading, error, data } ) => {
						if ( loading && ! data.posts ) {
							return 'loading...';
						}
						if ( error ) {
							return 'error!';
						}
						return (
							<Fragment>
								<h1>{ sectionTitle ? sectionTitle : 'Curated Posts' }</h1>
								<Row
									gutter={ 16 }
									type="flex"
									justify="space-around"
									align="top"
									className="latest-news__slider"
								>
									{
										data.posts.nodes.map(
											node => <Col key={ node.id } span={ 8 }><NewsCard key={ node.id }
												node={ node } /></Col>,
										)
									}
								</Row>
							</Fragment>
						);
					} }
				</Query>
			</ApolloProvider>,
		];
	}
}

registerBlockType( 'wcus/curated-posts', {
	title: __( 'WCUS - Curated Posts' ),
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'wcus — CGB Block' ),
		__( 'Curated Posts' ),
		__( 'wordcamp' ),
	],
	attributes: {
		selectedPostIds: {
			type: 'object',
		},
		sectionTitle: {
			type: 'string',
		},
	},
	edit: EditCuratedPosts,
	save: ( props ) => {
		return null;
	},
} );

