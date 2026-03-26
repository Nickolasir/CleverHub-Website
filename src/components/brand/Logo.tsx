import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

/** CleverHub neural-sphere icon at the given pixel size. */
export function LogoIcon({ size = 32, className }: LogoProps) {
  return (
    <Image
      src="/images/cleverhub-icon.svg"
      alt="CleverHub"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
