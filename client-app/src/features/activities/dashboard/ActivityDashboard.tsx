import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../App/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../App/layout/LoadingComponent';


export default observer( function ActivityDashboard(){

    const{activityStore} = useStore();


    useEffect(()=> {
      activityStore.loadActivities();
    },[activityStore])
  
  
    if(activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity Filter</h2>
            </Grid.Column>
        </Grid>
    )
})