// eslint-disable-next-line import/no-extraneous-dependencies
import { Carousel } from 'react-carousel-minimal';

export function Gallery() {
  const data = [
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg',
    },
    {
      image:
        'https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg',
    },
  ];

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
