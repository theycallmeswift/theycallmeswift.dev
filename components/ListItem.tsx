import Link from "components/Link";
import NextImage from "next/future/image";

type ListItemProps = {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  link: string;
};

const ListItem = ({
  title,
  subtitle,
  description,
  image,
  link = "#",
}: ListItemProps) => {
  return (
    <div className="duration-500 hover:scale-[1.02] relative bg-gray-100 rounded-lg not-prose overflow-hidden p-3 flex flex-col sm:flex-row sm:space-x-3 items-center my-5">
      <div className="h-48 w-full sm:h-24 sm:w-24 relative shrink-0 mb-3">
        <NextImage src={image} fill alt={title} className="object-contain" />
      </div>
      <div className="space-y-2">
        <div>
          <h3 className="font-sans font-bold">
            <Link href={link} className="cover">
              {title}
            </Link>
          </h3>
          <h4 className="font-sans text-sm text-gray-500">{subtitle}</h4>
        </div>
        <p className="prose-sm">{description}</p>
      </div>
    </div>
  );
};

export default ListItem;
