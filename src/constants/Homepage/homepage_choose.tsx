import Image from "next/image";
import { ICONS } from "@/configs";

const choose = [
  {
    icon: <Image src={ICONS.HOMEPAGE_PC} alt="kayaroll" />,
    title: "Simple and Intuitive User Interface",
  },
  {
    icon: <Image src={ICONS.HOMEPAGE_INTEGRATED} alt="kayaroll" />,
    title: "RAS Integrated and Compliant",
  },
  {
    icon: <Image src={ICONS.HOMEPAGE_CS} alt="kayaroll" />,
    title: "Excellent Customer Support",
  },
];

export default choose;
