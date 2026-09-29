import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import {
  ListsWidget1,
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget5,
  ListsWidget6,
  MixedWidget10,
  MixedWidget11,
  MixedWidget2,
  StatisticsWidget5,
  TablesWidget10,
  TablesWidget5,
} from "../../../_metronic/partials/widgets";
import FeaturedCarousel, { FeaturedItem } from "./FeaturedCarousel";

const HomePage = () => (
  <>
    {/* begin::Row */}
    <div className="row">
      <div className="col-xl-12" style={{ backgroundColor: "red" }}>
        abv
      </div>
    </div>

      
  </>
);

const HomeWrapper = () => {
  const intl = useIntl();
  const items: FeaturedItem[] = [
  {
    id: 1,
    title: "Starfall Odyssey",
    description: "Explore a hand-crafted galaxy, build your fleet, and decide who rules the stars.",
    poster: "/img/starfall.jpg",
    videoSrc: "/video/starfall.mp4",
    href: "/games/starfall",
  },
  {
    id: 2,
    title: "Starfall Odyssey 2",
    description: "Explore a hand-crafted galaxy, build your fleet, and decide who rules the stars.",
    poster: "/img/starfall.jpg",
    videoSrc: "/video/starfall.mp4",
    href: "/games/starfall",
  },
  // ...more items
];

  return (
    <>
      <div>
        <FeaturedCarousel items={items} mediaPosition="left" autoPlayInterval={8000} />
      </div>
    </>
  );
};

export { HomeWrapper };
