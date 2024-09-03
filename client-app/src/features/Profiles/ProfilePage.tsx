import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "../../App/stores/store";
import LoadingComponent from "../../App/layout/LoadingComponent";

export default observer(function ProfilesPage(){
    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();
    const {loadingProfile, loadProfile, profile} = profileStore;

    useEffect(()=>{
        if(username) loadProfile(username);   
    },[loadProfile, username])

    if(loadingProfile) return <LoadingComponent content='Loading profile...'/>


    return(
        <Grid>
            <Grid.Column width={16}>
                {profile&&
                <>
                <ProfileHeader profile={profile}/>
                <ProfileContent profile={profile}/>
                </>}
            </Grid.Column>
        </Grid>
    )
})