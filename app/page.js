import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
    <div className="flex justify-center flex-col items-center text-white h-[44vh] gap-4 px-5 md:px-0 text-xs md:text-base">
      <div className="font-bold md:text-5xl flex gap-2 md:gap-5 justify-center items-center text-3xl  ">Buy Me a Chai<span><img src="/tea.gif" className="invertImg" width={88} alt="" /></span></div>
      <p className="text-center md:text-left">
        A crowdfunding platform for Creaters (chai lovers). 
        </p>
        <p className="text-center md:text-left">
        Get funded by your fans and followers. Start now!
      </p>
      <div>
        <Link href={"/login"}>
      <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-blue-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-blue-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start</button></Link>
      <Link href={"/about"}>
      <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-blue-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-blue-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more</button></Link>
      </div>
      </div>
      
        <div className="bg-white h-1 opacity-10"></div>
      
   
      <div className="text-white container mx-auto pb-32 pt-14 px-10">
  <h2 className="text-3xl font-bold text-center mb-14">Your Fans can buy you a Chai</h2>
  <div className="flex gap-5 justify-around">
    <div className="item space-y-3 flex flex-col items-center justify-center">
      <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
      <p className="font-bold text-center">Fans want to help</p>
      <p className="text-center">Your fans are available to support you</p>
    </div>
    <div className="item space-y-3 flex flex-col items-center justify-center">
      <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
      <p className="font-bold text-center">Fans want to contribute</p>
      <p className="text-center">Your fans are willing to contribute financially</p>
    </div>
    <div className="item space-y-3 flex flex-col items-center justify-center">
      <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
      <p className="font-bold text-center">Fans want to collaborate</p>
      <p className="text-center">Your fans are ready to collaborate with you</p>
    </div>
  </div>
</div>
      <div className="bg-white h-1 opacity-10">
      </div>

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center ">
        <h2 className="text-3xl font-bold text-center mb-14 items-center">Follow on me</h2>
        {/* Responsive youtube embed  */}
        <div className="flex items-center justify-center w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          {/* <iframe className="w-full h-full" src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}

          <div class="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="light" data-type="HORIZONTAL" data-vanity="hedayat002" data-version="v1"><a class="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/hedayat002?trk=profile-badge"></a></div>
          </div>
      
      </div>
    </>
  );
}
