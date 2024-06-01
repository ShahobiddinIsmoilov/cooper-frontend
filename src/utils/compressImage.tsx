import imageCompression from "browser-image-compression";

export default async function compressImage(file: any) {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1400,
    useWebWorker: true,
  };
  try {
    const compressedBlob = await imageCompression(file, options);
    const compressedFile = new File([compressedBlob], compressedBlob.name);
    return compressedFile;
  } catch (error) {
    alert("Something went wrong during image processing");
  }
}
