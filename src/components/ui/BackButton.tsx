import { TriangleLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="/" className="text-sm flex items-center underline ml-4">
      <TriangleLeftIcon /> home
    </Link>
  );
}
