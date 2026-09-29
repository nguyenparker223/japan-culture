import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { UsersListHeader } from "./components/header/UsersListHeader";
import { UsersTable } from "./table/UsersTable";
import { UserEditModal } from "./user-edit-modal/UserEditModal";
import { KTCard } from "../../../../../_metronic/helpers";
import { useAuth } from "../../../auth";
import { Navigate } from "react-router-dom";
import Constants from "../../../common/Constants.tsx";

const UsersList = () => {
  const { itemIdForUpdate } = useListView();
  const { currentUser } = useAuth();
  if (!currentUser?.authorities?.includes(Constants.ROLE_ADMIN)) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  );
};

const UsersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { UsersListWrapper };
