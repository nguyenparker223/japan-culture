import clsx from "clsx";
import { Link } from "react-router-dom";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { PageTitle, useLayout } from "../../core";
import { HeaderToolbar } from "./HeaderToolbar";
import { MenuInner } from "./MenuInner";
import { useIntl } from "react-intl";

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout();
  const { aside } = config;
  const intl = useIntl()
  return (
    <div
      id="kt_header"
      className={clsx(
        "header",
        classes.header.join(" "),
        "align-items-stretch"
      )}
      {...attributes.headerMenu}
    >
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "PAGE.TITLE" })}
      </PageTitle>
      <HeaderToolbar />
    </div>
  );
}
