import React, { useEffect, useState, useCallback } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';


function CarouselView() {

  const [autoPlay,setAutoPlay] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(20);
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
}



  var items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!"
    },
    {
        name: "Random Name #2",
        description: "Hello World!"
    },
    {
      name: "Random Name #3",
      description: "Hello World!"
  }
]
    return (
        <Carousel autoPlay = {autoPlay} index = {pageIndex}>
          
            {
                urlArr.map( (data, i) =><div style = {{display: 'flex' , aligItems:'center',justifyContent:'center', maxHeight:"300px"}}> <img key = {i} src = {`${data.url}_z.jpg`} title ={data.title} alt="No Image" width="500px" ></img></div> )
            }

        </Carousel>
    );
  }

  function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}
  
  export default CarouselView;
  