// dependencies
import Image from "next/image";

const Gallery = ({ gallery }) => {
  // create new gallery array
  const newGallery = [...gallery];

  return (
    <section className="container">
      <div className="grid grid-cols-2 imageshowCase">
        <Image src={newGallery[0]} alt="Property" width={500} height={400} />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
          {newGallery?.splice(1)?.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="property"
              width={240}
              height={100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
