
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../../_metronic/helpers'
import {User} from '../../core/_models'

type Props = {
  user: User
}

const UserInfoCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <a href='#'>
        {(
          <div className='symbol-label'>
            <img src={toAbsoluteUrl(`/media/${user.imageUrl ? user.imageUrl : 'avatars/blank.png'}`)} alt={user.firstName + ' ' + user.lastName} className='w-100' />
          </div>
        )}
      </a>
    </div>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {user.firstName + ' ' + user.lastName}
      </a>
      <span>{user.email}</span>
    </div>
  </div>
)

export {UserInfoCell}
