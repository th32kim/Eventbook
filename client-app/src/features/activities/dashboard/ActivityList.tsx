
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../App/modules/activity';

interface Props {
    activities: Activity[];
    selectActivity: (id: string)=> void;
    deleteActivity: (id:string)=> void;
}

export default function ActivityList({activities, selectActivity,deleteActivity}: Props){
    return(
        <Segment>
            <Item.Group>
                {activities.map(activity =>(
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={()=> selectActivity(activity.id)} floated='right' content='View' color='blue'></Button>
                                <Button onClick={()=> deleteActivity(activity.id)} floated='right' content='Delete' color='red'></Button>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}