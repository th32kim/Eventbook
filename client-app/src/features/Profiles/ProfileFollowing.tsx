import { observer } from "mobx-react-lite";
import { useStore } from "../../App/stores/store";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";

export default observer(function ProfileFollowings(){
    const {profileStore} = useStore();
    const {profile, followings, loadingFollowing, activeTab} = profileStore;

    return(
        <Tab.Pane loading = {loadingFollowing}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon='user' 
                    content={activeTab === 3 ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`}/>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {followings.map(profile => (
                            <ProfileCard key={profile.username} profile={profile}/>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})