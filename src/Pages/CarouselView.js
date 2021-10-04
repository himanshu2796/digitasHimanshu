import React, { useEffect, useState, useCallback } from 'react';
import  './CarouselView.css';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import gridCarouselStore from '../Stores/gridCarouselStores';
import AppsIcon from '@mui/icons-material/Apps';
import { DisabledByDefault } from '@mui/icons-material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'


function CarouselView() {

  const [autoPlay, setAutoPlay] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPages] = useState(gridCarouselStore.gridPage);
  const [carouselPage, setCarouselPage] = useState(gridCarouselStore.carouselPage);
  const [originalImages, setOriginalImages] = useState([]);
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
  useEffect(() => {
    if(Object.keys(originalImages).length!==0)
    openUrl()
},[originalImages]);
  const handleIncrement = () => {
    setImages([]);
    setPages(prevCount => prevCount + 1);
    

  };

  async function openUrl() {
    if(Object.keys(originalImages).length!==0){
        let farm = originalImages.photo.farm;
        let server = originalImages.photo.server;
        let id = originalImages.photo.id;
        let secret = originalImages.photo.originalsecret;
        let format = originalImages.photo.originalformat;
        let newPageUrl = '';
        if(secret){
        newPageUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_o.${format}`
        }
        else {
        newPageUrl = originalImages.photo.urls.url[0]['_content'];
        }
    window.open(newPageUrl, "_blank")
    }
}
  async function getOriginalUrl(photoId) {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=9ee016ef6a6f7b354c4c6041b1edd96e&photo_id=${photoId}&format=json&nojsoncallback=1`)
        .then((resp) => resp.json())
        .then((json) => {
            console.log(json);
            setOriginalImages(json);
        });
}
  const getOriginal = async (photoId) => {
    if(photoId){       
        await  getOriginalUrl(photoId);
    }

}

  const handleCarouselPageIncrement = () => {
    setCarouselPage(prevCount => prevCount + 1);
  }
  const handleCarouselPageDecrement = () => {
    if(carouselPage > 0)
    setCarouselPage(prevCount => prevCount - 1);
  }
  const handleDecrement = () => {
    if (page > 0) {
      setImages([]);
      setPages(prevCount => prevCount - 1);
    }

  };



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
    console.log(pageIndex+carouselPage);
  }




  return (
    <div className="carouselImages">
      <div className="btnSlideShow"><Button style={{ visibility: 'visible', borderRadius: 0, backgroundColor: '#f1001c', minWidth: 200, color: '#FFFFFF', padding: '5px 20px', fontFamily: 'Sans-serif', fontSize: 11, textTransform: 'none' }} endIcon={<AppsIcon style={{ fontSize: '25px', marginRight: '-5px' }} />} onClick={() => gridCarouselStore.changeToGrid(page)}>
        View Grid
      </Button></div>
      <div className="carouselView">
        <Carousel indicators = {autoPlay} autoPlay={autoPlay} index={pageIndex} navButtonsAlwaysVisible next={(number) => {handleCarouselPageIncrement(); if ((pageIndex+carouselPage)%20===0) { handleIncrement() } }} prev={(number) => {handleCarouselPageDecrement(); if (number === 0 || (pageIndex+carouselPage)%20===0 ) { handleDecrement() } }}>

          {
            urlArr.map((data, i) => <div key ={i} style={{ display: 'flex', aligItems: 'center', justifyContent: 'center', minHeight: "300px", maxHeight: "300px",backgroundColor:'lightgrey' }}> <img key={i} src={`${data.url}_z.jpg`} title={data.title} alt="No Image" width="500px" ></img></div>)
          }

        </Carousel>
        <div className="pageButton"><span>No Caption Available</span>
          <div className="changePageBtn">
            <span>Showing page {(images.length !== 0 || Object.keys(images).length !== 0) ? (pageIndex + carouselPage) : 1} of  {(images.length !== 0 || Object.keys(images).length !== 0) ? images.photos.total : 1} </span>
          </div>
        </div>
        <div className = "ownerName">
            <p>by Owner<span style = {{color:'red',textDecoration:'underline'}}>Name Not Available</span></p>
            <div className="downloadOriginal"><a style = {{color:'red',textDecoration:'underline',cursor:'pointer'}} onClick = {()=>getOriginal(images.photos.photo[((pageIndex+carouselPage-1)%20)].id)}> Download Original</a></div>
          </div>
      </div>
    </div>
  );
}


export default CarouselView;
