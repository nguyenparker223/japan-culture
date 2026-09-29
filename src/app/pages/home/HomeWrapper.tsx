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
  return (
    <>
      <HomePage />
    </>
  );
};

export { HomeWrapper };
