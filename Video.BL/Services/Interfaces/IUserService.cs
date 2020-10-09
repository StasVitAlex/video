namespace Video.BL.Services.Interfaces
{
    using System;
    using System.Threading.Tasks;
    using Models.ViewModels.User;

    public interface IUserService
    {
        Task<UserVm> SignIn(SignInVm model);
        Task<UserVm> SignUp(SignUpVm model);
        Task<UserVm> GetUserById(int userId);
        Task<UserVm> AuthenticateViaGoogleAccount(Google.Apis.Auth.GoogleJsonWebSignature.Payload payload);
        Task<UserVm> AuthenticateViaMicrosoftAccount(MicrosoftAuthVm model);
        Task ActivateUser(Guid activationToken);
        Task UpdateUser(int userId, UpdateUserVm model);
    }
}