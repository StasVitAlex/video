namespace Video.Models.ViewModels.User
{
    using System;

    public class UserInvitationVm
    {
        public Guid ActivationToken { get; set; }
        public string ActivationUrl { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}