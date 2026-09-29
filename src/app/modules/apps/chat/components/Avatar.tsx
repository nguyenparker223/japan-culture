import {FC} from "react";
import {ConversationModel} from "../core/_models.ts";
import {toAbsoluteUrl} from "../../../../../_metronic/helpers";
import Utils from "../../../common/Utils.tsx";

type Props = {
  c?: ConversationModel,
  fromUser: boolean
}

const Avatar: FC<Props> = ({c, fromUser = false}) => {
  const extractBgClass = (userName: any): string => {
    return Utils.getColorClassByString(userName).replace('text', 'bg')
  }
  const extractTxtClass = (userName: any): string => {
    return Utils.getColorClassByString(userName).replace('light', '')
  }

  if (fromUser) {
    return c?.avatar ?
      (
        <div className='symbol symbol-35px symbol-circle'>
          <img alt='Pic' src={c.avatar}/>
        </div>
      ) :
      (
        <div className={`symbol ${extractBgClass(c?.firstName)} ${extractTxtClass(c?.firstName)} symbol-35px symbol-circle`}>
      <span className={`symbol-label fs-6 fw-bolder`}>
        {c?.firstName ? c.firstName[0] : ''}
      </span>
        </div>
      )
  }
  return <div className='symbol symbol-35px symbol-circle'>
    <img alt='Pic' src={toAbsoluteUrl("media/chatbot/Bot.svg")}/>
  </div>
}

export { Avatar }
