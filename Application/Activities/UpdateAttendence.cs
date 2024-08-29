using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendence
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Guid Id {get; set;}
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor){
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a=>a.Attendees).ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x=>x.Id == request.Id);

                if(activity ==null){
                    //No activity found, returning null
                    return null;
                }

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user==null){
                    // no user found, returning null
                    return null;
                }

                var hostUsername = activity.Attendees.FirstOrDefault(X => X.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && hostUsername ==user.UserName){
                    //User is the host, cancelling the activity
                    activity.IsCancelled = !activity.IsCancelled;
                }
                if (attendance != null && hostUsername != user.UserName){
                    //user is normal attendee, removing user from the list of attendance
                    activity.Attendees.Remove(attendance);
                }
                if(attendance == null){
                    // user is not in the attendance, adding to the list
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };
                    activity.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() >0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}