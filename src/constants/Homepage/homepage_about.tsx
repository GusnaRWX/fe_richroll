import Image from "next/image";
import { ICONS } from "@/configs";

const about = [
  {
    icon: <Image src={ICONS.LION} alt="kayaroll" />,
    title: "Founded in 2020",
    description: "We’re here to offer a Fresh Approach",
  },
  {
    icon: <Image src={ICONS.CITY} alt="kayaroll" />,
    title: "Singaporean Company",
    description: "We’re fully Homegrown",
  },
  {
    icon: <Image src={ICONS.SHOP} alt="kayaroll" />,
    title: "SMEs Friendly",
    description: "We’re focussed on empowering SMEs and Startups",
  },
];

export default about;
