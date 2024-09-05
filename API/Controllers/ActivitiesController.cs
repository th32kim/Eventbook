using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using Application.Core;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet] //api/activities
        public async Task<IActionResult> GetActivities([FromQuery]ActivityParams param){
            return HandlePageResult(await Mediator.Send(new List.Query{Params = param})); //Getting all data
        }


        [Authorize]
        [HttpGet("{id}")] //api/activities/fdfkdffdfd
        public async Task<IActionResult> GetActivity(Guid id){

            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){
            return HandleResult(await Mediator.Send(new Create.Command{Activity = activity}));
        }

        [Authorize(Policy ="IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {Activity = activity}));
        }
        
        [Authorize(Policy ="IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id){
            return HandleResult(await Mediator.Send(new UpdateAttendence.Command{Id = id}));
        }

    }
}