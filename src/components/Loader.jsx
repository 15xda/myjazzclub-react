export default function Loader() {
    return (
        <div onContextMenu={e => e.preventDefault()} className="fixed w-full h-full z-10 bg-black flex items-center justify-center flex-col gap-5">
            <img onDragStart={e => e.preventDefault()} className="invert" src="/misc/cat.gif" alt="" ></img>
            <span className="text-white text-lg">loading...</span>
        </div>
    )
    
}