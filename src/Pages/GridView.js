import './GridView.css';
import AttestedPanCard from '../Assets/AttestedPanCard.jpeg';
import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import gridCarouselStore from '../Stores/gridCarouselStores';






function GridView() {
    let textInput = React.createRef();
    const [images, setImages] = useState([]);
    const [originalImages, setOriginalImages] = useState([]);
    const [page, setPages] = useState(1);
    
    useEffect(() => {
       
        getdata();
    }, [page]);

    useEffect(() => {
        if(Object.keys(originalImages).length!==0)
        openUrl()
    },[originalImages])

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

    async function getdata() {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9ee016ef6a6f7b354c4c6041b1edd96e&text=landscape&format=json&nojsoncallback=1&per_page=20&page=${page}&extras = original_format&privacy_filter = 1`)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                setImages(json);
            });
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

    const handleIncrement = () => {
        
        setPages(prevCount => prevCount + 1);
      
      };
      const handleDecrement = () => {
        
        setPages(prevCount => prevCount - 1);
        
      };

      const goToPage = (e) => {
            if(textInput.current.value){
                console.log(textInput.current.value)
                if(parseInt(textInput.current.value)<=images.photos.pages){
                    setPages(parseInt(textInput.current.value));
                }
            }
      }
 
    let urlArr = [];
    if (Object.keys(images).length > 0 && urlArr.length ===0) {
        images.photos.photo.forEach((ph,index) => {
            const photoObj = {
                index:index,
                photoId:ph.id,
                url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
                title: ph.title
            };
            urlArr.push(photoObj);
            
        });
        console.log(urlArr);
        return (


            <div className="gridImages">
                <div className="btnSlideShow"><Button style={{ visibility: 'visible', borderRadius: 0, backgroundColor: '#f1001c', minWidth: 200, color: '#FFFFFF', padding: '5px 20px', fontFamily: 'Sans-serif', fontSize: 11, textTransform: 'none' }} endIcon={<SlideshowIcon style={{ fontSize: '25px', marginRight: '-5px' }} />} onClick ={()=>gridCarouselStore.changeToCarousel(page)}>
                    View SlideShow
                </Button></div>
                <div className="gridView">
                    
                        <Grid container spacing={3} justifyContent="center"
                            alignItems="center" style={{ backgroundColor: 'lightgrey', margin: '20' }}>
                                
                            {Object.keys(images).length>0?urlArr.map((data,id) => (   
                            <Grid item xs={3} key={id}>
                                <img style = {{cursor:'pointer'}}onClick = {() => gridCarouselStore.getIndex(data.index,page)} src = {`${data.url}_q.jpg`} title ={data.title} alt="No Image" width="200" ></img>
                                <Button style={{ borderRadius: 0, backgroundColor: '#f1001c', minWidth: 200, color: '#FFFFFF', marginTop: -60, padding: '5px 20px', fontFamily: 'Sans-serif', fontSize: 11, textTransform: 'none' }} startIcon={<ArrowCircleDownIcon style={{ fontSize: '25px', marginRight: '-5px' }} />} onClick = {() => getOriginal(data.photoId)}>
                                    Download Original
                                </Button>
                            </Grid>
                             )
                             ):<CircularProgress />}
                        </Grid>
                   
                </div>
                <div className="pageButton"><span>Showing page {(images.length !==0||Object.keys(images).length!==0)?images.photos.page:1} of  {(images.length !==0||Object.keys(images).length!==0)?images.photos.pages:1} </span>
                    <div className="changePageBtn">
                        <Button disabled ={page===1?true:false} style={{ borderRadius: 0, visibility: 'visible', backgroundColor: '#f1001c', color: '#FFFFFF', padding: '0px 20px', marginRight: 10, fontFamily: 'Sans-serif', fontSize: 10, textTransform: 'none' }} startIcon={<ArrowRightAltIcon style={{ fontSize: '30px', transform: 'rotate(-180deg)', marginRight: '-10px' }} />} onClick ={handleDecrement}>
                            Previous Page
                        </Button>
                        <Button disabled ={page===images.photos.pages?true:false}   style={{ borderRadius: 0, visibility: 'visible', backgroundColor: '#f1001c', color: '#FFFFFF', padding: '0px 20px', fontFamily: 'Sans-serif', fontSize: 10, textTransform: 'none' }} endIcon={<ArrowRightAltIcon style={{ fontSize: '30px', marginLeft: '-10px' }} />} onClick ={handleIncrement}>
                            Next Page
                        </Button>
                    </div>
                </div>
                <div className="goToBtn">Go to Page  <input ref = {textInput} type ="number" min = "1" style ={{width:'60px' ,padding:'5px 10px',margin:'0 10px 0 10px'}}></input><Button   style={{ borderRadius: 0, visibility: 'visible', backgroundColor: '#f1001c', color: '#FFFFFF', padding: '5px 20px', fontFamily: 'Sans-serif', fontSize: 12, textTransform: 'none' }} onClick ={goToPage}>
                            Go
                        </Button></div>
    
            </div>
        );
    }
    else{
        return(
        <div></div>
        );
    }

    



      
    
    

 



  

}
    export default GridView;
