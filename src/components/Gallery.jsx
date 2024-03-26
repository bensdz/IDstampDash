// eslint-disable-next-line import/no-extraneous-dependencies
import { Carousel } from 'react-carousel-minimal';
import PropTypes from 'prop-types';

export function Gallery({ imgs }) {
  let data;
  if (imgs.every((img) => img === undefined)) {
    data = [
      {
        image: '/assets/images/placeholder.png',
      },
    ];
  } else if (imgs[1] === null) {
    data = [
      {
        image: `http://localhost:3000/${String(imgs[0])?.substring(2)}`,
      },
      {
        image: `http://localhost:3000/${String(imgs[2])?.substring(2)}`,
      },
    ];
  } else {
    data = [
      {
        image: `http://localhost:3000/${String(imgs[0])?.substring(2)}`,
      },
      {
        image: `http://localhost:3000/${String(imgs[1])?.substring(2)}`,
      },
      {
        image: `http://localhost:3000/${String(imgs[2])?.substring(2)}`,
      },
    ];
  }

  return (
    <Carousel
      data={data}
      width="700px"
      height="400px"
      radius="10px"
      captionPosition="bottom"
      automatic={false}
      dots
      pauseIconColor="white"
      pauseIconSize="40px"
      slideBackgroundColor="darkgrey"
      slideImageFit="cover"
      thumbnails
      thumbnailWidth="50px"
      style={{
        textAlign: 'center',
        maxWidth: '850px',
        maxHeight: '500px',
        margin: '40px auto',
      }}
    />
  );
}

Gallery.propTypes = {
  imgs: PropTypes.array,
};
