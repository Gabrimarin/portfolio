import config from "@/sanity.config";
import { createClient } from "next-sanity";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

const SanityImage = ({ asset }) => {
  const client = createClient(config);
  const imageProps = useNextSanityImage(client, asset);

  if (!imageProps) return null;

  return (
    <Image
      {...imageProps}
      layout="responsive"
      sizes="(max-width: 800px) 100vw, 800px"
    />
  );
};

export const myPortableTextComponents = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />;
    },
  },
};
