// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useState, useRef } from 'react';

const ZoomableImage = ({ src, alt, zoomArea }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e) => {
    if (isHovered && imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const zoomX = (x / width) * 100;
      const zoomY = (y / height) * 100;
      imageRef.current.style.transformOrigin = `${zoomX}% ${zoomY}%`;
    }
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '100%',
        height: 'auto',
        cursor: isHovered ? 'zoom-in' : 'default',
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={{
          width: 'auto',
          maxHeight: '400px',
          transition: 'transform 0.3s ease-in-out',
          transform: isHovered ? `scale(${zoomArea})` : 'none',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    </Box>
  );
};

ZoomableImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  zoomArea: PropTypes.number,
};

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

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <ZoomableImage
        src={data[currentIndex].image}
        alt={`Product Image ${currentIndex + 1}`}
        zoomArea={2}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px',
          overflow: 'auto',
        }}
      >
        {data.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleThumbnailClick(index)}
            sx={{
              cursor: 'pointer',
              marginRight: '8px',
              border: index === currentIndex ? '2px solid black' : 'none',
            }}
          >
            <img
              src={item.image}
              alt={`Thumbnail ${index + 1}`}
              style={{ width: 'auto', height: '60px' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

Gallery.propTypes = {
  imgs: PropTypes.array,
};
