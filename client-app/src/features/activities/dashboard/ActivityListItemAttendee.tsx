import { observer } from "mobx-react-lite"
import { List,Image, Popup} from "semantic-ui-react"
import { Profile } from "../../../App/modules/profile";
import { Link } from "react-router-dom";
import ProfilleCard from "../../Profiles/ProfileCard";

interface Props{
    attendees : Profile[];
}

export default observer(function ActivityListItemAttendee({attendees}: Props){
    const styles={
        borderColor: 'orange',
        borderwidth: 2
    }

    return(
        <List horizontal>
            {attendees.map(attendee=>(
                <Popup 
                    hoverable
                    key={attendee.username}
                    trigger={
                        <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                        <Image 
                            size='mini' circular src = {attendee.image || '/assets/user.png'}
                            bordered
                            style={attendee.following ? styles : null}/>
                        </List.Item>
                    }>
                        <Popup.Content>
                            <ProfilleCard profile={attendee}/>
                        </Popup.Content>
                    </Popup>
                
            ))}
        </List>
    )
})