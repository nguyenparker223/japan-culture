import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserStatusCell} from './UserStatusCell.tsx'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import {UserAuthoritiesCell} from "./UserAuthoritiesCell.tsx";
import Utils from "../../../../../common/Utils.tsx";
import {useIntl} from "react-intl";

const t = (id: string) => {
  return useIntl().formatMessage({ id })
};

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title={t('TABLE.COLUMN.NAME')} className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title={t('TABLE.COLUMN.ROLE')} className='min-w-125px' />,
    id: 'authorities',
    Cell: ({...props}) => <UserAuthoritiesCell user={props.data[props.row.index]} />
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title={t('TABLE.COLUMN.OWNER')} className='min-w-125px' />
    ),
    id: 'owner',
    Cell: ({...props}) => props.data[props.row.index].owner || useIntl().formatMessage({ id: 'DATA.NO_OWNER' }),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title={t('TABLE.COLUMN.STATUS')} className='min-w-90px' />
    ),
    id: 'state',
    Cell: ({...props}) => <UserStatusCell state={props.data[props.row.index].state} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title={t('TABLE.COLUMN.LANG')} className='min-w-90px' />
    ),
    accessor: 'langKey',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title={t('TABLE.COLUMN.CREATE_DATE')} className='min-w-125px' />
    ),
    id: 'createdDate',
    Cell: ({...props}) => Utils.formatDate(props.data[props.row.index].createdDate || ''),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title={t('TABLE.COLUMN.ACTIONS')} className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} userName={props.data[props.row.index].userName} />,
  },
]

export {usersColumns}
