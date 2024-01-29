"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import './MemeGallery.css';
import 'photoswipe/dist/photoswipe.css'

import { Gallery, Item } from 'react-photoswipe-gallery'

const MemeGallery = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.reddit.com/r/memes.json');
        const newMemes = response.data.data.children.map((post) => ({
          thumbnail: post.data.thumbnail,
          fullResolution: post.data.url,
          is_video:post.data.is_video,
        }));
        console.log(response.data.data.children);
        console.log(newMemes);
        setMemes((prevMemes) => [...prevMemes, ...newMemes]);
      } catch (error) {
        console.error('Error fetching memes:', error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div className='meme-gallery-container'>

    <Gallery>
      {memes.filter((meme) => !meme.is_video).map((meme)=>(
        <Item
        original={meme.fullResolution}
        thumbnail={meme.thumbnail}
        width="1024"
        height="768"
      >
        {({ ref, open }) => (
        <img ref={ref} onClick={open} src={meme.fullResolution} />)}

      </Item>
        ))}
    </Gallery>
    </div>
    
  );
};

export default MemeGallery;