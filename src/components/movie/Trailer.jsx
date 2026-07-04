

const Trailer = ({ trailer }) => {
  const test = 
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=([a-zA-Z0-9_]+)|youtu\.be\/([a-zA-Z\d_]+))(?:&.*)?$/gmi;
  const reg = new RegExp(".*?=s*(.*)");
  const split = reg.exec(trailer);
  const videoEmbed = `https://www.youtube.com/embed/${split[1]}`;
  
  return (
    <div className="youtube">
      <iframe
        width="640"
        height="360" 
        src={videoEmbed}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Trailer;
