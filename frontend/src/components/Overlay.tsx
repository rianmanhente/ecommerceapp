import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    width: string;
    height: string
    bg: string
  }

function Overlay({children, bg, width, height} : ContainerProps) {

    return(
        <div className="bg-[rgba(0,0,0,0.6)] w-full h-full top-0 left-0 backdrop-blur-sm fixed flex justify-center items-center">
            <div className={`${bg} ${width} ${height} rounded-md`}>   
                {children}
            </div>
        </div>
    )
}


export default Overlay;