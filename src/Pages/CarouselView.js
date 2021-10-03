import React, { useEffect, useState, useCallback } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import gridCarouselStore from '../Stores/gridCarouselStores';
import AppsIcon from '@mui/icons-material/Apps';
import { DisabledByDefault } from '@mui/icons-material';


function CarouselView() {

  const [autoPlay, setAutoPlay] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPages] = useState(gridCarouselStore.gridPage);
  const [carouselPage, setCarouselPage] = useState(gridCarouselStore.carouselPage);
  const [pageIndex, setPageIndex] = useState(gridCarouselStore.index);
  async function getdata() {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9ee016ef6a6f7b354c4c6041b1edd96e&text=landscape&format=json&nojsoncallback=1&per_page=20&page=${page}&extras = original_format&privacy_filter = 1`)
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        setImages(json);
      });
  }

  useEffect(() => {

    getdata();
  }, [page]);
  const handleIncrement = () => {
    setImages([]);
    setPages(prevCount => prevCount + 1);
    

  };

  const handleCarouselPageIncrement = () => {
    setCarouselPage(prevCount => prevCount + 1);
  }
  const handleCarouselPageDecrement = () => {
    setCarouselPage(prevCount => prevCount - 1);
  }
  const handleDecrement = () => {
    if (page > 0) {
      setImages([]);
      setPages(prevCount => prevCount - 1);
    }

  };

  console.log(carouselPage);

  let urlArr = [];
  if (Object.keys(images).length > 0 && urlArr.length === 0) {
    images.photos.photo.forEach((ph, index) => {
      const photoObj = {
        index: index,
        photoId: ph.id,
        url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
        title: ph.title
      };
      urlArr.push(photoObj);

    });
    console.log(urlArr);
  }




  return (
    <div className="gridImages">
      <div className="btnSlideShow"><Button style={{ visibility: 'visible', borderRadius: 0, backgroundColor: '#f1001c', minWidth: 200, color: '#FFFFFF', padding: '5px 20px', fontFamily: 'Sans-serif', fontSize: 11, textTransform: 'none' }} endIcon={<AppsIcon style={{ fontSize: '25px', marginRight: '-5px' }} />} onClick={() => gridCarouselStore.changeToGrid(page)}>
        View Grid
      </Button></div>
      <div className="gridView">
        <Carousel autoPlay={autoPlay} index={pageIndex} navButtonsAlwaysVisible next={(number) => {handleCarouselPageIncrement(); if (number % 20 === 0) { handleIncrement() } }} prev={(number) => { if (number === 0) { handleDecrement() } }}>

          {
            urlArr.map((data, i) => <div style={{ display: 'flex', aligItems: 'center', justifyContent: 'center', minHeight: "300px", maxHeight: "300px" }}> <img key={i} src={`${data.url}_z.jpg`} title={data.title} alt="No Image" width="500px" ></img></div>)
          }

        </Carousel>
        <div className="pageButton"><Button style={{ borderRadius: 0, visibility: 'visible', backgroundColor: '#f1001c', color: '#FFFFFF', padding: '0px 20px', marginRight: 10, fontFamily: 'Sans-serif', fontSize: 10, textTransform: 'none' }} >
          Previous Page
        </Button>
          <div className="changePageBtn">
            <span>Showing page {(images.length !== 0 || Object.keys(images).length !== 0) ? (pageIndex + carouselPage) : 1} of  {(images.length !== 0 || Object.keys(images).length !== 0) ? images.photos.total : 1} </span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CarouselView;
