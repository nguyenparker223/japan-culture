import { ID, Response } from "../../../../../../_metronic/helpers";
import Constants from "../../../../common/Constants.tsx";
export type User = {
  id?: ID;
  userName?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  owner?: string;
  imageUrl?: string;
  email?: string;
  license?: string;
  state?: boolean;
  langKey?: string;
  authorities?: string[];
  last_login?: string;
  two_steps?: boolean;
  joined_day?: string;
  online?: boolean;
  createdDate?: string;
  initials?: {
    label: string;
    state: string;
  };
};

export type UsersQueryResponse = Response<Array<User>>;

export const initialUser: User = {
  imageUrl: "avatars/blank.png",
  license: "No License",
  authorities: [Constants.ROLE_USER],
  firstName: "",
  lastName: "",
  email: "",
  langKey: "en",
  state: true,
};
