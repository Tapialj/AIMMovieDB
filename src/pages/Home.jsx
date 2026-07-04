import RandomsSection from "/components/RandomsSection";


const Home = () => {


  return (
    <>
      <main className="home">
        <h1>Welcome to the AIM Movie Database!</h1>
        <RandomsSection type="movies" />
        <RandomsSection type="actors" /> 
        <RandomsSection type="directors" />
      </main>
    </>
  );
};

export default Home;
