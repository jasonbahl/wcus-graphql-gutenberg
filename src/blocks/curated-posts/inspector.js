import PostAutoComplete from '../../components/post-autocomplete';

const { InspectorControls } = wp.editor;
const { Component, Fragment } = wp.element;
const {
	PanelBody,
	TextControl,
} = wp.components;
const { __ } = wp.i18n;

class Inspector extends Component {
	render() {
		const { setAttributes, attributes: { sectionTitle, selectedPostIds } } = this.props;
		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<TextControl
						label={ __( 'Title' ) }
						help={ __( 'The title of the curated posts section' ) }
						value={ sectionTitle }
						onChange={ ( value ) => setAttributes( { sectionTitle: value } ) }
					/>
					<Fragment>
						{
							[ ...Array( 3 ) ].map( ( x, i ) => <PostAutoComplete
								label="Select Post"
								value={ selectedPostIds && selectedPostIds[ i ] && selectedPostIds[ i ].name ? selectedPostIds[ i ].name : null }
								onSelect={ ( post, option ) => {
									let newSelectedPosts = {};
									newSelectedPosts[ i ] = {
										key: option.key,
										name: option.props.children,
									};
									newSelectedPosts = { ...selectedPostIds, ...newSelectedPosts };
									setAttributes( { selectedPostIds: newSelectedPosts } );
								} }
								{ ...this.props }
							/>,
							)
						}
					</Fragment>

				</PanelBody>
			</InspectorControls>
		);
	}
}

export default Inspector;
