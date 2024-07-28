import ladingimg from "../assets/landing.png";
import appdownloadimg from "../assets/appDownload.png";
import SearchBar from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const HomePage = () => {
  const navigate = useNavigate();

 
  const handleSubmit =  (inputValue ) => {
    if (inputValue === "") {
      toast.warning("Please enter a search term");
      return;
    } else {
      navigate(`/search-results/${inputValue}`);
    }
  };  
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32  rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-24 ">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar placeholder="Search by city or town" onSubmit={handleSubmit} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={ladingimg} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster !
          </span>
          <span>
            Download the Let's Eat App for faster ordering and personilised
            recommendatitons.
          </span>
          <img src={appdownloadimg} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
