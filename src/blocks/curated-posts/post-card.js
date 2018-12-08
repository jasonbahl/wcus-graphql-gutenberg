import { Button } from 'antd';
import gql from 'graphql-tag';

export const PostFragment = gql`
fragment PostFragment on Post {
  featuredImage {
	sourceUrl
  }
  id
  title
  link
}
`;

const NewsCard = ( { node: { id, title, featuredImage } } ) => (
	<div id={ id } >
		{ featuredImage && featuredImage.sourceUrl && <img alt="featured" src={ featuredImage.sourceUrl } /> }
		<h2>{ title }</h2>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
		<Button>Read More</Button>
	</div>
);

export default NewsCard;
