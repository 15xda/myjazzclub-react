const InteractionButton = ({ src, onClick }) => {
  return (
    <button
      className="w-6 h-6 bg-white border-1 border-black interaction-button-shadows cursor-pointer"
      onClick={onClick}
    >
      <img src={src} alt={`${src}`.split(".svg")[0]} />
    </button>
  );
};

export default InteractionButton;
