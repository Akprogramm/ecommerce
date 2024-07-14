import  sanityClient  from "@sanity/client";
import imageURlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: 'luaxv2ev',
    dataset: 'production',
    apiVersion: '2024-07-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});  

const builder = imageURlBuilder(client);

export const urlFor = (source) => builder.image(source);