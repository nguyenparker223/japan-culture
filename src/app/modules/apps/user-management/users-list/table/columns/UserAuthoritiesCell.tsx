import {FC} from 'react'
import {User} from '../../core/_models'

type Props = {
  user: User
}

const UserAuthoritiesCell: FC<Props> = ({user}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
        {user.authorities?.map(a => {
          return (
            <div key={a} className='badge badge-light fw-bolder mt-1'>
              {a}
            </div>
          )
        })}
    </div>
  </div>
)

export {UserAuthoritiesCell}
