import MemeGallery from "@/Components/MemeGallery";
import Head from "next/head";
import './page.css'

const Home = () => {
  return (
    <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap" rel="stylesheet"/>
    </Head>
    <div className='home'>
      <h1 >Meme Gallery</h1>
      <div >
        <MemeGallery />
      </div>
    </div>
    </>
  );
};

export default Home;