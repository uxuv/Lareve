import AdFile from "../Design/AdFile.jpg";

function Hero() {
  return (
    <div className="px-3">
      <img
        className="object-center w-full h-auto rounded-2xl sm:h-96 sm:object-cover"
        src={AdFile}
        alt="ad"
      />
    </div>
  );
}

export default Hero;
