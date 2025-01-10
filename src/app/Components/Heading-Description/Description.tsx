interface DescProps {
  desc: string; // Prop for the heading text
}
export default function Description({ desc }: DescProps) {
  return <div className="text-[#737373] w-full">{desc}</div>;
}
