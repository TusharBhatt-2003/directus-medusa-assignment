import Description from "./Description";
import Heading from "./Heading";
import Subtitle from "./Subtitle";

interface HeadingDescriptionProps {
  subtitle: string;
  heading: string;
  desc: string;
  className: string;
}

export default function HeadingDescription({
  subtitle,
  heading,
  desc,
  className = "",
}: HeadingDescriptionProps) {
  return (
    <div className={className}>
      <Subtitle subtitle={subtitle} />
      <Heading heading={heading} />
      <Description desc={desc} />
    </div>
  );
}
