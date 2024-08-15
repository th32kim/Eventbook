
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Image,
    Button,
  } from 'semantic-ui-react'
import { useStore } from '../../../App/stores/store';
import LoadingComponent from '../../../App/layout/LoadingComponent';



export default function ActivityDetails(){
    const {activityStore} = useStore();
    const{selectedActivity: activity,openForm,cancelSelectedActivity}=activityStore;

    if(!activity) return <LoadingComponent/>;

    return(
          <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <CardContent>
            <CardHeader>{activity.title}</CardHeader>
            <CardMeta>
                <span>{activity.date}</span>
            </CardMeta>
            <CardDescription>
                {activity.description}
            </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button onClick={()=>openForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel'/>
                </Button.Group>
            </CardContent>
        </Card>
    )
}