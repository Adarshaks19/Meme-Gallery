"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import './MemeGallery.css';
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

const MemeGallery = () => {
  const [memes, setMemes] = useState([]);
  const [after, setAfter] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://www.reddit.com/r/memes.json?after=${after}`);
      const newMemes = response.data.data.children.filter((post)=>!post.data.is_video && post.data.domain==="i.redd.it").map((post) => ({
        thumbnail: post.data.thumbnail,
        fullResolution: post.data.url,
      }));
      setMemes((prevMemes) => [...prevMemes, ...newMemes]);
      setAfter(response.data.data.after);
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
  };
  const handleScroll = () => {
    const scrollThreshold = 80;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - scrollThreshold
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [after]);

  

  return (
    <div className='meme-gallery-container'>
        <Gallery>
          {memes.map((meme)=>(
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