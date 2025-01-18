interface HeadingProps {
  heading: string;
}

export default function Heading({ heading }: HeadingProps) {
  return (
    <div className="w-full font-semibold uppercase text-2xl ">{heading}</div>
  );
}
