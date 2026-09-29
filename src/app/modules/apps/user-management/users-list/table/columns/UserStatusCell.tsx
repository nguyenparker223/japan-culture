import {FC} from 'react'

type Props = {
  state?: boolean
}

const UserStatusCell: FC<Props> = ({state}) => (
  <div className={state ? 'badge badge-light-success fw-bolder' : 'badge badge-light-danger fw-bolder'}>{state ? 'Active' : 'Inactive'}</div>
)

export {UserStatusCell}
