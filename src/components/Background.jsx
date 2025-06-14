import { useRecoilValue } from "recoil"
import { backgroundState } from "../recoil/atoms"


const Background = () => {

    const backgroundImage = useRecoilValue(backgroundState)
    return (
        <div className='absolute inset-0 -z-50'>
            <img className='h-full w-full object-cover' src={'/bkgs/' + backgroundImage} alt="" />
        </div>
    )
}

export default Background
