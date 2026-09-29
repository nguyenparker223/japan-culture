import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";
import Constants from "../../../../app/modules/common/Constants.tsx";

export function AsideMenuMain() {
  const intl = useIntl();

  return (
    <>
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Menu
          </span>
        </div>
      </div>
      {/* <AsideMenuItemWithSub to="/apps/chat" title="Chat" icon="message-text-2">
        <AsideMenuItem
          to="/apps/chat/private-chat"
          title="Private Chat"
          hasBullet={true}
        />
        <AsideMenuItem
          to="/apps/chat/group-chat"
          title="Group Chart"
          hasBullet={true}
        />
        <AsideMenuItem
          to="/apps/chat/drawer-chat"
          title="Drawer Chart"
          hasBullet={true}
        />
      </AsideMenuItemWithSub> */}
      <AsideMenuItem to="order-list" icon="shield-tick" title="Quản lý đơn" />
      <AsideMenuItem
        to="item-list"
        icon="shield-tick"
        title="Quản lý mặt hàng"
      />
      <AsideMenuItem
        to="customer-list"
        icon="shield-tick"
        title="Quản lý khách hàng"
      />
      <AsideMenuItem to="dashboard" icon="shield-tick" title="dashboard" />
      <div className="menu-item">
        <div className="menu-content">
          <div className="separator mx-1 my-4"></div>
        </div>
      </div>
    </>
  );
}
