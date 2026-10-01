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
import ArticleList from "./ArticleList";

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

const ArticleWrapper = () => {
  const intl = useIntl();
  const categories = [
    { id: "traditionalFoods", label: "Traditional Foods", description: "Sushi, Ramen, Tempura", href: "/nature/" },
    { id: "festivals", label: "Festivals", description: "Gion Matsuri, Tanabata, Awa Odori", href: "/nature/" },
    { id: "destinations", label: "Destinations", description: "Kyoto, Tokyo, Nara", href: "/nature/" }
  ];

  return (
    <>
      <div>
        <ArticleList
            title="Traditional Foods"
            sections={[
                {
                id: "traditionalFoods",
                label: "traditional Foods",
                articles: [
                    {
                        id: "sashimi",
                        category: "sashimi",
                        title: "What Is Sashimi? Japan’s Art of Raw Fish Explained",
                        href: "/food/sashimi/",
                        image: "/images/sashimi.jpg",
                        accessibility: "Train",
                    },
                    // ...
                ],
                },
                // add more sections (nature, history, ...) the same way
            ]}
        />
        <ArticleList
            title="Festivals"
            sections={[
                {
                id: "festivals",
                label: "festivals",
                articles: [
                    {
                        id: "sashimi",
                        category: "sashimi",
                        title: "What Is Sashimi? Japan’s Art of Raw Fish Explained",
                        href: "/food/sashimi/",
                        image: "/images/sashimi.jpg",
                        accessibility: "Train",
                    },
                    {
                        id: "sashimi",
                        category: "sashimi",
                        title: "What Is Sashimi? Japan’s Art of Raw Fish Explained",
                        href: "/food/sashimi/",
                        image: "/images/sashimi.jpg",
                        accessibility: "Train",
                    },
                    {
                        id: "sashimi",
                        category: "sashimi",
                        title: "What Is Sashimi? Japan’s Art of Raw Fish Explained",
                        href: "/food/sashimi/",
                        image: "/images/sashimi.jpg",
                        accessibility: "Train",
                    },
                    // ...
                ],
                },
                // add more sections (nature, history, ...) the same way
            ]}
        />
        <ArticleList
            title="Destinations"
            sections={[
                {
                    id: "destinations",
                    label: "Destinations",
                    articles: [
                        {
                            id: "sashimi",
                            category: "sashimi",
                            title: "What Is Sashimi? Japan’s Art of Raw Fish Explained",
                            href: "/food/sashimi/",
                            image: "/images/sashimi.jpg",
                            accessibility: "Train",
                        },
                        {
                            id: "sashimi",
                            category: "sashimi",
                            title: "What Is Sashimi? Japan’s Art of Raw Fish Explained",
                            href: "/food/sashimi/",
                            image: "/images/sashimi.jpg",
                            accessibility: "Train",
                        },
                        {
                            id: "sashimi",
                            category: "sashimi",
                            title: "What Is Sashimi? Japan’s Art of Raw Fish Explained",
                            href: "/food/sashimi/",
                            image: "/images/sashimi.jpg",
                            accessibility: "Train",
                        },
                        // ...
                    ],
                },
                // add more sections (nature, history, ...) the same way
            ]}
        />
      </div>
    </>
  );
};

export { ArticleWrapper };
