import hero from "../assets/hero.png"


const Hero = () => {
  return (
    <div>
        <img src={hero} className="w-full max-h-[600px] object-cover my-4  p-5 rounded-[40px] " />
    </div>
  )
}

export default Hero