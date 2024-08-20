import { useSession } from "next-auth/react";

export const IntroComponent: React.FC = () => {
  const { data: session } = useSession();


  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="text-[20px] lg:text-[50px] p-5  bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent ">Hello <span className="font-bold">{session?.user?.name}</span>,<br /> What do you want to build?</h1>
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-5 w-full h-full text-white">
        <div className="w-[100px] h-[100px] flex flex-col justify-center items-center rounded-lg bg-[#1b1b1b]">
          <div className="text-xl">🖌️</div>
          <p className="text-center mt-2 text-[10px]">Create an illustration for a bakery</p>
        </div>
        <div className="w-[100px] h-[100px] flex flex-col justify-center items-center rounded-lg bg-[#1b1b1b]">
          <div className="text-xl">🎓</div>
          <p className="text-center mt-2 text-[10px]">Overcome procrastination</p>
        </div>
        <div className="w-[100px] h-[100px] flex flex-col justify-center items-center rounded-lg bg-[#1b1b1b]">
          <div className="text-xl">💡</div>
          <p className="text-center mt-2 text-[10px]">Activities to make friends in new city</p>
        </div>
        <div className="w-[100px] h-[100px] flex flex-col justify-center items-center rounded-lg bg-[#1b1b1b]">
          <div className="text-xl">🎁</div>
          <p className="text-center mt-2 text-[10px]">Fun fact about the Roman Empire</p>
        </div>
      </div>

    </div>
  );
};
