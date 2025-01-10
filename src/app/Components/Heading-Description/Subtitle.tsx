interface SubtitleProps {
  subtitle: string; // Prop for the heading text
}
export default function Subtitle({ subtitle }: SubtitleProps) {
  return (
    <div className="text-[#107C11] w-full uppercase font-semibold text-xs">
      {subtitle}
    </div>
  );
}
