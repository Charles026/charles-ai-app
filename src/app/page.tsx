import Image from "next/image";
import styles from "../styles/home.module.css";
import Avatar from "../components/Avatar";
import Charles from "../components/Charles";
import Dribbble from "../components/icons/Dribbble";
import Instagram from "../components/icons/Instagram";
import Github from "../components/icons/Github";
import Weixin from "../components/icons/Weixin";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import Link from "next/link";
import { projects } from "../data/projects";
import ProjectCardList from "../components/ProjectCardList";

import Sparkles from "@/components/icons/Sparkles";
import ClientChatLauncher from "@/components/chat/ClientChatLauncher";

export default function Home() {
  return (
    <div className='container xl:px-12 lg:px-8  md:px-6  flex flex-col  mx-auto lg:pt-16 xl:flex-row '>
    <div className='mx-auto  w-auto mb-20 xl:w-1/2 xl:mr-8'>
      <div className='text-center top-16 xl:mr-8 xl:sticky xl:text-left xl:ml-0 relative'>

      <div className={styles.blurCircleGreen}></div>
      <div className={styles.blurCircleBlue}></div>

        <div className='flex flex-row justify-center xl:justify-start'>
        <Avatar src="/myphoto@2x.webp" alt="User Avatar" size={140} />
        </div>
        <div className='mt-8 '>
          <div className='animate-fade-in'>
            <Charles />
          </div>
          <div className='text-lg gap-4 leading-loose flex flex-col mt-4 animate-fade-in'>
            <p className='animate-fade-in'>
              AI Product Designer
            </p>
            <p className='animate-fade-in'>
              Currently @ Kingsoft Office KSUX Team.<br/>
              Designing WPS Lingxi & WPS AI product experiences.
              <br/>
              Core contributor of Kingsoft Office Design Systems.
            </p>
            <p className='animate-fade-in'>
              🧑🏻‍💻 I design and code.<br/>
              🐱 Living with 4 lovely cats.
            </p>
          </div>
          <div className={`${styles.iconWrapper} flex flex-row gap-5 justify-center xl:justify-start mt-4 animate-fade-in`}>
            <Link href="https://dribbble.com/mumumycat">
            <Dribbble />
            </Link>
            <Link href="https://www.instagram.com/bancs_pine">
            <Instagram />
            </Link>
            <Link href="https://github.com/Charles026">
            <Github />
            </Link>
            <Popover>
              <PopoverTrigger asChild> 
                <button className="hover:text-primary cursor-pointer">
                  <Weixin/>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <div className="flex flex-col items-center gap-2">
                  <Image 
                    src="/qrcode@2x.webp" 
                    alt='WeChat QR Code' 
                    width={200} 
                    height={200} 
                    loading="eager"
                    className="rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground">WeChat</p>
                </div>
              </PopoverContent>
            </Popover>

            <ClientChatLauncher>
              <Sparkles />
            </ClientChatLauncher>

            </div>
            
            {/* Footer info moved here */}
            <div className="flex flex-col gap-2 justify-center xl:justify-start mt-6 text-sm text-muted-foreground animate-fade-in">
              <p>Built with Next.js & ❤️ for Ahdai</p>
              <p>© {new Date().getFullYear()} Charles</p>
            </div>
        </div>
      
      </div>
    </div>
   
    <div className='container mx-auto px-6 mt-10 mb-20 xl:w-1/2 xl:mt-0'>
      <h1 className='text-xl mb-6 font-semibold  text-center xl:text-left' style={{color:"var(--tc-color-text-primary)"}}>Projects</h1>
      <ProjectCardList data={projects} />
    </div>

</div>
  );
}
