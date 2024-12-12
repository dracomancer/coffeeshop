import React from 'react';
import { Carousel } from 'react-bootstrap'; // Ensure this is correct and matches the installed package

const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/1.jpeg" // Path to your first image
          alt="Delicious Coffee 1"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Welcome to Coffee Bliss</h3>
          <p>Serving the finest coffee since 2023.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/2.jpeg" // Path to your second image
          alt="Delicious Coffee 2"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Our Best Sellers</h3>
          <p>Try our top-selling drinks today!</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/3.jpeg" // Path to your third image
          alt="Delicious Coffee 3"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Freshly Brewed Daily</h3>
          <p>Always made with the finest beans.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/4.jpeg" // Path to your fourth image
          alt="Delicious Coffee 4"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Specialty Drinks</h3>
          <p>Explore our seasonal offerings!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
