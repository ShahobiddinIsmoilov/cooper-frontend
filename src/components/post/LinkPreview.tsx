import { useQuery } from "@tanstack/react-query";
import { Image, Stack } from "@mantine/core";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import getLinkData from "../../services/getLinkData";

interface Props {
  link: string;
  title?: string;
  setTitle?: (title: string) => void;
  titleChanged?: boolean;
}

export default function LinkPreview({
  link,
  title,
  setTitle,
  titleChanged,
}: Props) {
  const { isPending, error, data } = useQuery({
    queryKey: [`${link}`],
    queryFn: () => getLinkData(link),
    retry: 1,
  });

  if (isPending)
    return <span className="text-cyan-400">Loading preview...</span>;

  if (error)
    return (
      <span className="text-red-400">Something seems wrong with your link</span>
    );

  try {
    const metadata = data.data;

    // get base url
    const parsedUrl = new URL(link);
    const baseUrl = parsedUrl.protocol + "//" + parsedUrl.host;

    let image, icon;

    // get url image
    if (metadata.image) {
      image = metadata.image;
      if (!image.startsWith("http") && !image.startsWith("//"))
        image = baseUrl + image;
    } else if (metadata.icon) {
      icon = metadata.icon;
      if (!icon.startsWith("http")) icon = baseUrl + icon;
      image = icon;
    }

    // set the title of the post to the title of the page
    title === "" && !titleChanged && setTitle && setTitle(title);

    return (
      <div className="mt-2">
        <Link
          to={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center rounded-xl overflow-hidden bg-dark-700 max-h-[150px] hover:bg-dark-600 border border-white border-opacity-25"
        >
          {image ? (
            <Image
              src={image}
              fallbackSrc={baseUrl + "/favicon.ico"}
              className="bg-dark-850 w-[150px] h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px]"
            />
          ) : (
            <div className="flex justify-center items-center bg-dark-850 w-[150px] h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px]">
              <FaExternalLinkAlt size={40} />
            </div>
          )}
          <Stack gap={2} className="px-4 py-2 text-white">
            <p className="text-lg font-bold line-clamp-2">{metadata.title}</p>
            <p className="line-clamp-2">{metadata.description}</p>
            <p className="flex items-center gap-1 opacity-75">
              <FaLink size={14} />
              <span className="line-clamp-1">{baseUrl}</span>
              <FaExternalLinkAlt size={14} />
            </p>
          </Stack>
        </Link>
      </div>
    );
  } catch (error) {
    return (
      <span className="text-red-400">
        Something went wrong. Please try again
      </span>
    );
  }
}
