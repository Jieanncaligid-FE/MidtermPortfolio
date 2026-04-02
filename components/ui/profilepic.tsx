import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
export function AspectRatioPortrait() {
  return (
    <div className="w-full max-w-[15rem]  ">
      <AspectRatio ratio={9 / 16} className="bg-muted rounded-lg ">
        <Image
          src="/profile.jpg"
          alt="Photo"
          fill
          className="rounded-lg object-cover  "
        />
      </AspectRatio>
    </div>
  )
}

export { Image }
